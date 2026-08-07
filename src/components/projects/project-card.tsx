import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Project } from "@/content/types";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({
  project,
  locale,
  dict,
  priority = false,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={project.coverImage}
          alt={project.title[locale]}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-4 top-4 flex h-9 w-9 -translate-y-2 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-ink" />
        </div>
        <p className="absolute bottom-4 left-4 bg-ink/80 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white">
          {dict.categories[project.category]}
        </p>
      </div>
      <div className="mt-4">
        <h3 className="font-serif text-lg leading-snug transition-colors group-hover:text-accent">
          {project.title[locale]}
        </h3>
        {(project.location || project.year) && (
          <p className="mt-1 text-sm text-foreground/55">
            {[project.location, project.year].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
