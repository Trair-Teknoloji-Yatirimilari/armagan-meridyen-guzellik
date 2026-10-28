import { Link } from "@tanstack/react-router";

import { siteConfig } from "@/config/site.config";

/**
 * Metin logo. Config'te logo.src doldurulduğu anda görsel logoya geçer;
 * başka hiçbir dosyaya dokunmak gerekmez.
 */
export function BrandMark({ size = "md" }: { size?: "md" | "lg" }) {
  const textClass = size === "lg" ? "text-lg md:text-xl" : "text-base md:text-lg";

  if (siteConfig.logo.type === "image" && siteConfig.logo.src) {
    return <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="h-8 w-auto" />;
  }

  return (
    <span className="flex flex-col items-start leading-none">
      <span
        className={`text-brand-gradient font-display tracking-wide whitespace-nowrap ${textClass}`}
      >
        {siteConfig.logo.text}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:text-[11px]">
        {siteConfig.tagline}
      </span>
    </span>
  );
}

export function BrandMarkLink({ size = "md" }: { size?: "md" | "lg" }) {
  // aria-label KULLANILMIYOR: erişilebilir ad, görünen metinle birebir aynı
  // kalsın diye bağlantının kendi içeriğinden türetiliyor.
  return (
    <Link to="/" className="group">
      <BrandMark size={size} />
    </Link>
  );
}
