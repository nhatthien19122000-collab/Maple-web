import { Reveal } from "./reveal";

export function Stat({
  value,
  label,
  delay = 0,
  tone = "default",
}: {
  value: string;
  label: string;
  delay?: number;
  tone?: "default" | "inverted";
}) {
  return (
    <Reveal delay={delay}>
      <div>
        <p className="whitespace-nowrap font-serif text-[clamp(2rem,3.5vw,3rem)] leading-none">{value}</p>
        <p
          className={`mt-3 text-[0.72rem] font-medium uppercase tracking-[0.15em] ${
            tone === "inverted" ? "text-white/60" : "text-foreground/55"
          }`}
        >
          {label}
        </p>
      </div>
    </Reveal>
  );
}
