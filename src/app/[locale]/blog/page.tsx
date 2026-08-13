import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { BlogExplorer } from "@/components/blog/blog-explorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.blog.eyebrow, description: dict.blog.subtitle };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.blog.eyebrow}
        title={dict.blog.title}
        subtitle={dict.blog.subtitle}
        image="/about-hero.png"
      />
      <section className="py-20 lg:py-28">
        <Container>
          <BlogExplorer posts={blogPosts} locale={locale} dict={dict} />
        </Container>
      </section>
    </>
  );
}
