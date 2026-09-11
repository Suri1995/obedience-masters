import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  fullName?: string;
  phone?: string;
  breed?: string;
  age?: string;
  email?: string;
  month?: string;
  year?: string;
  mainProblem?: string;
  remarks?: string;
  source?: string;
};

function escapeHtml(value: string = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------------------------------------------
// SHARED EMAIL SHELL
// A single branded wrapper (dark header, yellow
// accent, rounded content card) reused by both
// the lead-notification email and the customer
// thank-you email, so they look like they came
// from the same premium, consistent brand.
// ---------------------------------------------

function emailShell({
  eyebrow,
  heading,
  intro,
  bodyHtml,
  footerNote,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  bodyHtml: string;
  footerNote: string;
}) {
  return `
  <div style="background-color:#FAF6EC;padding:32px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;">

      <!-- Header -->
      <div style="background-color:#0B0B0B;border-radius:24px 24px 0 0;padding:32px 36px;text-align:center;">
        <div style="display:inline-flex;align-items:center;gap:8px;">
          <span style="font-size:20px;">🐾</span>
        </div>
        <p style="margin:10px 0 0;font-size:12px;font-weight:700;letter-spacing:1.5px;color:#FFB800;text-transform:uppercase;">
          Obedience Masters
        </p>
        <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.5);">
          Professional Dog Training
        </p>
      </div>

      <!-- Card -->
      <div style="background-color:#FFFFFF;border:1px solid rgba(0,0,0,0.06);border-top:none;border-radius:0 0 24px 24px;padding:36px;box-shadow:0 25px 60px -30px rgba(0,0,0,0.25);">

        <span style="display:inline-block;background-color:#FFF3CC;color:#0B0B0B;font-size:12px;font-weight:700;letter-spacing:0.5px;padding:6px 14px;border-radius:999px;">
          ${eyebrow}
        </span>

        <h1 style="margin:16px 0 0;font-size:24px;line-height:1.3;color:#0B0B0B;font-weight:800;">
          ${heading}
        </h1>

        ${
          intro
            ? `<p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#57534E;">${intro}</p>`
            : ""
        }

        <div style="margin-top:24px;">
          ${bodyHtml}
        </div>

      </div>

      <!-- Footer -->
      <div style="text-align:center;padding:24px 12px 0;">
        <p style="margin:0;font-size:13px;color:#8A8580;">
          ${footerNote}
        </p>
        <p style="margin:8px 0 0;font-size:12px;color:#B5B0AA;">
          Obedience Masters &middot; Hyderabad, India
        </p>
      </div>

    </div>
  </div>
  `;
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);font-size:13px;color:#8A8580;width:38%;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);font-size:14px;color:#0B0B0B;font-weight:600;vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    const fullName = body.fullName?.trim();
    const phone = body.phone?.trim();
    const breed = body.breed?.trim() || null;
    const age = body.age?.trim() || null;
    const email = body.email?.trim() || null;
    const month = body.month?.trim() || null;
    const year = body.year?.trim() || null;
    const mainProblem = body.mainProblem?.trim() || null;
    const remarks = body.remarks?.trim() || null;
    const source = body.source?.trim() || "website";

    // ---------------------------------------------
    // VALIDATION
    // ---------------------------------------------

    if (!fullName || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and phone number are required.",
        },
        { status: 422 }
      );
    }

    // CTA requires email, breed and age
    if (source === "cta" && (!email || !breed || !age)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please fill in all required fields.",
        },
        { status: 422 }
      );
    }

    // ---------------------------------------------
    // SAVE LEAD TO NEON
    // ---------------------------------------------

    const result = await sql`
      INSERT INTO training_leads (
        full_name,
        phone,
        breed,
        age,
        email,
        month,
        year,
        main_problem,
        remarks,
        source
      )
      VALUES (
        ${fullName},
        ${phone},
        ${breed},
        ${age},
        ${email},
        ${month},
        ${year},
        ${mainProblem},
        ${remarks},
        ${source}
      )
      RETURNING id
    `;

    const leadId = result[0]?.id;

    // ---------------------------------------------
    // SEND LEAD NOTIFICATION (premium internal email)
    // ---------------------------------------------

    const scheduleValue = [month, year].filter(Boolean).join(" ");

    const leadRows = `
      <table role="presentation" width="100%" style="border-collapse:collapse;">
        ${detailRow("Lead ID", String(leadId ?? "—"))}
        ${detailRow("Source", source)}
        ${detailRow("Owner name", fullName)}
        ${detailRow("Phone", phone)}
        ${detailRow("Email", email || "Not provided")}
        ${detailRow("Dog breed", breed || "Not provided")}
        ${detailRow("Dog age", age || "Not provided")}
        ${scheduleValue ? detailRow("Preferred schedule", scheduleValue) : ""}
        ${mainProblem ? detailRow("Main problem", mainProblem) : ""}
      </table>
      ${
        remarks
          ? `
            <div style="margin-top:20px;background-color:#FAF6EC;border-radius:14px;padding:16px 18px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.5px;color:#8A8580;text-transform:uppercase;">
                Remarks
              </p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#0B0B0B;">
                ${escapeHtml(remarks)}
              </p>
            </div>
          `
          : ""
      }
      <div style="margin-top:28px;">
        <a
          href="tel:${encodeURIComponent(phone)}"
          style="display:inline-block;background-color:#0B0B0B;color:#FFB800;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:999px;"
        >
          Call ${escapeHtml(fullName)}
        </a>
      </div>
    `;

    const notificationHtml = emailShell({
      eyebrow: "New Lead",
      heading: `${fullName} just submitted an enquiry`,
      intro: "A new dog owner is ready to get started. Details below.",
      bodyHtml: leadRows,
      footerNote: "This lead was submitted through the Obedience Masters website.",
    });

    const notificationEmail = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Obedience Masters <hello@obediencemasters.com>",
      to:
        process.env.LEADS_TO_EMAIL ||
        "Obediencemasters@gmail.com",
      subject: `New Dog Training Lead - ${fullName}`,
      html: notificationHtml,
    });

    console.log("Lead notification sent:", notificationEmail);

    // ---------------------------------------------
    // SEND THANK-YOU EMAIL TO CUSTOMER (premium)
    // ---------------------------------------------

    if (email) {
      const customerBody = `
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          ${detailRow("Dog breed", breed || "Not provided")}
          ${detailRow("Dog age", age || "Not provided")}
          ${scheduleValue ? detailRow("Preferred schedule", scheduleValue) : ""}
        </table>

        <div style="margin-top:24px;background-color:#FFF8DC;border-radius:14px;padding:18px 20px;">
          <p style="margin:0;font-size:14px;line-height:1.6;color:#0B0B0B;">
            <strong>What happens next:</strong> one of our trainers will
            call you within 24 hours to understand your dog&rsquo;s needs
            and schedule your first session.
          </p>
        </div>
      `;

      const customerHtml = emailShell({
        eyebrow: "Enquiry Received",
        heading: `Thank you, ${fullName}`,
        intro:
          "We&rsquo;ve received your enquiry and can&rsquo;t wait to start working with your dog.",
        bodyHtml: customerBody,
        footerNote: "Questions in the meantime? Just reply to this email.",
      });

      const customerEmail = await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          "Obedience Masters <hello@obediencemasters.com>",
        to: email,
        subject: "Thank You for Contacting Obedience Masters",
        html: customerHtml,
      });

      console.log("Customer thank-you email sent:", customerEmail);
    }

    // ---------------------------------------------
    // SUCCESS
    // ---------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting your enquiry.",
      },
      { status: 500 }
    );
  }
}