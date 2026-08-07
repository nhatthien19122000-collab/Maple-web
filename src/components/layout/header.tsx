"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };
type NavItem = NavLink | { label: string; items: NavLink[] };

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);

  const isHome = pathname === `/${locale}`;

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;

  const navItems: NavItem[] = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/capabilities`, label: dict.nav.capabilities },
    {
      label: dict.nav.projects,
      items: [
        { href: `/${locale}/projects`, label: dict.nav.projectsAll },
        { href: `/${locale}/projects?category=multifamily`, label: dict.categories.multifamily },
        { href: `/${locale}/projects?category=seniorLiving`, label: dict.categories.seniorLiving },
        { href: `/${locale}/projects?category=hospitality`, label: dict.categories.hospitality },
        { href: `/${locale}/projects?category=publicSpaces`, label: dict.categories.publicSpaces },
        { href: `/${locale}/projects?category=luxuryResidential`, label: dict.categories.luxuryResidential },
      ],
    },
    {
      label: dict.nav.productionGroup,
      items: [
        { href: `/${locale}/manufacturing-process`, label: dict.nav.process },
        { href: `/${locale}/factory`, label: dict.nav.factory },
        { href: `/${locale}/quality-control`, label: dict.nav.quality },
        { href: `/${locale}/certifications`, label: dict.nav.certifications },
      ],
    },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/careers`, label: dict.nav.careers },
  ];

  const flatMobileItems: NavLink[] = navItems.flatMap((item) => ("items" in item ? item.items : [item]));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        transparent
          ? "bg-transparent text-white"
          : "border-b border-border-subtle bg-background/90 text-foreground backdrop-blur-md"
      )}
    >
      <Container className="flex h-20 items-center justify-between lg:h-24">
        <Link href={`/${locale}`}>
          <Logo variant={transparent ? "light" : "dark"} height={30} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, i) =>
            "items" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(i)}
                onMouseLeave={() => setOpenDropdown((v) => (v === i ? null : v))}
              >
                <button
                  className="flex items-center gap-1 text-[0.8rem] font-medium uppercase tracking-[0.1em] transition-colors hover:opacity-70"
                  onClick={() => setOpenDropdown((v) => (v === i ? null : i))}
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
                <AnimatePresence>
                  {openDropdown === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full w-64 border border-border-subtle bg-surface pt-3 pb-3 text-foreground shadow-xl"
                    >
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-5 py-2.5 text-[0.8rem] uppercase tracking-[0.08em] hover:bg-surface-muted hover:text-accent"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.8rem] font-medium uppercase tracking-[0.1em] transition-colors hover:opacity-70"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LocaleSwitcher current={locale} />
          <Link
            href={`/${locale}/contact`}
            className={cn(
              "px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors",
              transparent
                ? "border border-white/60 hover:bg-white hover:text-ink"
                : "bg-ink text-paper hover:bg-wood"
            )}
          >
            {dict.nav.getQuote}
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border-subtle bg-background text-foreground lg:hidden"
          >
            <Container className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-6">
              {flatMobileItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-[0.95rem] font-medium uppercase tracking-[0.08em] border-b border-border-subtle"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                className="mt-5 bg-ink px-6 py-4 text-center text-[0.8rem] font-medium uppercase tracking-[0.12em] text-paper"
              >
                {dict.nav.getQuote}
              </Link>
              <div className="mt-6">
                <LocaleSwitcher current={locale} />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
