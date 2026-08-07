import Image from "next/image";
import { Reveal } from "./reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-32">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="relative z-10 w-full pb-16 lg:pb-20">
        <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="mb-4 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-wood">
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-3xl font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] text-white text-balance">
              {title}
            </h1>
          </Reveal>
          {subtitle ? (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/75">
                {subtitle}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
