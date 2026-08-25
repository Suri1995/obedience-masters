import { NextResponse } from "next/server";

type ContactPayload = {
  fullName?: string;
  phone?: string;
  breed?: string;
  age?: string;
  email?: string;
  month?: string;
  year?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { fullName, phone, breed, age, email } = body;

  if (!fullName || !phone || !breed || !age || !email) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 422 }
    );
  }

  // In production this is where you'd persist the lead (DB, CRM,
  // email notification, etc). For now we log it server-side so the
  // integration point is obvious and easy to wire up.
  console.log("New training enquiry received:", body);

  return NextResponse.json({ ok: true }, { status: 200 });
}
