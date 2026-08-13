import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageSearch, ClipboardList, BadgeCheck, PackageCheck, FileCheck2 } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkArrow } from "@/components/ui/link-arrow";

const pillarIcons = [PackageSearch, ClipboardList, BadgeCheck, PackageCheck, FileCheck2];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.quality.eyebrow, description: dict.quality.subtitle };
}

export default async function QualityControlPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const q = dict.quality;

  return (
    <>
      <PageHero
        eyebrow={q.eyebrow}
        title={q.title}
        subtitle={q.subtitle}
        image="/about-hero.png"
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
            {q.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];
              return (
                <Reveal key={pillar.title} delay={i * 0.06}>
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center border border-border-subtle bg-surface text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-foreground/40">
                      0{i + 1}
                    </p>
                    <h3 className="mt-2 font-serif text-lg leading-snug">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">{pillar.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-white lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={q.eyebrow} title={q.standardsTitle} tone="inverted" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/70">{q.standardsBody}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <LinkArrow href={`/${locale}/certifications`} className="text-white">
                {dict.nav.certifications}
              </LinkArrow>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://picsum.photos/seed/mf-qc-inspection/1000/1250"
                alt="Quality inspection"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 text-center lg:py-24">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-xl font-serif text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-balance">
              {q.ctaTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={`/${locale}/contact`}
              className="mt-8 inline-flex bg-ink px-9 py-4 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-paper transition-colors hover:bg-wood"
            >
              {dict.nav.getQuote}
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
