"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Project, ProjectCategory } from "@/content/types";
import { projectCategories } from "@/content/projects";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

export function ProjectsExplorer({
  projects,
  locale,
  dict,
  initialCategory,
}: {
  projects: Project[];
  locale: Locale;
  dict: Dictionary;
  initialCategory?: ProjectCategory;
}) {
  const [category, setCategory] = useState<ProjectCategory | "all">(initialCategory ?? "all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [
        p.title[locale],
        p.location,
        p.materials[locale],
        p.summary[locale],
        dict.categories[p.category],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, category, query, locale, dict]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "border px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-colors",
              category === "all"
                ? "border-ink bg-ink text-paper"
                : "border-border-subtle text-foreground/70 hover:border-ink"
            )}
          >
            {dict.common.filterAll}
          </button>
          {projectCategories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                "border px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-colors",
                category === c.value
                  ? "border-ink bg-ink text-paper"
                  : "border-border-subtle text-foreground/70 hover:border-ink"
              )}
            >
              {dict.categories[c.labelKey]}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.common.searchPlaceholder}
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
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 0.05, 0.3)}>
              <ProjectCard project={project} locale={locale} dict={dict} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
