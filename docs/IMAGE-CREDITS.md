# Görsel kaynakları

Hizmet sayfalarındaki fotoğraflar [Unsplash](https://unsplash.com) üzerinden
indirilen stok görsellerdir. Unsplash Lisansı ticari kullanıma izin verir ve
atıf zorunlu değildir; yine de kayıt olarak burada tutuluyor.

**Bu görseller salonun kendi çalışması değildir.** Sitede hiçbir yerde
"bizim işimiz" ya da öncesi–sonrası olarak sunulmaz; footer'da
"Hizmet sayfalarındaki görseller temsilidir" notu bulunur.

Her dosya 1600x900 ve 800x450 WebP olarak üretildi; EXIF verisi temizlendi.

| Dosya | Unsplash ID | Fotoğraf sayfası | Fotoğrafçı | İndirme | Kullanıldığı sayfa |
| --- | --- | --- | --- | --- | --- |
| `tirnak-uygulamasi-sariyer` | `gb6gtiTZKB8` | https://unsplash.com/photos/gb6gtiTZKB8 | Giorgio Trovato | 2026-10-28 | /hizmetler/tirnak-bakimi-protez-tirnak |
| `manikur-sariyer` | `SyCC0GQi5S4` | https://unsplash.com/photos/SyCC0GQi5S4 | Chelson Tamares | 2026-10-28 | /hizmetler/manikur-pedikur (ana görsel) |
| `pedikur-sariyer` | `WBuwkanEPiM` | https://unsplash.com/photos/WBuwkanEPiM | Konstantin Shmatov | 2026-10-28 | /hizmetler/manikur-pedikur (ikinci görsel) |
| `kirpik-lifting-sariyer` | `kA74I2XMiSQ` | https://unsplash.com/photos/kA74I2XMiSQ | Victor Sirbu | 2026-10-28 | /hizmetler/ipek-kirpik — **takas edildi** |
| `ipek-kirpik-sariyer` | `-9UpJoyA3Ag` | https://unsplash.com/photos/-9UpJoyA3Ag | Ahmed Rajgoli Shoaib Shakeel | 2026-10-28 | /hizmetler/kirpik-lifting — **takas edildi** |
| `kas-laminasyonu-sariyer` | `x0r5YvOJFCg` | https://unsplash.com/photos/x0r5YvOJFCg | Sum Sum | 2026-10-28 | /hizmetler/kas-laminasyonu |
| `microblading-sariyer` | `Jp4POW00eE0` | https://unsplash.com/photos/Jp4POW00eE0 | Le Petit | 2026-10-29 | /hizmetler/microblading |
| `kalici-makyaj-sariyer` | `vKKO2MXBVOk` | https://unsplash.com/photos/vKKO2MXBVOk | Judy Beth Morris | 2026-10-28 | /hizmetler/kalici-makyaj |
| `cilt-bakimi-sariyer` | `g-m8EDc4X6Q` | https://unsplash.com/photos/g-m8EDc4X6Q | Engin Akyurt | 2026-10-28 | /hizmetler/cilt-bakimi |
| `kafa-masaji-sariyer` | `SwTXaZDkKRU` | https://unsplash.com/photos/SwTXaZDkKRU | Juan Miranda Ferris | 2026-10-28 | /hizmetler/kafa-masaji + ana sayfa imza bölümü |
| `meridyen-masaji-sariyer` | `YeekhTXpTgY` | https://unsplash.com/photos/YeekhTXpTgY | Charanjeet Dhiman | 2026-10-28 | /hizmetler/meridyen-masaji + ana sayfa imza bölümü |
| `epilasyon-sariyer` | `cZQetI50v7Q` | https://unsplash.com/photos/cZQetI50v7Q | Sum Sum | 2026-10-28 | /hizmetler/epilasyon |
| `sac-spa-sariyer` | `Md_DhaFsnCQ` | https://unsplash.com/photos/Md_DhaFsnCQ | Lindsay Cash | 2026-10-28 | /hizmetler/sac-spa |
| `solaryum-sariyer` | `pSJYz2gmaqw` | https://unsplash.com/photos/pSJYz2gmaqw | Samuel Mcgarrigle | 2026-10-28 | /hizmetler/solaryum |
| `ems-sariyer` | `FIkfmwPTKqM` | https://unsplash.com/photos/FIkfmwPTKqM | Patient Perfect | 2026-10-28 | **kullanılmıyor** — konu uyuşmuyor |

## Notlar

- **kirpik-lifting-sariyer ↔ ipek-kirpik-sariyer (takas):** `kirpik-lifting-sariyer`
  cımbızla kirpiğe tel eklenmesini gösteriyor — bu ipek kirpik uygulaması.
  `ipek-kirpik-sariyer` ise doğal kirpiğin makro çekimi. Kirpik lifting sayfası
  "yeni kirpik eklenmiyor" dediği için görseller yer değiştirdi. Dosya adları
  indirildiği gibi korundu; eşleşme yalnızca `src/config/site.config.ts` içinde
  yorumla açıklanarak düzeltildi.
- **microblading-sariyer:** dikey (2624x3936) bir fotoğraf. 16:9 kırpımda kaş ve
  göz kadrajda kalsın diye dikey merkez %57'ye alındı (`ImageOps.fit`,
  `centering=(0.5, 0.57)`). Kontrol edildi: kaş, göz ve aplikatör görünüyor.
- **ems-sariyer:** görsel EMS değil, karın bölgesine uygulanan başka bir vücut
  cihazı başlığı gösteriyor. Sayfa markalı panelde bırakıldı; dosya ileride
  gerekebilir diye depoda duruyor.
- **solaryum-sariyer:** kabin değil, "SOLARIUM / SUNBED" neon tabelası. Konu
  doğru ama uygulama görseli değil — salondan gerçek kabin fotoğrafı beklenebilir.
- **kas-laminasyonu-sariyer:** kaş bölgesinde bir uygulama gösteriyor; laminasyon
  mu başka bir kaş işlemi mi görselden kesin anlaşılmıyor.
- **Kaldırıldı:** `protez-tirnak-sariyer` (`r-Ej0NQmFlQ`, "love" yazılı kırmızı
  tırnak) istek üzerine silindi; yerine `tirnak-uygulamasi-sariyer` ana görsel oldu.

Doğru görsel bulunduğunda config'teki `image` alanını doldurmak yeterli; sayfa
kendiliğinden markalı panelden fotoğrafa geçer.
