import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { InstagramIcon, LinkedinIcon, FacebookIcon } from "@/components/icons/social-icons";
import { Logo } from "./logo";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const company = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/capabilities`, label: dict.nav.capabilities },
    { href: `/${locale}/careers`, label: dict.nav.careers },
    { href: `/${locale}/blog`, label: dict.nav.blog },
  ];

  const production = [
    { href: `/${locale}/manufacturing-process`, label: dict.nav.process },
    { href: `/${locale}/factory`, label: dict.nav.factory },
    { href: `/${locale}/quality-control`, label: dict.nav.quality },
    { href: `/${locale}/certifications`, label: dict.nav.certifications },
  ];

  return (
    <footer className="border-t border-border-subtle bg-surface-muted text-foreground">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-24">
        <div>
          <Logo variant="dark" height={52} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground/65">
            {dict.footer.tagline}
          </p>
          <div className="mt-7 flex gap-4">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-foreground/60 hover:text-accent">
              <InstagramIcon className="h-4.5 w-4.5" />
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-foreground/60 hover:text-accent">
              <LinkedinIcon className="h-4.5 w-4.5" />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-foreground/60 hover:text-accent">
              <FacebookIcon className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.15em] text-foreground/50">
            {dict.footer.company}
          </p>
          <ul className="space-y-3">
            {company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-foreground/75 hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.15em] text-foreground/50">
            {dict.nav.productionGroup}
          </p>
          <ul className="space-y-3">
            {production.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-foreground/75 hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.15em] text-foreground/50">
            {dict.footer.contact}
          </p>
          <ul className="space-y-3 text-sm text-foreground/75">
            <li>{siteConfig.address}</li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-accent">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border-subtle">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-foreground/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {dict.footer.rights}
          </p>
          <p className="tracking-[0.1em] uppercase">Vietnam · Manufacturing for {siteConfig.markets.join(", ")}</p>
        </Container>
      </div>
    </footer>
  );
}
