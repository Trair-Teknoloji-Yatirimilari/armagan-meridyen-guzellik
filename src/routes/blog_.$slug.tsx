import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, ChevronDown, Clock } from "lucide-react";

import { BlogKapak, BlogKapakKredi } from "@/components/BlogKapak";
import { PageShell, SectionLabel, WhatsAppCta } from "@/components/Layout";
import { ServiceImage } from "@/components/ServiceImage";
import { serviceBySlug, servicePath } from "@/config/site.config";
import { blogPath, formatDate, postBySlug, publishedPosts, type BlogPost } from "@/lib/blog";
import { blogPostHead } from "@/lib/seo";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => (loaderData ? blogPostHead(loaderData.post) : {}),
  component: BlogPostPage,
});

/** Aynı kategoriden en yeni 3 yazı; yoksa genel olarak en yeni 3. */
function digerYazilar(post: BlogPost): BlogPost[] {
  const digerleri = publishedPosts.filter((p) => p.slug !== post.slug);
  const ayniKategori = digerleri.filter((p) => p.category && p.category === post.category);
  return (ayniKategori.length >= 3 ? ayniKategori : digerleri).slice(0, 3);
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = post.relatedServices
    .map((slug) => serviceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const digerleri = digerYazilar(post);

  return (
    <PageShell>
      <article>
        {/* Kapak: tam genişlik. Üstteki boşluk sabit başlığın yüksekliği kadar —
            görsel menünün altından başlasın. Alt kenar krem zemine eriyor. */}
        <div className="pt-[70px] md:pt-[88px]">
          <div className="relative h-[220px] w-full overflow-hidden md:h-[380px]">
            <BlogKapak post={post} sizes="100vw" oncelikli className="absolute inset-0" />
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-16 max-w-[720px] px-5 md:-mt-24 md:px-6">
          <div className="rounded-lg border border-border/70 bg-card px-6 py-8 shadow-elegant md:px-10 md:py-10">
            <Link
              to={blogPath()}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Tüm yazılar
            </Link>

            {post.category && (
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-accent-strong">
                {post.category}
              </p>
            )}

            <h1 className="mt-3 font-display text-3xl leading-tight md:text-[2.75rem]">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingMinutes} dakikalık okuma
              </span>
            </div>

            {post.description && (
              <p className="mt-6 font-display text-lg italic leading-relaxed text-foreground/80 md:text-xl">
                {post.description}
              </p>
            )}

            <div className="mt-7 border-t border-border/70" />

            <BlogKapakKredi post={post} />

            {post.toc.length > 1 && (
              <nav
                aria-label="İçindekiler"
                className="mt-7 rounded-md border border-border/60 bg-accent-soft/60 px-5 py-4"
              >
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  İçindekiler
                </h2>
                <ol className="mt-3 space-y-2">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div
              className="page-content blog-content mt-7"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </div>

        {post.faq.length > 0 && (
          <section className="relative py-14 md:py-20">
            <div className="mx-auto max-w-[720px] px-5 md:px-6">
              <SectionLabel>Sık sorulanlar</SectionLabel>
              <h2 className="sr-only">{post.title} hakkında sık sorulan sorular</h2>
              {/* details/summary: JavaScript gerekmiyor ve cevaplar her zaman
                  DOM'da — FAQPage şemasıyla birebir eşleşiyor. */}
              <div className="divide-y divide-border/60 border-y border-border/60">
                {post.faq.map((f) => (
                  <details key={f.q} className="sss-ogesi group">
                    <summary className="flex items-center justify-between gap-4 py-5 text-left text-base text-foreground/90 transition-colors hover:text-accent-strong">
                      {f.q}
                      <ChevronDown
                        className="sss-ok h-4 w-4 shrink-0 text-accent-strong"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pb-5 text-sm leading-relaxed text-foreground/70">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="relative border-t border-border/40 py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <SectionLabel>İlgili hizmetler</SectionLabel>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={servicePath(s.slug)}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card transition-shadow duration-300 hover:shadow-elegant motion-reduce:transition-none"
                    >
                      {s.image && (
                        <div className="aspect-[16/10] w-full overflow-hidden">
                          <ServiceImage
                            image={s.image}
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-lg leading-snug">{s.navLabel}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                          {s.summary}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {digerleri.length > 0 && (
          <section className="relative border-t border-border/40 py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <SectionLabel>Diğer yazılar</SectionLabel>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {digerleri.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={blogPath(p.slug)}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card transition-shadow duration-300 hover:shadow-elegant motion-reduce:transition-none"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <BlogKapak
                          post={p}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        {p.category && (
                          <span className="text-[10px] uppercase tracking-[0.3em] text-accent-strong">
                            {p.category}
                          </span>
                        )}
                        <h3 className="mt-2 font-display text-lg leading-snug">{p.title}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="relative pb-20 md:pb-28">
          <div className="mx-auto max-w-[720px] px-5 md:px-6">
            <div className="rounded-lg border border-border/70 bg-accent-soft px-6 py-10 text-center md:px-12 md:py-12">
              <h2 className="font-display text-2xl leading-tight md:text-3xl">
                Randevu ve fiyat bilgisi
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/75">
                Yazıda cevabını bulamadığınız bir şey varsa WhatsApp'tan yazın. Randevu için uygun
                saati birlikte seçiyoruz.
              </p>
              <div className="mt-8 flex justify-center">
                <WhatsAppCta
                  message={`Merhaba, "${post.title}" yazısını okudum, bilgi almak istiyorum.`}
                />
              </div>
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
