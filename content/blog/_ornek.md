---
title: Örnek Yazı Başlığı
description: Bu alan arama sonuçlarında görünür. 155 karakteri geçmesin, yazının ne anlattığını tek cümlede söylesin.
date: 2026-01-01
updated: 2026-01-01
category: Bakım rehberi
relatedServices:
  - cilt-bakimi
  - kirpik-lifting
faq:
  - q: Buraya yazıyla ilgili sık sorulan bir soru yazılır.
    a: Cevap doğrudan ve kısa olsun. Bu bölüm sayfaya FAQPage yapısal verisi olarak da eklenir.
  - q: İkinci soru.
    a: İkinci cevap.
image: /images/blog/ornek.jpg
imageAlt: Örnek görsel açıklaması
draft: true
---

Bu dosya bir **şablondur**. `draft: true` olduğu için derlemeye girmez; siteye
çıkmaz, sitemap'e yazılmaz.

Yeni yazı eklemek için bu dosyayı kopyalayın, adını `<slug>.md` yapın
(örn. `kirpik-lifting-sonrasi-bakim.md`), üstteki alanları doldurun ve
`draft` değerini `false` yapın.

## Başlıklar içindekiler listesini oluşturur

Yazı sayfasındaki "İçindekiler" bölümü **H2** başlıklarından otomatik üretilir.
Bu yüzden bölüm başlıklarını `##` ile yazın.

## Bağlantılar ve biçimlendirme

Normal markdown çalışır: **kalın**, *italik*, [bağlantı](/hizmetler), listeler:

- madde bir
- madde iki

> Alıntı bloğu da kullanılabilir.

## İlgili hizmetler

`relatedServices` içine hizmet slug'larını yazın. Yazı hem kendi sayfasında o
hizmetlere bağlanır, hem de o hizmet sayfalarının altında "İlgili yazılar"
bölümünde görünür. Geçerli slug'lar `src/config/site.config.ts` içindeki
hizmet listesinde.

## Fiyat yazmayın

Sitede hiçbir yerde fiyat yok; yazılarda da olmamalı. Sağlık ya da kesin sonuç
vaadi de verilmez.
