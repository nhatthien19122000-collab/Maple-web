"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function persistLocaleCookie(locale: Locale) {
  document.cookie = `MF_LOCALE=${locale}; path=/; max-age=31536000`;
}

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    persistLocaleCookie(locale);
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/") || "/");
  }

  return (
    <div className="flex items-center gap-1 text-[0.75rem] font-medium uppercase tracking-[0.1em]">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={locale === current}
            title={localeLabels[locale]}
            className={cn(
              "px-1 py-1 transition-colors",
              locale === current ? "text-accent" : "text-current/50 hover:text-current"
            )}
          >
            {locale.toUpperCase()}
          </button>
          {i < locales.length - 1 && <span className="text-current/30">/</span>}
        </span>
      ))}
    </div>
  );
}
