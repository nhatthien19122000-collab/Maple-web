import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type ProjectCategory =
  | "multifamily"
  | "seniorLiving"
  | "hospitality"
  | "publicSpaces"
  | "luxuryResidential"
  | "tambourWood";

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  title: LocalizedText;
  location?: string;
  year?: number;
  client?: string;
  summary: LocalizedText;
  description: LocalizedText;
  scope: LocalizedList;
  scale?: LocalizedText;
  materials: LocalizedText;
  coverImage: string;
  bannerImage?: string;
  images: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  coverImage: string;
  category: LocalizedText;
  author: string;
  date: string;
  readTimeMinutes: number;
  featured?: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  createdAt: string;
}
