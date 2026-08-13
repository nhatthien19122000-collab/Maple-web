import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/content/blog";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);
  const post = getPostBySlug(slug);
  if (!post) return { title: dict.blog.eyebrow };
  return { title: post.title[loc], description: post.excerpt[loc] };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const paragraphs = post.content[locale].split("\n\n");

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-32">
        <Image src={post.coverImage} alt={post.title[locale]} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <Container className="relative z-10 w-full pb-16 lg:pb-20">
          <Reveal>
            <p className="mb-4 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-wood">
              {post.category[locale]} · {formatDate(post.date, locale)}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-3xl font-serif text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.1] text-white text-balance">
              {post.title[locale]}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-sm text-white/60">
              {dict.blog.by} {post.author} · {post.readTimeMinutes} {dict.common.minRead}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          <Reveal className="space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-[1.05rem] leading-relaxed text-foreground/75">
                {para}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-surface-muted py-20 lg:py-28">
          <Container>
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-2xl">{dict.blog.relatedTitle}</h2>
              <Link href={`/${locale}/blog`} className="text-sm text-accent hover:underline">
                {dict.common.viewAll}
              </Link>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/${locale}/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-muted">
                    <Image
                      src={p.coverImage}
                      alt={p.title[locale]}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
                    {p.title[locale]}
                  </h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
