import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { blogPosts } from "@/content/blog";

const staticRoutes = [
  "",
  "about",
  "capabilities",
  "projects",
  "manufacturing-process",
  "factory",
  "quality-control",
  "certifications",
  "blog",
  "careers",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${siteConfig.domain}/${locale}${route ? `/${route}` : ""}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${siteConfig.domain}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
    for (const post of blogPosts) {
      entries.push({
        url: `${siteConfig.domain}/${locale}/blog/${post.slug}`,
        lastModified: post.date,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
