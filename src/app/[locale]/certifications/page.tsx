import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Leaf, FlaskConical, Flame, Users, ShieldCheck } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

const certIcons = [BadgeCheck, Leaf, FlaskConical, Flame, Users, ShieldCheck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.certifications.eyebrow, description: dict.certifications.subtitle };
}

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const c = dict.certifications;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        image="https://picsum.photos/seed/mf-certifications-hero/2200/1400"
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.items.map((item, i) => {
              const Icon = certIcons[i];
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="h-full border border-border-subtle p-8">
                    <div className="flex h-12 w-12 items-center justify-center border border-border-subtle text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-serif text-lg leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/60">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-20 text-center lg:py-24">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-xl font-serif text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-balance">
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
