/**
 * Canlı destek widget'ı.
 *
 * Yalnızca config'te bu siteye ait bir tenant anahtarı tanımlıysa yüklenir.
 * Anahtar boşken hiçbir betik eklenmez — başka bir müşterinin anahtarı
 * kazara buraya taşınmasın diye değer kodda değil, config'te tutulur.
 */

import { isFilled, siteConfig } from "@/config/site.config";

export function ChatWidget() {
  const { trairxTenantKey, scriptSrc, title } = siteConfig.widget;
  if (!isFilled(trairxTenantKey)) return null;

  return <script src={scriptSrc} data-key={trairxTenantKey} data-title={title} />;
}
