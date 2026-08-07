import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "inverted";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p
            className={cn(
              "mb-4 text-[0.75rem] font-medium uppercase tracking-[0.2em]",
              tone === "inverted" ? "text-wood" : "text-accent"
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-balance">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-[1.05rem] leading-relaxed",
              tone === "inverted" ? "text-paper/75" : "text-foreground/70"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
