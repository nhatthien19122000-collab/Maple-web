import nodemailer from "nodemailer";
import type { Inquiry } from "@/content/types";

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email is not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (see .env.local.example)."
    );
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendInquiryEmail(inquiry: Inquiry): Promise<void> {
  const transport = getTransport();
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;

  const lines = [
    `New project inquiry from the Maple Furniture website`,
    ``,
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company || "—"}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "—"}`,
    `Project type: ${inquiry.projectType}`,
    ``,
    `Message:`,
    inquiry.message,
    ``,
    `Submitted: ${inquiry.createdAt}`,
  ];

  await transport.sendMail({
    from: `"Maple Furniture Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: inquiry.email,
    subject: `New inquiry: ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
    text: lines.join("\n"),
  });
}
