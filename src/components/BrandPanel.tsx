import type { ReactNode } from "react";

import { BrandMark } from "@/components/BrandMark";

/**
 * Gerçek fotoğraf gelene kadar kullanılan markalı panel.
 *
 * Krem zemin, ince altın tonlu çerçeve ve çok hafif bir doku; ortada ya marka
 * bloğu ya da hizmet/kişi adı. Kamera ikonu ya da eksik görsel uyarısı
 * YOKTUR — panel eksik bir şeyin yerini tutmuş gibi durmaz, tasarımın parçası
 * gibi durur.
 *
 * Bir hizmetin config'inde `image` tanımlandığı anda sayfalar otomatik olarak
 * fotoğrafa geçer; bu bileşene dokunmak gerekmez.
 */
export function BrandPanel({
  title,
  subtitle,
  brand = false,
  className = "",
}: {
  /** Ortada gösterilecek serif başlık (hizmet adı, kişi adı…) */
  title?: ReactNode;
  /** Başlığın altındaki küçük satır */
  subtitle?: ReactNode;
  /** Başlık yerine marka bloğunu göster */
  brand?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`brand-panel relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden px-5 py-6 text-center ${className}`}
    >
      <div className="relative max-w-full">
        {brand ? (
          <BrandMark size="lg" />
        ) : (
          <span className="block font-display text-lg leading-snug text-foreground/85 md:text-2xl">
            {title}
          </span>
        )}
        {subtitle && (
          <span className="mt-3 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
