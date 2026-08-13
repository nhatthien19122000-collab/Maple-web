import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { projects, projectCategories } from "@/content/projects";
import type { ProjectCategory } from "@/content/types";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.projects.eyebrow, description: dict.projects.subtitle };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const { category } = await searchParams;

  const validCategory = projectCategories.some((c) => c.value === category)
    ? (category as ProjectCategory)
    : undefined;

  return (
    <>
      <PageHero
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.title}
        subtitle={dict.projects.subtitle}
        image="/about-hero.png"
      />
      <section className="py-20 lg:py-28">
        <Container>
          <ProjectsExplorer
            projects={projects}
            locale={locale}
            dict={dict}
            initialCategory={validCategory}
          />
        </Container>
      </section>
    </>
  );
}
