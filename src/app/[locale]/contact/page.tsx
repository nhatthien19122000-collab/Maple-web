import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, MapPin, Mail, Phone } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteConfig, whatsappHref } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { WhatsAppIcon } from "@/components/icons/social-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.contact.eyebrow, description: dict.contact.subtitle };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const c = dict.contact;

  return (
    <>
      <section className="pt-36 pb-20 lg:pt-44 lg:pb-28">
        <Container className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-balance">
                {c.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-foreground/65">{c.subtitle}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 space-y-4 border-t border-border-subtle pt-8 text-sm">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground/40">
                  {c.officeTitle}
                </p>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{siteConfig.address}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 space-y-4 border-t border-border-subtle pt-8 text-sm">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground/40">
                  {c.reachTitle}
                </p>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">
                    {siteConfig.phone} — {siteConfig.phoneRole}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex bg-ink px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-paper transition-colors hover:bg-wood"
                  >
                    {c.sendEmailCta}
                  </a>
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                    className="inline-flex border border-border-subtle px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.1em] transition-colors hover:border-ink"
                  >
                    {c.callNowCta}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex items-start gap-4 border border-border-subtle bg-surface p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <WhatsAppIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-serif text-lg">{c.whatsappTitle}</p>
                  <p className="mt-1 text-sm text-foreground/60">{c.whatsappBody}</p>
                  <a
                    href={whatsappHref("Hello Maple Furniture, I'd like to enquire about a project.")}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-[0.75rem] font-medium uppercase tracking-[0.1em] text-accent hover:underline"
                  >
                    {c.whatsappCta} →
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-6 flex items-start gap-4 border border-border-subtle p-6">
                <Download className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <p className="font-serif text-lg">{c.downloadTitle}</p>
                  <p className="mt-1 text-sm text-foreground/60">{c.downloadBody}</p>
                  <div className="mt-3 flex flex-col items-start gap-2">
                    <a
                      href="/downloads/maple-furniture-cabinet-brochure.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-[0.75rem] font-medium uppercase tracking-[0.1em] text-accent hover:underline"
                    >
                      {c.brochureCta} →
                    </a>
                    <a
                      href="/downloads/maple-furniture-introduction-2026.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-[0.75rem] font-medium uppercase tracking-[0.1em] text-accent hover:underline"
                    >
                      {c.introCta} →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border border-border-subtle bg-surface p-8 sm:p-10">
              <InquiryForm dict={dict} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <p className="sr-only">{c.mapTitle}</p>
        <div className="h-[420px] w-full grayscale-[15%]">
          <iframe
            title={c.mapTitle}
            src={siteConfig.mapEmbedSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
