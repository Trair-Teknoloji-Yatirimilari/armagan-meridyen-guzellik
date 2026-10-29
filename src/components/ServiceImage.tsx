import type { ServiceImageRef } from "@/config/site.config";

/**
 * Duyarlı <img>.
 *
 * Genişlikler config'teki `widths` listesinden gelir — kaynak dosyadan büyütme
 * YAPILMADIĞI için her görselin kendi listesi var (işletmenin kendi kareleri
 * 720/1080, stok görseller 800/1600).
 *
 * width/height gerçek piksel ölçüsüdür; yüklenirken düzen kaymaz (CLS 0).
 * Hero dışındaki tüm kullanımlar tembel yüklenir.
 */
export function ServiceImage({
  image,
  sizes,
  priority = false,
  className = "",
}: {
  image: ServiceImageRef;
  /** Tarayıcıya görselin düzendeki genişliğini bildirir */
  sizes: string;
  /** Yalnızca ilk ekranda görünen görsel için true */
  priority?: boolean;
  className?: string;
}) {
  const widths = [...image.widths].sort((a, b) => a - b);
  const srcSet = widths.map((w) => `${image.base}-${w}.webp ${w}w`).join(", ");

  return (
    <img
      src={`${image.base}-${widths[0]}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
      className={`h-full w-full min-w-0 object-cover ${className}`}
    />
  );
}
