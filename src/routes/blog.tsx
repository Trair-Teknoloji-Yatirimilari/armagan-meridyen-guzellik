import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { BlogKapak } from "@/components/BlogKapak";
import { PageShell } from "@/components/Layout";
import { blogPath, formatDate, publishedPosts, type BlogPost } from "@/lib/blog";
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

const TUMU = "Tümü";

/**
 * Kategori çipleri içeriğe göre türetilir — elle tutulan ikinci bir liste yok.
 * Sıra: çok yazısı olan önce, eşitlikte Türkçe alfabetik. Yeni bir kategori
 * eklendiğinde kendiliğinden listeye girer.
 */
function kategoriler(posts: BlogPost[]): string[] {
  const sayim = new Map<string, number>();
  for (const p of posts) {
    if (p.category) sayim.set(p.category, (sayim.get(p.category) ?? 0) + 1);
  }
  return [...sayim.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "tr"))
    .map(([ad]) => ad);
}

function BlogListPage() {
  const { posts } = Route.useLoaderData();
  const tumKategoriler = kategoriler(posts);

  /**
   * Filtre YALNIZCA istemci tarafında.
   *
   * İlk render (hem sunucuda hem istemcide) her zaman "Tümü" — böylece
   * hidrasyon uyuşmazlığı olmuyor ve JavaScript kapalıyken bütün yazılar
   * görünür kalıyor. Adresteki ?kategori= değeri bağlandıktan sonra okunuyor.
   */
  const [secili, setSecili] = useState<string>(TUMU);

  useEffect(() => {
    const istenen = new URLSearchParams(window.location.search).get("kategori");
    if (istenen && tumKategoriler.includes(istenen)) setSecili(istenen);
    // tumKategoriler her render'da yeni dizi; içerik sabit olduğu için
    // bağımlılığa alınmıyor — bu etki yalnızca ilk bağlanmada çalışmalı.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sec(kategori: string) {
    setSecili(kategori);
    const url = new URL(window.location.href);
    if (kategori === TUMU) url.searchParams.delete("kategori");
    else url.searchParams.set("kategori", kategori);
    window.history.replaceState(null, "", url);
  }

  const gorunen = secili === TUMU ? posts : posts.filter((p) => p.category === secili);

  return (
    <PageShell>
      <section className="relative pb-10 pt-28 md:pb-14 md:pt-36">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <span className="text-xs uppercase tracking-[0.35em] text-accent-strong">Blog</span>
          <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">Salondan notlar</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
            Uygulamalardan önce merak edilenler, sonrasında nelere dikkat edileceği ve bakım
            alışkanlıkları üzerine kısa yazılar.
          </p>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          {/* Çipler bağlantı: JavaScript kapalıyken de paylaşılabilir adres
              üretir; açıkken sayfa yenilenmeden filtreler. */}
          <nav aria-label="Kategoriler" className="mb-10 flex flex-wrap justify-center gap-2">
            {[TUMU, ...tumKategoriler].map((k) => {
              const aktif = k === secili;
              return (
                <a
                  key={k}
                  href={k === TUMU ? "/blog" : `/blog?kategori=${encodeURIComponent(k)}`}
                  aria-current={aktif ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    sec(k);
                  }}
                  className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                    aktif
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/75 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {k}
                </a>
              );
            })}
          </nav>

          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {gorunen.map((post, i) => {
              // En yeni yazı masaüstünde iki sütun genişliğinde öne çıkar.
              const oneCikan = i === 0 && gorunen.length >= 3;
              return (
                <li key={post.slug} className={oneCikan ? "lg:col-span-2" : undefined}>
                  <YaziKarti post={post} oneCikan={oneCikan} oncelikli={i < 3} />
                </li>
              );
            })}
          </ul>

          {gorunen.length === 0 && (
            <p className="text-center text-muted-foreground">Bu kategoride henüz yazı yok.</p>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function YaziKarti({
  post,
  oneCikan,
  oncelikli,
}: {
  post: BlogPost;
  oneCikan: boolean;
  oncelikli: boolean;
}) {
  return (
    <Link
      to={blogPath(post.slug)}
      className={`group flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card transition-shadow duration-300 hover:shadow-elegant motion-reduce:transition-none ${
        // Öne çıkan kart masaüstünde iki sütuna yayıldığı için görseli de iki
        // kat yüksek olurdu ve yanındaki normal kartın gövdesinde kocaman bir
        // boşluk bırakırdı. Bu yüzden lg'de yatay düzene geçiyor: görsel solda,
        // metin sağda — yüksekliği normal kartla aynı kalıyor.
        oneCikan ? "lg:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${oneCikan ? "lg:w-1/2 lg:shrink-0" : ""}`}>
        <div className={`aspect-[16/10] w-full ${oneCikan ? "lg:h-full lg:aspect-auto" : ""}`}>
          <BlogKapak
            post={post}
            oncelikli={oncelikli}
            sizes={
              oneCikan
                ? "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            }
            className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {post.category && (
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent-strong">
            {post.category}
          </span>
        )}
        <h2
          className={`mt-3 font-display leading-snug ${oneCikan ? "text-2xl md:text-3xl" : "text-xl"}`}
        >
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 leading-relaxed text-foreground/70">{post.description}</p>

        <div className="mt-auto pt-5">
          <div className="border-t border-border/70 pt-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingMinutes} dk
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 uppercase tracking-widest text-primary">
                Oku
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
