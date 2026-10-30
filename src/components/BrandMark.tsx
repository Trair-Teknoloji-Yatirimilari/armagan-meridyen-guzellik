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
    // Header (md) yatay kilidi, footer (lg) kare logoyu kullanır. Footer
    // ekranın çok altında — onu eager çekmek LCP ile bant genişliği yarışına
    // giriyordu.
    if (size !== "lg") {
      const { yatay, isaret } = logo;
      // 380 px altında yatay kilit menü butonuyla aynı satıra sığmıyor; orada
      // yalnız işaret çıkar. <picture> kullanılıyor çünkü display:none olan bir
      // <img> yine de indirilir — böylece ekran başına tek dosya iniyor.
      return (
        <picture>
          <source
            media="(max-width: 379px)"
            srcSet={`${isaret.src} 1x, ${isaret.src2x} 2x`}
            width={isaret.width}
            height={isaret.height}
          />
          <img
            src={yatay.src}
            srcSet={`${yatay.src} 1x, ${yatay.src2x} 2x`}
            alt={logo.alt}
            width={yatay.width}
            height={yatay.height}
            // 48 px mobil / 56 px masaüstü: "MERİDYEN & GÜZELLİK" satırı
            // 56 px'te okunuyor (ölçüldü: ikinci satır ~8,4 px).
            className="h-12 w-auto max-[379px]:h-11 md:h-14"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      );
    }

    return (
      <img
        src={logo.src}
        srcSet={`${logo.src} 1x, ${logo.src2x} 2x`}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="h-20 w-auto md:h-24"
        loading="lazy"
        decoding="async"
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
