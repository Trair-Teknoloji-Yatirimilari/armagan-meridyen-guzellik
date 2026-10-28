import type { ServiceImageRef } from "@/config/site.config";

/**
 * Hizmet görselleri için duyarlı <img>.
 *
 * Her görselin 1600w ve 800w WebP sürümü var (bkz. public/images/hizmetler).
 * Hero dışındaki tüm kullanımlar tembel yüklenir; width/height sabit olduğu
 * için yüklenirken düzen kaymıyor (CLS 0).
 *
 * Görseller stok fotoğraftır, salonun kendi çalışması değildir — footer'daki
 * "görseller temsilidir" notu bunu açıkça söyler.
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
  return (
    <img
      src={`${image.base}-800.webp`}
      srcSet={`${image.base}-800.webp 800w, ${image.base}-1600.webp 1600w`}
      sizes={sizes}
      alt={image.alt}
      width={1600}
      height={900}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={`h-full w-full min-w-0 object-cover ${className}`}
    />
  );
}
