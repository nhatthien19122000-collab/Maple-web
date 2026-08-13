import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { capabilityImages } from "@/content/capability-images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.capabilities.eyebrow, description: dict.capabilities.subtitle };
}

export default async function CapabilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const c = dict.capabilities;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        image="/about-hero.png"
      />

      <section className="py-24 lg:py-32">
        <Container className="space-y-24 lg:space-y-32">
          {c.items.map((item, i) => (
            <div
              key={item.category}
              className={cn(
                "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
                i % 2 === 1 && "lg:[&>*:first-child]:order-2"
              )}
            >
              <Reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-muted">
                  <Image
                    src={capabilityImages[item.category]}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-accent">
                    0{i + 1} · {dict.categories[item.category]}
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">{item.title}</h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-5 text-[1.02rem] leading-relaxed text-foreground/65">{item.body}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <ul className="mt-6 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-foreground/75">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2}>
                  <Link
                    href={`/${locale}/projects?category=${item.category}`}
                    className="mt-7 inline-block border-b border-current pb-1 text-[0.78rem] font-medium uppercase tracking-[0.1em] hover:text-accent"
                  >
                    {dict.projects.eyebrow}: {dict.categories[item.category]}
                  </Link>
                </Reveal>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-surface-muted py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow={dict.nav.capabilities} title={c.processTitle} subtitle={c.processSubtitle} align="center" />
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="border-t border-border-subtle pt-6 text-center lg:text-left">
                  <span className="font-serif text-3xl text-accent">0{i + 1}</span>
                  <h3 className="mt-4 font-serif text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 text-center lg:py-28">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-xl font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-balance">
              {c.ctaTitle}
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
