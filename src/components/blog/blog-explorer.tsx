"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { BlogPost } from "@/content/types";
import { formatDate, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function BlogExplorer({
  posts,
  locale,
  dict,
}: {
  posts: BlogPost[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");

  const topics = useMemo(() => {
    const set = new Map<string, string>();
    posts.forEach((p) => set.set(p.category[locale], p.category[locale]));
    return Array.from(set.values());
  }, [posts, locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (topic !== "all" && p.category[locale] !== topic) return false;
      if (!q) return true;
      return [p.title[locale], p.excerpt[locale], p.category[locale], p.author].join(" ").toLowerCase().includes(q);
    });
  }, [posts, topic, query, locale]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTopic("all")}
            className={cn(
              "border px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-colors",
              topic === "all" ? "border-ink bg-ink text-paper" : "border-border-subtle text-foreground/70 hover:border-ink"
            )}
          >
            {dict.blog.filterAll}
          </button>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={cn(
                "border px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-colors",
                topic === t ? "border-ink bg-ink text-paper" : "border-border-subtle text-foreground/70 hover:border-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.blog.searchPlaceholder}
            className="w-full border border-border-subtle bg-surface py-2.5 pl-9 pr-9 text-sm outline-none transition-colors focus:border-ink"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-sm text-foreground/50">{dict.common.noResults}</p>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.id} delay={Math.min(i * 0.05, 0.3)}>
              <Link href={`/${locale}/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-muted">
                  <Image
                    src={post.coverImage}
                    alt={post.title[locale]}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-accent">
                  {post.category[locale]} · {formatDate(post.date, locale)}
                </p>
                <h3 className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
                  {post.title[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60 line-clamp-2">
                  {post.excerpt[locale]}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
