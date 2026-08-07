import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function LinkArrow({
  href,
  children,
  className,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const content = (
    <span
      className={cn(
        "group inline-flex items-center gap-3 border-b border-current pb-1 text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-accent",
        className
      )}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );

  if (!href) {
    return (
      <button onClick={onClick} className="text-left">
        {content}
      </button>
    );
  }

  return <Link href={href}>{content}</Link>;
}
