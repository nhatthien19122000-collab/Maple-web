import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-32">
      <Container className="text-center">
        <p className="font-serif text-8xl text-accent">404</p>
        <h1 className="mt-6 font-serif text-2xl">Page not found</h1>
        <p className="mt-3 text-sm text-foreground/60">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link
          href="/en"
          className="mt-8 inline-flex bg-ink px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-paper hover:bg-wood"
        >
          Back to Home
        </Link>
      </Container>
    </section>
  );
}
