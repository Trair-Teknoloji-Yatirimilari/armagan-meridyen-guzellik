/**
 * Ölçümleme etiketleri — tamamen config'e bağlı.
 *
 * src/config/site.config.ts içindeki analytics kimlikleri BOŞ olduğu sürece
 * burası hiçbir şey render etmez: sayfadan tek bir üçüncü taraf isteği çıkmaz.
 *
 * Meta Pixel yükleyicisi bu depoda yok. Reklam pikseli gerekirse Tag Manager
 * kapsayıcısı üzerinden eklenmelidir; böylece pixel kodu siteye gömülmez.
 *
 * DİKKAT: Bu kimliklerden biri doldurulacaksa, KVKK gereği önce bir çerez
 * rızası akışı eklenmelidir. Rıza alınmadan etiket yüklemek doğru olmaz.
 */

import { isFilled, siteConfig } from "@/config/site.config";

export function Analytics() {
  const { ga4Id, gtmId } = siteConfig.analytics;
  const hasGa4 = isFilled(ga4Id);
  const hasGtm = isFilled(gtmId);

  if (!hasGa4 && !hasGtm) return null;

  return (
    <>
      {hasGa4 && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(ga4Id)});`,
            }}
          />
        </>
      )}

      {hasGtm && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`,
          }}
        />
      )}
    </>
  );
}
