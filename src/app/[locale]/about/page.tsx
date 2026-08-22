import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkArrow } from "@/components/ui/link-arrow";

const managementTeam = [
  {
    photo: "/team/ceo-founder.png",
    name: "Lam Le",
    title: { en: "CEO, Founder & Head of Business Development", vi: "CEO, Nhà Sáng Lập & Trưởng Phòng Phát Triển Kinh Doanh" },
  },
  { photo: "/team/head-of-finance.png", name: "Binh Thai", title: { en: "Head of Finance", vi: "Trưởng Phòng Tài Chính" } },
  {
    photo: "/team/head-of-manufacturing.png",
    name: "Trieu Cao",
    title: { en: "Head of Manufacturing", vi: "Trưởng Phòng Sản Xuất" },
  },
  {
    photo: "/team/head-of-finishing-qc.png",
    name: "Sim Nguyen",
    title: { en: "Head of Finishing & QC", vi: "Trưởng Phòng Hoàn Thiện & Kiểm Soát Chất Lượng" },
  },
  { photo: "/team/head-of-rd.jpg", name: "Thorin Sieu", title: { en: "Head of R&D", vi: "Trưởng Phòng Nghiên Cứu & Phát Triển" } },
  {
    photo: "/team/head-of-accounting-hr.png",
    name: "Trang Bui",
    title: { en: "Head of Accounting & HR", vi: "Trưởng Phòng Kế Toán & Nhân Sự" },
  },
  {
    photo: "/team/head-of-procurement.png",
    name: "Hien Nguyen",
    title: { en: "Head of Procurement", vi: "Trưởng Phòng Thu Mua" },
  },
  {
    photo: "/team/head-of-customer-service.png",
    name: "Tram Dinh",
    title: { en: "Head of Customer Service", vi: "Trưởng Phòng Chăm Sóc Khách Hàng" },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.about.eyebrow, description: dict.about.intro };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <PageHero
        eyebrow={a.eyebrow}
        title={a.title}
        subtitle={a.tagline}
        image="/about-hero.png"
      />

      <section className="py-24 lg:py-32">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="text-[1.05rem] leading-relaxed text-foreground/70">{a.intro}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.15em] text-foreground/50">
                {a.expertiseTitle}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-4 space-y-3">
                {a.expertise.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 text-[1.05rem] leading-relaxed text-foreground/70">{a.rangeBody}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-foreground/70">{a.capabilitiesBody}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 font-serif text-xl leading-snug text-balance">{a.closingTagline}</p>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/about-workshop.png"
                alt="Maple Furniture workshop"
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
          <SectionHeading
            eyebrow={a.teamEyebrow}
            title={a.teamTitle}
            subtitle={a.teamSubtitle}
            align="center"
            className="max-w-4xl"
          />
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {managementTeam.map((member, i) => (
              <Reveal key={member.title.en} delay={i * 0.05}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
                  <Image
                    src={member.photo}
                    alt={member.title[locale]}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {member.name ? (
                  <>
                    <p className="mt-4 font-serif text-base leading-snug">{member.name}</p>
                    <p className="mt-1 text-sm leading-snug text-foreground/60">{member.title[locale]}</p>
                  </>
                ) : (
                  <p className="mt-4 text-sm font-medium leading-snug text-foreground/85">{member.title[locale]}</p>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Export" title={a.capabilityTitle} tone="inverted" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/70">{a.capabilityBody}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <LinkArrow href={`/${locale}/contact`} className="text-white">
                {a.ctaTitle}
              </LinkArrow>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/about-export.png"
                alt="Export container loading"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
