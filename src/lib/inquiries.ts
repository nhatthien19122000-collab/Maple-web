import { promises as fs } from "fs";
import path from "path";
import type { Inquiry } from "@/content/types";

const FILE_PATH = path.join(process.cwd(), "data", "inquiries.json");

export async function saveInquiry(inquiry: Inquiry): Promise<void> {
  let list: Inquiry[] = [];
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    list = JSON.parse(raw) as Inquiry[];
  } catch {
    list = [];
  }
  list.unshift(inquiry);
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
}
