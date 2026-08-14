import Image from "next/image";
import { cn } from "@/lib/utils";

const LOCKUP_WIDTH = 984;
const LOCKUP_HEIGHT = 346;

export function Logo({
  variant = "dark",
  height = 28,
  className,
}: {
  variant?: "dark" | "light";
  height?: number;
  className?: string;
}) {
  const src = variant === "light" ? "/logo-full-white.png" : "/logo-full.png";

  return (
    <Image
      src={src}
      alt="Maple"
      width={LOCKUP_WIDTH}
      height={LOCKUP_HEIGHT}
      priority
      className={cn("w-auto", className)}
      style={{ height, width: "auto" }}
    />
  );
}
