import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-ink text-paper px-8 py-4 hover:bg-wood hover:text-white",
  outline:
    "border border-current px-8 py-4 hover:bg-foreground hover:text-background",
  ghost: "px-2 py-2 hover:text-accent",
};

type Variant = keyof typeof variants;

type ButtonProps = {
  variant?: Variant;
  className?: string;
  href?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({ variant = "primary", className, href, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children as React.ReactNode}
      </Link>
    );
  }
  return <button className={classes} {...props} />;
}
