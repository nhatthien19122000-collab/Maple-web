import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cpu, Scissors, Layers, Drill, Wrench, SprayCan, PackageCheck, Ship } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stat } from "@/components/ui/stat";

const workflowIcons = [Cpu, Scissors, Layers, Drill, Wrench, SprayCan, PackageCheck, Ship];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.factory.eyebrow, description: dict.factory.subtitle };
}

export default async function FactoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const f = dict.factory;

  return (
    <>
      <PageHero
        eyebrow={f.eyebrow}
        title={f.title}
        subtitle={f.subtitle}
        image="/factory-1.jpg"
      />

      <section className="border-b border-border-subtle bg-surface">
        <Container className="grid grid-cols-2 gap-10 py-14 lg:grid-cols-4 lg:py-16">
          <Stat value={siteConfig.factory.area} label={f.statsArea} />
          <Stat value={siteConfig.factory.lines} label={f.statsLines} delay={0.05} />
          <Stat value={siteConfig.factory.capacity} label={f.statsCapacity} delay={0.1} />
          <Stat value={siteConfig.factory.staff} label={f.statsStaff} delay={0.15} />
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={f.eyebrow} title={f.excellenceTitle} />
            <Reveal delay={0.1}>
              <p className="mt-6 whitespace-pre-line text-[1.02rem] leading-relaxed text-foreground/70">
                {f.excellenceBody}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {f.excellenceCards.map((card, i) => (
                <Reveal key={card.title} delay={0.15 + i * 0.05}>
                  <div className="border border-border-subtle bg-surface-muted p-5">
                    <h3 className="font-serif text-base">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">{card.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/factory-6.jpg"
                alt="Maple Furniture CNC production line"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border-subtle bg-surface-muted py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow={f.eyebrow} title={f.galleryTitle} align="center" />
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {["2", "3", "4", "5", "7", "8", "9", "10", "11", "12", "13", "14"].map((n, i) => (
              <Reveal key={n} delay={i * 0.03}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={`/factory-${n}.jpg`}
                    alt="Maple Furniture factory"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow={f.eyebrow} title={f.workflowTitle} subtitle={f.workflowSubtitle} />
          <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {f.workflow.map((step, i) => {
              const Icon = workflowIcons[i];
              return (
                <Reveal key={step.title} delay={i * 0.05}>
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center border border-border-subtle bg-surface text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-foreground/40">
                      0{i + 1}
                    </p>
                    <h3 className="mt-2 font-serif text-lg">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">{step.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/factory-15.jpg"
                alt="Maple Furniture factory floor"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow={f.eyebrow} title={f.ctaTitle} tone="inverted" />
            <Reveal delay={0.15}>
              <Link
                href={`/${locale}/contact`}
                className="mt-8 inline-flex border border-white/50 px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-ink"
              >
                {dict.nav.getQuote}
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
