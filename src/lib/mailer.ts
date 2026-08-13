import type { Inquiry } from "@/content/types";

const RESEND_API_URL = "https://api.resend.com/emails";
const SENDER = "Maple Furniture Website <onboarding@resend.dev>";

export async function sendInquiryEmail(inquiry: Inquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Email is not configured — set RESEND_API_KEY (see .env.local.example).");
  }
  const to = (process.env.CONTACT_TO_EMAIL || "lam@maplefurniture.vn")
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

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SENDER,
      to,
      reply_to: inquiry.email,
      subject: `New inquiry: ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }
}
