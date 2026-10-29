import { isFilled, siteConfig } from "@/config/site.config";

/**
 * WellnessAllClub canlı destek widget'ı.
 *
 * Yalnızca config'te bir kiracı anahtarı tanımlıysa yüklenir; anahtar boşken
 * hiçbir betik eklenmez.
 *
 * NEDEN BÖYLE YAZILDI — widget.js `document.currentScript` okuyor:
 *   - `defer` ZORUNLU, `async` DEĞİL. React'in script hoisting'i (React 19
 *     `<script src>` etiketlerini head'e taşıyıp `async` ekleyebiliyor)
 *     currentScript'i bozar; bu yüzden etiket React öğesi olarak değil,
 *     doğrudan HTML metni olarak basılıyor.
 *   - `dangerouslySetInnerHTML` ile basılan `<script>` etiketi SSR çıktısında
 *     olduğu gibi kalır ve hidrasyonda yeniden eklenmez — böylece sayfa başına
 *     TEK kez çalışır.
 *
 * Konum: `</body>` öncesi. data-offset, sağ alttaki sabit WhatsApp butonuyla
 * çakışmasın diye sohbet balonunu yukarı alır.
 */
export function ChatWidget() {
  const { trairxTenantKey, scriptSrc, title, business, offset, color } = siteConfig.widget;
  if (!isFilled(trairxTenantKey)) return null;

  const attrs = [
    `src="${scriptSrc}"`,
    `data-key="${trairxTenantKey}"`,
    `data-business="${business}"`,
    `data-title="${title}"`,
    `data-offset="${offset}"`,
    `data-color="${color}"`,
    "defer",
  ].join("\n    ");

  return <div dangerouslySetInnerHTML={{ __html: `<script\n    ${attrs}\n  ></script>` }} />;
}
