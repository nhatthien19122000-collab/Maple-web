import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getFeaturedProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { capabilityImages } from "@/content/capability-images";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stat } from "@/components/ui/stat";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ProjectCard } from "@/components/projects/project-card";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const featured = getFeaturedProjects();

  const capabilities = dict.capabilities.items.map((item) => ({
    key: item.category,
    title: item.title,
    body: item.body,
    image: capabilityImages[item.category],
    href: `/${locale}/projects?category=${item.category}`,
  }));

  const processSteps = dict.process.steps;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
        <Image
          src="/hero-home1.png"
          alt="Maple Furniture manufacturing floor"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/30 to-ink/10" />
        <Container className="relative z-10 flex w-full flex-col items-center py-28 text-center">
          <h1 className="whitespace-nowrap font-serif text-[clamp(1.1rem,5vw,4.5rem)] font-medium leading-[1.05] text-white">
            <Reveal delay={0.05}>{dict.home.heroTitle}</Reveal>
          </h1>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-[1.05rem] italic leading-relaxed text-white/75">
              {dict.home.heroSubtitlePrefix}
              <strong className="font-semibold text-white">{dict.home.heroSubtitleEmphasis}</strong>
              {dict.home.heroSubtitleSuffix}
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/projects`}
                className="border border-white/50 px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-ink"
              >
                {dict.home.heroCtaPrimary}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="border border-white/50 px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-ink"
              >
                {dict.home.heroCtaSecondary}
              </Link>
            </div>
          </Reveal>
        </Container>
        <div className="absolute bottom-6 right-6 hidden items-center gap-2 text-[0.68rem] uppercase tracking-[0.15em] text-white/50 lg:flex">
          {dict.common.scrollToExplore}
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border-subtle bg-surface">
        <Container className="grid grid-cols-2 gap-10 py-14 lg:grid-cols-4 lg:py-16">
          <Stat value={siteConfig.stats.projects} label={dict.home.statsProjects} />
          <Stat value={siteConfig.stats.countries} label={dict.home.statsCountries} delay={0.05} />
          <Stat value={siteConfig.stats.factoryArea} label={dict.home.statsSqm} delay={0.1} />
          <Stat value={siteConfig.stats.yearsInBusiness} label={dict.home.statsYears} delay={0.15} />
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow={dict.home.capabilitiesEyebrow}
            title={dict.home.capabilitiesTitle}
            subtitle={dict.home.capabilitiesSubtitle}
          />
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.key} delay={i * 0.06}>
                <Link href={cap.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-muted">
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-serif text-lg text-white leading-tight">{cap.title}</h3>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-wood">
                        {dict.common.learnMore}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="bg-surface-muted py-24 lg:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={dict.home.featuredEyebrow} title={dict.home.featuredTitle} />
            <LinkArrow href={`/${locale}/projects`}>{dict.common.viewAll}</LinkArrow>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}>
                <ProjectCard project={project} locale={locale} dict={dict} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process teaser */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow={dict.home.processEyebrow}
            title={dict.home.processTitle}
            subtitle={dict.home.processSubtitle}
          />
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="border-t border-border-subtle pt-6">
                  <span className="font-serif text-3xl text-accent">0{i + 1}</span>
                  <h3 className="mt-4 font-serif text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-12">
            <LinkArrow href={`/${locale}/manufacturing-process`}>{dict.common.learnMore}</LinkArrow>
          </Reveal>
        </Container>
      </section>

      {/* Quality teaser */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://picsum.photos/seed/mf-quality-control/1000/1250"
                alt="Quality inspection at Maple Furniture"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow={dict.home.qualityEyebrow}
              title={dict.home.qualityTitle}
              tone="inverted"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/70">
                {dict.home.qualityBody}
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <LinkArrow href={`/${locale}/quality-control`} className="text-white">
                {dict.common.learnMore}
              </LinkArrow>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] text-balance">
              {dict.home.ctaTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-lg text-[1.05rem] leading-relaxed text-foreground/65">
              {dict.home.ctaSubtitle}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href={`/${locale}/contact`}
              className="mt-10 inline-flex bg-ink px-9 py-4 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-paper transition-colors hover:bg-wood"
            >
              {dict.home.ctaButton}
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
