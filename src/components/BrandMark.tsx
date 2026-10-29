import { Link } from "@tanstack/react-router";

import { siteConfig } from "@/config/site.config";

/**
 * Marka bloğu — sitedeki TEK logo bileşeni. Header ve footer aynı bileşeni
 * kullanır, içerik config'ten gelir.
 *
 * logo.type "image" iken gerçek logo basılır (1x + 2x srcset). "text" olursa
 * iki satırlı metin logoya geri döner — config'te tek alan değiştirmek yeterli.
 */
export function BrandMark({ size = "md" }: { size?: "md" | "lg" }) {
  const { logo } = siteConfig;

  if (logo.type === "image" && logo.src) {
    // Kare orana yakın bir logo; yükseklikle ölçekleniyor, genişlik otomatik.
    const heightClass = size === "lg" ? "h-20 md:h-24" : "h-11 md:h-14";
    // Header (md) ilk ekranda; footer (lg) ekranın çok altında — onu eager
    // çekmek LCP ile bant genişliği yarışına giriyordu.
    const ustte = size !== "lg";
    return (
      <img
        src={logo.src}
        srcSet={`${logo.src} 1x, ${logo.src2x} 2x`}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={`${heightClass} w-auto`}
        loading={ustte ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={ustte ? "high" : "auto"}
      />
    );
  }

  const topClass = size === "lg" ? "text-base md:text-xl" : "text-sm md:text-lg";
  const bottomClass = size === "lg" ? "text-[10px] md:text-[11px]" : "text-[9px] md:text-[10px]";

  return (
    <span className="flex flex-col items-center leading-none">
      <span
        className={`font-display whitespace-nowrap uppercase text-brand-gradient ${topClass}`}
        style={{ letterSpacing: "0.14em" }}
      >
        {logo.primaryLine}
      </span>

      <span className={`mt-1.5 flex w-full items-center justify-center gap-2 ${bottomClass}`}>
        <span className="h-px w-4 flex-none bg-current opacity-40 md:w-6" aria-hidden="true" />
        <span
          className="whitespace-nowrap uppercase text-muted-foreground"
          style={{ letterSpacing: "0.32em" }}
        >
          {logo.secondaryLine}
        </span>
        <span className="h-px w-4 flex-none bg-current opacity-40 md:w-6" aria-hidden="true" />
      </span>
    </span>
  );
}

export function BrandMarkLink({ size = "md" }: { size?: "md" | "lg" }) {
  // aria-label KULLANILMIYOR: erişilebilir ad, görünen metinle/alt ile aynı
  // kalsın diye bağlantının kendi içeriğinden türetiliyor.
  return (
    <Link to="/" className="group">
      <BrandMark size={size} />
    </Link>
  );
}
