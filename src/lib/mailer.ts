import nodemailer from "nodemailer";
import type { Inquiry } from "@/content/types";

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error(
      "Email is not configured — set GMAIL_USER and GMAIL_APP_PASSWORD (see .env.local.example)."
    );
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendInquiryEmail(inquiry: Inquiry): Promise<void> {
  const transport = getTransport();
  const to = (process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER)!
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

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
    from: `"Maple Furniture Website" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: inquiry.email,
    subject: `New inquiry: ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
    text: lines.join("\n"),
  });
}
