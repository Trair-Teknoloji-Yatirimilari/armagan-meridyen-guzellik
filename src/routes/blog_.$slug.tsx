import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, ChevronRight, Clock, HelpCircle } from "lucide-react";

import { PageShell, SectionLabel, WhatsAppCta } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { serviceBySlug, servicePath } from "@/config/site.config";
import { blogPath, formatDate, postBySlug } from "@/lib/blog";
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

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = post.relatedServices
    .map((slug) => serviceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <PageShell>
      <article>
        <section className="relative pb-10 pt-28 md:pt-36">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <nav
              aria-label="Konum izi"
              className="mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Link to="/" className="transition-colors hover:text-primary">
                Ana sayfa
              </Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <Link to={blogPath()} className="transition-colors hover:text-primary">
                Blog
              </Link>
            </nav>

            {post.category && (
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{post.category}</p>
            )}
            <h1 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingMinutes} dakikalık okuma
              </span>
            </div>

            <div className="hairline mt-7 max-w-xs" />

            {post.image && (
              <figure className="mt-10 aspect-16/9 overflow-hidden rounded-sm">
                <img
                  src={post.image.src}
                  alt={post.image.alt}
                  width={1600}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full min-w-0 object-cover"
                />
              </figure>
            )}
          </div>
        </section>

        {post.toc.length > 1 && (
          <section className="relative pb-6">
            <div className="mx-auto max-w-3xl px-6 lg:px-10">
              <nav
                aria-label="İçindekiler"
                className="rounded-sm border border-border/60 bg-card/60 px-6 py-5"
              >
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  İçindekiler
                </h2>
                <ol className="mt-4 space-y-2">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </section>
        )}

        <section className="relative pb-8">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <div className="page-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </section>

        {post.faq.length > 0 && (
          <section className="relative py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-10">
              <SectionLabel>Sık sorulanlar</SectionLabel>
              <h2 className="sr-only">{post.title} hakkında sık sorulan sorular</h2>
              <Accordion type="single" collapsible className="w-full">
                {post.faq.map((f, idx) => (
                  <AccordionItem
                    key={f.q}
                    value={`post-faq-${idx}`}
                    className="border-b border-border/60"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-normal text-foreground/90 hover:text-primary hover:no-underline">
                      <span className="flex items-start gap-4">
                        <HelpCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                          strokeWidth={1.2}
                          aria-hidden="true"
                        />
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-9 text-sm leading-relaxed text-foreground/70">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="relative border-t border-border/40 py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-10">
              <SectionLabel>Bu yazıdaki hizmetler</SectionLabel>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={servicePath(s.slug)}
                      className="block h-full rounded-sm border border-border/60 bg-card/60 p-5 transition-colors hover:border-primary/50"
                    >
                      <h3 className="font-display text-lg leading-snug">{s.navLabel}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{s.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="relative pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <div className="rounded-sm border border-border/60 bg-card/85 px-6 py-10 text-center shadow-elegant md:px-12 md:py-12">
              <h2 className="font-display text-2xl leading-tight md:text-3xl">
                Aklınızdaki soruyu yazın
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/70">
                Yazıda cevabını bulamadığınız bir şey varsa WhatsApp'tan sorabilirsiniz. Randevu
                için uygun saati birlikte seçiyoruz.
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
