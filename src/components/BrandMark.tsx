import { Link } from "@tanstack/react-router";

import { siteConfig } from "@/config/site.config";

/**
 * Marka bloğu — sitedeki TEK logo bileşeni. Header ve footer aynı bileşeni
 * kullanır, içerik config'ten gelir.
 *
 * İki satır:
 *   1) "ARMAĞAN MERİDYEN" — serif, büyük harf, geniş harf aralığı
 *   2) "GÜZELLİK" — küçük, iki yanında dekoratif ince çizgi (aria-hidden)
 *
 * Görsel logo geldiğinde config'te logo.src doldurmak yeterli; başka hiçbir
 * dosyaya dokunmak gerekmez.
 */
export function BrandMark({ size = "md" }: { size?: "md" | "lg" }) {
  const { logo } = siteConfig;

  if (logo.type === "image" && logo.src) {
    return <img src={logo.src} alt={logo.alt} className="h-9 w-auto" />;
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
  // aria-label KULLANILMIYOR: erişilebilir ad, görünen metinle birebir aynı
  // kalsın diye bağlantının kendi içeriğinden türetiliyor.
  return (
    <Link to="/" className="group">
      <BrandMark size={size} />
    </Link>
  );
}
