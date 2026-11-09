import { KAPAK_ORANI, type BlogPost } from "@/lib/blog";

/**
 * Blog kapak görseli — kart ızgarasında ve yazı sayfasının hero'sunda aynı
 * bileşen kullanılıyor.
 *
 * Görseli olmayan yazılarda fotoğraf uydurmak yerine krem zeminli bir yer
 * tutucu basılıyor: kategori adı ve ince bir çerçeve. Frontmatter'a `image`
 * eklendiği anda kendiliğinden gerçek görsele geçer.
 */

export function BlogKapak({
  post,
  sizes,
  erken = false,
  oncelikli = false,
  className = "",
}: {
  post: BlogPost;
  /** Tarayıcıya gösterim genişliğini bildirir (srcset seçimi için) */
  sizes: string;
  /** Ekranın üstündeki görseller: tembel yüklenmez */
  erken?: boolean;
  /**
   * fetchpriority="high". SAYFADA YALNIZCA BİR görselde olmalı — birden fazla
   * "yüksek" öncelik, önceliklendirmenin kendisini anlamsızlaştırıyor ve LCP
   * adayını geciktiriyor.
   */
  oncelikli?: boolean;
  className?: string;
}) {
  const { image, category } = post;

  if (!image) {
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center bg-accent-soft ${className}`}
        style={{ aspectRatio: String(KAPAK_ORANI) }}
      >
        <span className="absolute inset-3 border border-accent/60" aria-hidden="true" />
        <span className="px-4 text-center font-display text-sm uppercase tracking-[0.3em] text-accent-strong">
          {category ?? "Salondan notlar"}
        </span>
      </div>
    );
  }

  const srcSet = image.kaynaklar.map((k) => `${k.url} ${k.w}w`).join(", ");

  return (
    <img
      src={image.src}
      srcSet={srcSet}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={`h-full w-full object-cover ${className}`}
      loading={erken || oncelikli ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={oncelikli ? "high" : "auto"}
    />
  );
}

/** Kapağın altındaki küçük kaynak notu. Yalnızca kredi varsa görünür. */
export function BlogKapakKredi({ post }: { post: BlogPost }) {
  const kredi = post.image?.credit;
  if (!kredi) return null;
  return <p className="mt-2 text-right text-xs text-muted-foreground">Görsel: {kredi}</p>;
}
