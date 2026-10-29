import { siteConfig, siteUrl } from "@/config/site.config";

/**
 * Salonun kendi tanıtım videosu.
 *
 * Dikey (720x1280) olduğu için dar bir kutuda ortalanır. OTOMATİK OYNATMA YOK:
 * `preload="none"` ile dosya ziyaretçi oynatana kadar hiç indirilmez, poster
 * tembel yüklenir — böylece LCP'yi etkilemez.
 */
export const VIDEO = {
  src: "/video/armagan-tanitim-720.mp4",
  poster: "/video/armagan-tanitim.webp",
  width: 720,
  height: 1280,
  uploadDate: "2026-10-29",
  duration: "PT1M40S",
  name: `${siteConfig.name} tanıtım videosu`,
  description:
    "Zekeriyaköy, Sarıyer'deki salonumuzun kısa tanıtımı: uygulama alanları ve çalışma düzenimiz.",
} as const;

/** Yazı sayfalarında da kullanılabilsin diye JSON-LD ayrı üretiliyor. */
export function videoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: VIDEO.name,
    description: VIDEO.description,
    thumbnailUrl: siteUrl(VIDEO.poster),
    contentUrl: siteUrl(VIDEO.src),
    uploadDate: VIDEO.uploadDate,
    duration: VIDEO.duration,
  };
}

export function TanitimVideosu({ baslik = "Salonumuzu yakından tanıyın" }: { baslik?: string }) {
  return (
    <div className="mx-auto w-full max-w-[360px]">
      <h2 className="mb-6 text-center font-display text-2xl leading-tight md:text-3xl">{baslik}</h2>
      <div className="overflow-hidden rounded-sm border border-border/60 bg-card/60">
        <video
          controls
          playsInline
          preload="none"
          poster={VIDEO.poster}
          width={VIDEO.width}
          height={VIDEO.height}
          className="h-auto w-full"
        >
          <source src={VIDEO.src} type="video/mp4" />
          Tarayıcınız video oynatmayı desteklemiyor.
        </video>
      </div>
    </div>
  );
}
