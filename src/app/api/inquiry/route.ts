import { NextResponse } from "next/server";
import { z } from "zod";
import { saveInquiry } from "@/lib/inquiries";

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

  await saveInquiry({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  });

  return NextResponse.json({ ok: true });
}
