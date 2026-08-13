import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { FileCheck2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.process.eyebrow, description: dict.process.subtitle };
}

export default async function ManufacturingProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const p = dict.process;

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        subtitle={p.subtitle}
        image="/about-hero.png"
      />

      <section className="py-24 lg:py-32">
        <Container className="max-w-4xl">
          <div className="divide-y divide-border-subtle">
            {p.steps.map((step, i) => (
              <Reveal key={step.title} delay={Math.min(i * 0.05, 0.3)}>
                <div className="grid gap-4 py-10 sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <span className="font-serif text-4xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl">{step.title}</h3>
                    <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-foreground/65">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-4 flex items-start gap-4 border border-border-subtle bg-surface-muted p-8">
              <FileCheck2 className="mt-1 h-6 w-6 shrink-0 text-accent" />
              <div>
                <h3 className="font-serif text-lg">{p.includedTitle}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">{p.includedBody}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-16 text-center font-serif text-2xl italic text-foreground/80">
              &ldquo;{p.quote}&rdquo;
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface-muted py-20 text-center lg:py-24">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-xl font-serif text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-balance">
              {p.ctaTitle}
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
