import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";

import { PageShell, SectionLabel } from "@/components/Layout";
import { blogPath, formatDate, publishedPosts } from "@/lib/blog";
import { blogListHead } from "@/lib/seo";

/**
 * Yazı listesi.
 *
 * Yayındaki yazı yoksa rota 404 döner; statik çıktıda bu adres hiç üretilmez,
 * nginx 404.html'i servis eder.
 */
export const Route = createFileRoute("/blog")({
  loader: () => {
    if (publishedPosts.length === 0) throw notFound();
    return { posts: publishedPosts };
  },
  head: blogListHead,
  component: BlogListPage,
});

function BlogListPage() {
  const { posts } = Route.useLoaderData();

  return (
    <PageShell>
      <section className="relative pb-14 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">Salondan notlar</h1>
          <div className="hairline mt-7 max-w-xs" />
          <p className="mt-6 text-lg leading-relaxed text-foreground/75">
            Uygulamalardan önce merak edilenler, sonrasında nelere dikkat edileceği ve bakım
            alışkanlıkları üzerine kısa yazılar.
          </p>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <ul className="grid gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={blogPath(post.slug)}
                  className="group block rounded-sm border border-border/60 bg-card/60 p-6 transition-colors hover:border-primary/50 md:p-8"
                >
                  {post.category && (
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary">
                      {post.category}
                    </span>
                  )}
                  <h2 className="mt-3 font-display text-2xl leading-snug">{post.title}</h2>
                  <p className="mt-3 leading-relaxed text-foreground/70">{post.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readingMinutes} dakikalık okuma
                    </span>
                    <span className="inline-flex items-center gap-2 uppercase tracking-widest text-primary">
                      Oku
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
