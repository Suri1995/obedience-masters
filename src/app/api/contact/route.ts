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
    // SEND LEAD NOTIFICATION
    // ---------------------------------------------

    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom: 20px;">
          New Dog Training Lead
        </h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 12px;">
          <p>
            <strong>Lead ID:</strong>
            ${escapeHtml(String(leadId ?? ""))}
          </p>

          <p>
            <strong>Source:</strong>
            ${escapeHtml(source)}
          </p>

          <hr />

          <p>
            <strong>Owner Name:</strong>
            ${escapeHtml(fullName)}
          </p>

          <p>
            <strong>Phone:</strong>
            ${escapeHtml(phone)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email || "Not provided")}
          </p>

          <p>
            <strong>Dog Breed:</strong>
            ${escapeHtml(breed || "Not provided")}
          </p>

          <p>
            <strong>Dog Age:</strong>
            ${escapeHtml(age || "Not provided")}
          </p>

          ${
            month || year
              ? `
                <p>
                  <strong>Preferred Schedule:</strong>
                  ${escapeHtml(
                    [month, year].filter(Boolean).join(" ")
                  )}
                </p>
              `
              : ""
          }

          ${
            mainProblem
              ? `
                <p>
                  <strong>Main Problem:</strong>
                  ${escapeHtml(mainProblem)}
                </p>
              `
              : ""
          }

          ${
            remarks
              ? `
                <p>
                  <strong>Remarks:</strong>
                  ${escapeHtml(remarks)}
                </p>
              `
              : ""
          }
        </div>

        <p style="margin-top: 20px; color: #666;">
          This lead was submitted through the Obedience Masters website.
        </p>
      </div>
    `;

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
    // SEND THANK-YOU EMAIL TO CUSTOMER
    // ---------------------------------------------

    if (email) {
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; color: #111;">
          
          <h2 style="margin-bottom: 20px;">
            Thank You for Contacting Obedience Masters!
          </h2>

          <p>
            Hi ${escapeHtml(fullName)},
          </p>

          <p>
            Thank you for reaching out to <strong>Obedience Masters</strong>
            regarding your dog's training.
          </p>

          <p>
            We have successfully received your enquiry.
            Our team will get in touch with you shortly to discuss
            your dog's training requirements.
          </p>

          <div style="background: #fff8dc; padding: 18px; border-radius: 12px; margin: 24px 0;">
            <p style="margin: 0 0 8px;">
              <strong>Dog Breed:</strong>
              ${escapeHtml(breed || "Not provided")}
            </p>

            <p style="margin: 0;">
              <strong>Dog Age:</strong>
              ${escapeHtml(age || "Not provided")}
            </p>
          </div>

          <p>
            We look forward to helping you and your dog.
          </p>

          <p style="margin-top: 28px;">
            Regards,<br />
            <strong>Obedience Masters</strong><br />
            Professional Dog Training
          </p>

        </div>
      `;

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