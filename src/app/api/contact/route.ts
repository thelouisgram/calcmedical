import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    // Honeypot — bots fill this; humans don't see it
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim() || "Calcmedical contact";
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Email is not configured yet. Please try again later." },
        { status: 500 },
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "hadesanoye01@gmail.com";
    const from = "Calcmedical <onboarding@resend.dev>";

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Calcmedical] ${subject}`,
      text: [
        "New message from the Calcmedical contact form",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;line-height:1.5;color:#0f1f1c">
          <h2 style="margin:0 0 12px">New Calcmedical contact</h2>
          <p style="margin:0 0 20px;color:#64748b">Submitted via the site contact form</p>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:8px 0;font-weight:600">Name</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:600">Subject</td><td style="padding:8px 0">${escapeHtml(subject)}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f1f5f4;border-radius:12px;white-space:pre-wrap">${escapeHtml(message)}</div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
