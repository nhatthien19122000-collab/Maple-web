import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Building2 } from "lucide-react";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { projects, getProjectBySlug, getRelatedProjects } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ProjectCard } from "@/components/projects/project-card";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  const project = getProjectBySlug(slug);
  if (!project) return { title: dict.projects.eyebrow };
  return {
    title: project.title[isLocale(locale) ? locale : "en"],
    description: project.summary[isLocale(locale) ? locale : "en"],
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-32">
        <Image
          src={project.coverImage}
          alt={project.title[locale]}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <Container className="relative z-10 w-full pb-16 lg:pb-20">
          <Reveal>
            <p className="mb-4 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-wood">
              {dict.categories[project.category]}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-3xl font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] text-white text-balance">
              {project.title[locale]}
            </h1>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <div>
            <Reveal>
              <p className="whitespace-pre-line text-[1.05rem] leading-relaxed text-foreground/70">
                {project.description[locale]}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {project.images.map((src, i) => (
                <Reveal key={src} delay={i * 0.06} className={i === 0 ? "sm:col-span-2" : undefined}>
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-surface-muted ${
                      i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${project.title[locale]} ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="space-y-8 lg:border-l lg:border-border-subtle lg:pl-10">
            <div className="space-y-4 text-sm">
              {project.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground/40">
                      {dict.projects.detailLocation}
                    </p>
                    <p className="mt-1">{project.location}</p>
                  </div>
                </div>
              )}
              {project.year && (
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground/40">
                      {dict.projects.detailStatus}
                    </p>
                    <p className="mt-1">
                      {dict.projects.completedPrefix} {project.year}
                    </p>
                  </div>
                </div>
              )}
              {project.client && (
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground/40">
                      {dict.projects.detailClient}
                    </p>
                    <p className="mt-1">{project.client}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground/40">
                {dict.projects.detailScope}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                {project.scope[locale].map((item) => (
                  <li key={item} className="border-t border-border-subtle pt-2 first:border-t-0 first:pt-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {project.scale && (
              <div>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground/40">
                  {dict.projects.detailScale}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/70">{project.scale[locale]}</p>
              </div>
            )}

            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground/40">
                {dict.projects.detailMaterials}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{project.materials[locale]}</p>
            </div>

            <LinkArrow href={`/${locale}/contact`}>{dict.nav.getQuote}</LinkArrow>
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-surface-muted py-20 lg:py-28">
          <Container>
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-2xl">{dict.projects.relatedTitle}</h2>
              <Link href={`/${locale}/projects`} className="text-sm text-accent hover:underline">
                {dict.common.viewAll}
              </Link>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} locale={locale} dict={dict} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
