import { NextResponse, after } from "next/server";
import { z } from "zod";
import { saveInquiry } from "@/lib/inquiries";
import { sendInquiryEmail } from "@/lib/mailer";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  company: z.string().trim().max(200).optional(),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional(),
  projectType: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(4000),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const inquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };

  // Respond to the browser immediately, then save + email in the background.
  // A slow network round-trip to the visitor was previously causing the
  // browser's fetch() to fail/appear as an error even though the server had
  // already finished sending the email successfully.
  after(async () => {
    await saveInquiry(inquiry).catch((err) => {
      console.error("Failed to save inquiry to local file:", err);
    });
    try {
      await sendInquiryEmail(inquiry);
    } catch (err) {
      console.error("Failed to send inquiry email:", err);
    }
  });

  return NextResponse.json({ ok: true });
}
