import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Briefcase, GraduationCap, ShieldCheck, Send } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const whyIcons = [Briefcase, GraduationCap, ShieldCheck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.careers.eyebrow, description: dict.careers.subtitle };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const c = dict.careers;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        image="https://picsum.photos/seed/mf-careers-hero/2200/1400"
      />

      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow={c.eyebrow} title={c.whyTitle} align="center" />
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {c.why.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center border border-border-subtle text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-serif text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-24 lg:py-32">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-accent">
              {c.openRolesTitle}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-foreground/65">{c.openRolesEmpty}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 inline-flex flex-col items-center gap-4 border border-border-subtle bg-surface px-10 py-10">
              <Send className="h-6 w-6 text-accent" />
              <p className="max-w-sm text-sm leading-relaxed text-foreground/65">{c.applyBody}</p>
              <a
                href={`mailto:${siteConfig.careersEmail}`}
                className="mt-2 bg-ink px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-paper transition-colors hover:bg-wood"
              >
                {c.applyCta}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
