/**
 * ARMAĞAN EGEMEN GÜZELLİK — TEK MERKEZİ YAPILANDIRMA
 *
 * Sitedeki bütün marka verisi (isim, adres, telefon, saatler, renkler,
 * ölçümleme anahtarları, hizmet listesi) yalnızca bu dosyada tutulur.
 * Bileşenlerde ve sayfalarda sabit yazılmış marka değeri YOKTUR.
 *
 * TODO ile işaretli alanlar henüz teyit edilmedi; doldurulduğunda
 * canonical, sitemap, OG, JSON-LD ve görünür metinler kendiliğinden güncellenir.
 */

export type ServiceFaq = { q: string; a: string };

export type ServiceBlock =
  { t: "h2"; text: string } | { t: "p"; text: string } | { t: "ul"; items: string[] };

export type Service = {
  /** URL parçası: /hizmetler/<slug> */
  slug: string;
  /** Menü ve kart etiketi */
  navLabel: string;
  /** H1'de kullanılan hizmet adı — başlık "<Hizmet> Sarıyer" olarak kurulur */
  name: string;
  /** false ise sayfa üretilmez, menüde ve sitemap'te görünmez */
  enabled: boolean;
  /** <title> — 60 karakteri geçmemeli */
  title: string;
  /** meta description — 155 karakteri geçmemeli */
  description: string;
  /** Kart ve hero altı kısa tanım */
  summary: string;
  /** Yer tutucu görselin üstündeki etiket */
  placeholderLabel: string;
  /** Sayfa gövdesi: tanım, uygulama süreci, kimler için */
  blocks: ServiceBlock[];
  faqs: ServiceFaq[];
};

export const siteConfig = {
  /* ---------------- Kimlik ---------------- */
  name: "Armağan Egemen Güzellik",
  /** KVKK aydınlatma metninde geçecek ticari unvan */
  legalName: "TODO_LEGAL_NAME",
  /** Menü ve footer'daki üst satır altındaki küçük yazı */
  tagline: "Sarıyer · Kilyos Caddesi",
  /** Canonical, sitemap, OG ve JSON-LD buradan beslenir. Protokolsüz yazılır. */
  domain: "TODO_DOMAIN",

  /**
   * Logo. Henüz görsel logo yok; metin logo kullanılıyor.
   * src dolduğunda SiteNav ve footer otomatik olarak görsele geçer.
   */
  logo: {
    type: "text" as "text" | "image",
    /** Metin logoda gösterilen ad */
    text: "Armağan Egemen",
    /** örn. "/logo.svg" — doldurulana kadar null */
    src: null as string | null,
    alt: "Armağan Egemen Güzellik",
  },

  /* ---------------- Renkler ----------------
   * Nötr bir başlangıç paleti. Marka rengi belirlenince yalnızca burası
   * değişir; :root değişkenleri __root.tsx tarafından buradan basılır,
   * OG görseli de aynı değerlerden üretilir.
   * TODO: marka paleti netleşince güncellenecek.
   */
  colors: {
    background: "oklch(0.975 0.004 85)",
    foreground: "oklch(0.26 0.012 75)",
    card: "oklch(0.995 0.002 85)",
    muted: "oklch(0.94 0.006 85)",
    mutedForeground: "oklch(0.50 0.012 75)",
    border: "oklch(0.88 0.008 85 / 75%)",
    primary: "oklch(0.52 0.028 70)",
    primaryForeground: "oklch(0.985 0.003 85)",
    accent: "oklch(0.66 0.035 70)",
    /** Başlık vurgularında kullanılan degrade */
    gradientFrom: "oklch(0.58 0.032 72)",
    gradientTo: "oklch(0.40 0.024 68)",
  },

  /* ---------------- Adres ---------------- */
  address: {
    streetAddress: "Maden Mah. Kilyos Cd. No:151/A",
    addressLocality: "Sarıyer",
    addressRegion: "İstanbul",
    postalCode: "TODO_POSTA_KODU",
    addressCountry: "TR",
  },

  /** Harita gömme adresi. null ise haritanın yerine yer tutucu basılır. */
  mapEmbedUrl: null as string | null,

  /** Enlem/boylam. null ise JSON-LD'ye geo eklenmez. TODO: ölçülecek. */
  geo: null as { latitude: number; longitude: number } | null,

  /* ---------------- İletişim ---------------- */
  phone: {
    /** Ekranda görünen biçim */
    display: "+90 532 470 09 84",
    /** tel: bağlantısı */
    href: "tel:+905324700984",
  },

  whatsapp: {
    /** wa.me numarası — başında + ve boşluk yok */
    number: "905324700984",
    /** Butonlara tıklayınca açılan hazır mesaj */
    defaultMessage: "Merhaba, bilgi ve randevu almak istiyorum.",
  },

  /** Instagram kullanıcı adı (@ olmadan). Boşsa bağlantı render edilmez. */
  instagram: "TODO_HANDLE",

  /* ---------------- Çalışma saatleri ----------------
   * Hem görünür metin hem JSON-LD openingHoursSpecification buradan üretilir;
   * ikisi birbirinden ayrılamaz.
   */
  hours: {
    opens: "09:00",
    closes: "20:00",
    /** Açık günler (schema.org gün adları) */
    openDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    closedDays: ["Monday"],
    /** Ekranda görünen satırlar */
    displayLines: ["Pazartesi — Kapalı", "Salı – Pazar — 09:00 / 20:00"],
  },

  /* ---------------- Ölçümleme ve widget'lar ----------------
   * HEPSİ BOŞ. Boş olduğu sürece ilgili etiket veya betik HİÇ render edilmez;
   * sayfaya tek bir üçüncü taraf isteği gitmez.
   */
  analytics: {
    /** Google Search Console doğrulama meta içeriği */
    searchConsoleToken: "",
    /** GA4 ölçüm kimliği */
    ga4Id: "",
    /** Google Tag Manager kapsayıcı kimliği */
    gtmId: "",
    /**
     * Meta Pixel kimliği.
     * Pixel yükleyici betiği depoda BİLİNÇLİ olarak yok (bkz. Analytics.tsx).
     * İhtiyaç duyulursa Tag Manager üzerinden, çerez rızası alındıktan sonra
     * eklenmelidir.
     */
    metaPixelId: "",
  },

  /** Canlı destek widget'ı. Anahtar boşken widget yüklenmez. */
  widget: {
    trairxTenantKey: "",
    scriptSrc: "https://www.wellnessallclub.com/widget.js",
    title: "Canlı Destek",
  },

  /* ---------------- Özellik bayrakları ---------------- */
  features: {
    /** Blog modülü kapalı: menüde, sitemap'te ve rotalarda yok, veritabanı bağlantısı yok. */
    blog: false,
    /** Galeri henüz yok. */
    gallery: false,
  },

  /** İletişim formunun alıcısı yalnızca .env'den okunur; boşsa form WhatsApp'a yönlenir. */
  contactFormRecipientEnvVar: "CONTACT_FORM_TO",
} as const;

/* ---------------- Hizmetler ----------------
 * Hizmet sayfaları bu listeden otomatik üretilir (bkz. src/routes/hizmetler.$slug.tsx).
 * enabled:false olan hizmet için sayfa, menü girdisi ve sitemap kaydı oluşmaz.
 */
export const services: Service[] = [
  {
    slug: "tirnak-bakimi-protez-tirnak",
    navLabel: "Tırnak Bakımı & Protez Tırnak",
    name: "Tırnak Bakımı & Protez Tırnak",
    enabled: true,
    title: "Tırnak Bakımı ve Protez Tırnak Sarıyer | Armağan Egemen",
    description:
      "Sarıyer Kilyos Caddesi'nde tırnak bakımı ve protez tırnak. Ölçü alma, şekillendirme ve dolum randevuları için WhatsApp'tan yazabilirsiniz.",
    summary:
      "Eliniz gün boyu görünür. Bakımlı bir tırnak, hazırlık aşamasına ayrılan zamanla başlar.",
    placeholderLabel: "Protez tırnak fotoğrafı gelecek",
    blocks: [
      {
        t: "p",
        text: "Kilyos Caddesi'ndeki salonumuzda tırnak bakımını acele edilmeyecek bir iş olarak görüyoruz. Önce tırnağın kendi yapısına bakıyor, ardından günlük hayatınıza uyacak boy ve forma birlikte karar veriyoruz. Klasik bakım da, protez uygulaması da aynı titizlikle yapılıyor.",
      },
      { t: "h2", text: "Uygulama nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Konuşarak başlıyoruz.</strong> Nasıl bir boy, hangi form ve hangi renk istediğinizi; ellerinizi günlük olarak nasıl kullandığınızı dinliyoruz.",
          "<strong>Hazırlık.</strong> Tırnak yüzeyi ve etrafı temizleniyor, tırnak eti düzenleniyor, yüzey uygulamaya hazırlanıyor.",
          "<strong>Şekillendirme.</strong> Protez uygulamasında seçilen forma göre uzatma yapılıyor, kalınlık tırnak boyunca dengeleniyor.",
          "<strong>Renk ve kapanış.</strong> Renk ya da şeffaf kaplama uygulanıyor, kenarlar temizleniyor, el ve tırnak çevresi nemlendiriliyor.",
          "<strong>Dolum planı.</strong> Tırnağınızın uzama hızına göre bir sonraki randevu için aralık öneriyoruz.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Kendi tırnağı çabuk kırıldığı için boy tutturamayanlar",
          "Özel bir gün öncesi derli toplu bir el görünümü isteyenler",
          "Klavye ve ev işiyle çok vakit geçirdiği için kısa, sağlam ve bakımlı bir form arayanlar",
          "Uzun süredir oje kullanmayıp sade bir bakımla başlamak isteyenler",
        ],
      },
    ],
    faqs: [
      {
        q: "Randevu ne kadar sürüyor?",
        a: "Klasik bakım kısa sürüyor; protez uygulaması ilk seferde daha uzun zaman alıyor çünkü form ve boy birlikte kararlaştırılıyor. Randevu verirken size o gün için ayıracağımız süreyi baştan söylüyoruz.",
      },
      {
        q: "Dolum için ne sıklıkla gelmeliyim?",
        a: "Tırnağın uzama hızı kişiden kişiye değişiyor. Uygulamadan sonra size kendi tırnağınıza göre bir aralık öneriyoruz; aradaki durumu WhatsApp'tan fotoğrafla da konuşabiliyoruz.",
      },
      {
        q: "Kendi tırnağım çok kısa, yine de yapılabilir mi?",
        a: "Çoğu durumda yapılabiliyor. Yine de karar vermeden önce tırnağınızı yerinde görmek istiyoruz; salona uğradığınızda birkaç dakikada bakıp açık açık söylüyoruz.",
      },
      {
        q: "Randevu ve bilgi için nasıl ulaşabilirim?",
        a: "En hızlısı WhatsApp. Yazdığınızda uygun gün ve saatleri paylaşıyor, hangi uygulamayı düşündüğünüzü birlikte netleştiriyoruz.",
      },
    ],
  },
  {
    slug: "kirpik-lifting",
    navLabel: "Kirpik Lifting",
    name: "Kirpik Lifting",
    enabled: true,
    title: "Kirpik Lifting Sarıyer | Armağan Egemen Güzellik",
    description:
      "Sarıyer'de kirpik lifting uygulaması. Kendi kirpiğinizle açık bir bakış için randevu ve bilgi WhatsApp üzerinden alınabilir.",
    summary: "Takma kirpik takmadan, kendi kirpiğinizin duruşunu değiştiren sade bir uygulama.",
    placeholderLabel: "Kirpik lifting fotoğrafı gelecek",
    blocks: [
      {
        t: "p",
        text: "Kirpik lifting, kendi kirpiklerinizin yukarı doğru kıvrılmasını sağlayan bir uygulama. Yeni kirpik eklenmiyor; var olanın duruşu değişiyor. Sabahları aynanın karşısında geçirdiğiniz süreyi kısaltmak isteyenlerin en çok tercih ettiği işlerden biri.",
      },
      { t: "h2", text: "Uygulama nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Göz çevresi hazırlanıyor.</strong> Makyaj kalıntıları temizleniyor, alt kirpikler ayrılıyor.",
          "<strong>Kalıp seçimi.</strong> Kirpik boyunuza uygun kıvrım kalıbı seçiliyor — istediğiniz etkiyi burada birlikte konuşuyoruz.",
          "<strong>Uygulama.</strong> Kirpikler kalıp üzerine tek tek yerleştiriliyor ve belirlenen sürelerde bekletiliyor.",
          "<strong>Bakım ve kapanış.</strong> Son adımda kirpik besleyici uygulanıyor, göz çevresi temizleniyor.",
          "<strong>Sonrası.</strong> İlk saatlerde nelere dikkat etmeniz gerektiğini yazılı olarak da paylaşıyoruz.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Kirpiği düz uzadığı için maskarayla istediği açıklığı yakalayamayanlar",
          "Takma kirpikle uğraşmak istemeyenler",
          "Gözlük kullandığı için kirpiğinin cama değmesinden rahatsız olanlar",
          "Sade ve bakımlı bir günlük görünüm arayanlar",
        ],
      },
    ],
    faqs: [
      {
        q: "Kendi kirpiğime bir şey oluyor mu?",
        a: "Uygulamada kirpiğe yeni bir ek yapılmıyor, var olan kirpik kalıp üzerinde şekillendiriliyor. Kirpiklerinizin durumunu randevu başında birlikte değerlendiriyor, uygun olmadığını düşünürsek açıkça söylüyoruz.",
      },
      {
        q: "Etkisi ne kadar sürüyor?",
        a: "Kirpiğin kendi yenilenme döngüsüne bağlı olarak kişiden kişiye değişiyor. Uygulamadan sonra sizin kirpiğiniz için gerçekçi bir aralık söylüyoruz.",
      },
      {
        q: "Aynı gün makyaj yapabilir miyim?",
        a: "İlk saatlerde göz çevresini olabildiğince rahat bırakmanızı öneriyoruz. Ayrıntıları ve ilk gün ne yapıp ne yapmamanız gerektiğini randevu sonunda tek tek anlatıyoruz.",
      },
      {
        q: "Kaş laminasyonuyla aynı randevuda yapılabilir mi?",
        a: "Çoğu zaman mümkün. İkisini birlikte düşünüyorsanız WhatsApp'tan yazın, aynı güne yeterli süreyi birlikte ayarlayalım.",
      },
    ],
  },
  {
    slug: "kas-laminasyonu",
    navLabel: "Kaş Laminasyonu",
    name: "Kaş Laminasyonu",
    enabled: true,
    title: "Kaş Laminasyonu Sarıyer | Armağan Egemen Güzellik",
    description:
      "Sarıyer Kilyos Caddesi'nde kaş laminasyonu. Kaş kıllarının yönünü toparlayan uygulama için randevu WhatsApp'tan alınabilir.",
    summary: "Dağınık uzayan kaş kıllarını tek yöne toplayan, dolgun bir görünüm veren uygulama.",
    placeholderLabel: "Kaş laminasyonu fotoğrafı gelecek",
    blocks: [
      {
        t: "p",
        text: "Kaş laminasyonu, farklı yönlere uzayan kaş kıllarını tek bir yönde toparlıyor. Kaşın kendi kıllarıyla çalışıldığı için sonuç doğal duruyor; sabah kaş fırçasıyla uğraşma ihtiyacı azalıyor.",
      },
      { t: "h2", text: "Uygulama nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Kaş okuması.</strong> Kaşınızın doğal yönünü, boşlukları ve yüz hatlarınıza göre istediğiniz formu konuşuyoruz.",
          "<strong>Temizlik.</strong> Kaş ve çevresi uygulamaya hazırlanıyor.",
          "<strong>Yönlendirme.</strong> Kıllar belirlenen forma göre yerleştiriliyor ve ürün belirlenen sürelerde bekletiliyor.",
          "<strong>Şekil ve bakım.</strong> Gerekirse alt-üst hat düzenleniyor, kapanışta kaş bakım ürünü uygulanıyor.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Kaş kılları düzensiz uzadığı için her sabah fırçayla uğraşanlar",
          "Kaşı seyrek görünenler ve daha dolgun bir hat isteyenler",
          "Kaş kalemini azaltıp daha sade bir görünüm arayanlar",
          "Uzun süredir kaşına dokunmamış, baştan bir form isteyenler",
        ],
      },
    ],
    faqs: [
      {
        q: "Kaşımın şekli tamamen değişir mi?",
        a: "Amaç kaşı baştan yaratmak değil, var olan kılları toparlayıp daha derli toplu göstermek. Hangi formun sizin kaşınızda gerçekçi olduğunu uygulamadan önce birlikte konuşuyoruz.",
      },
      {
        q: "Ne kadar sürüyor?",
        a: "Tek randevuda tamamlanıyor. Kaşınızın yoğunluğuna göre değişen süreyi randevu verirken size söylüyoruz.",
      },
      {
        q: "Sonrasında nelere dikkat etmeliyim?",
        a: "İlk saatlerde kaşı suyla fazla temas ettirmemek ve ovalamamak genel öneri. Randevu sonunda size özel notları tek tek anlatıyoruz.",
      },
      {
        q: "Fiyat ve uygunluk için nasıl bilgi alırım?",
        a: "WhatsApp'tan yazmanız yeterli. Kaşınızın fotoğrafını gönderirseniz uygulamanın size uygun olup olmadığını önceden konuşabiliriz.",
      },
    ],
  },
  {
    slug: "cilt-bakimi",
    navLabel: "Cilt Bakımı",
    name: "Cilt Bakımı",
    enabled: true,
    title: "Cilt Bakımı Sarıyer | Armağan Egemen Güzellik",
    description:
      "Sarıyer'de cilt bakımı randevusu. Cildinizi dinleyerek planlanan temizlik ve bakım adımları için WhatsApp'tan yazabilirsiniz.",
    summary: "Cildinize bir saat ayırmak: temizlik, nemlendirme ve size uygun bir ev rutini.",
    placeholderLabel: "Cilt bakımı odası fotoğrafı gelecek",
    blocks: [
      {
        t: "p",
        text: "Cilt bakımını tek bir kalıp uygulama olarak görmüyoruz. Kuru bir cilde yapılan bakımla, gün içinde parlayan bir cilde yapılan bakım aynı değil. Randevunun başında cildinizi ve alışkanlıklarınızı konuşuyor, adımları ona göre seçiyoruz.",
      },
      { t: "h2", text: "Randevu nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Sohbet.</strong> Cildinizin gün içindeki hâlini, kullandığınız ürünleri ve varsa hassasiyetlerinizi dinliyoruz.",
          "<strong>Temizlik.</strong> Yüzey temizliği yapılıyor, cilt bakıma hazırlanıyor.",
          "<strong>Bakım adımları.</strong> Cildinizin o günkü ihtiyacına göre seçilen adımlar sırayla uygulanıyor.",
          "<strong>Nemlendirme ve kapanış.</strong> Bakım nemlendirme ile tamamlanıyor.",
          "<strong>Ev rutini.</strong> Evde sürdürebileceğiniz sade bir sıralama öneriyoruz — uzun listeler yerine uygulanabilir olanı.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Cilt bakımına yeni başlayan ve nereden başlayacağını bilmeyenler",
          "Gün içinde cildi parlayan ya da gergin hissedenler",
          "Özel bir gün öncesinde cildini dinlendirmek isteyenler",
          "Düzenli bir bakım alışkanlığı kurmak isteyenler",
        ],
      },
      {
        t: "p",
        text: "Not: Burada yapılan bakım kozmetik bir uygulamadır. Cildinizle ilgili tıbbi bir şüpheniz varsa önce bir hekime danışmanızı öneriyoruz.",
      },
    ],
    faqs: [
      {
        q: "Hangi bakımın bana uygun olduğunu nasıl anlarız?",
        a: "Randevunun ilk bölümünde cildinize bakıyor ve alışkanlıklarınızı konuşuyoruz. Adımları ona göre birlikte seçiyoruz; emin olmadığımız bir şeyi uygulamıyoruz.",
      },
      {
        q: "Ne sıklıkla gelmeliyim?",
        a: "Cildin ihtiyacına göre değişiyor. İlk randevudan sonra size gerçekçi bir aralık öneriyoruz; aradaki değişimi WhatsApp'tan da konuşabiliyoruz.",
      },
      {
        q: "Hassas cildim var, yine de gelebilir miyim?",
        a: "Hassasiyetinizi baştan söylemeniz yeterli. Adımları buna göre sadeleştiriyoruz; uygun olmadığını düşündüğümüz bir uygulamayı önermiyoruz.",
      },
      {
        q: "Randevu almadan gelebilir miyim?",
        a: "Cilt bakımı için zaman ayırmamız gerektiğinden randevuyla gelmenizi öneriyoruz. WhatsApp'tan yazarsanız o haftanın uygun saatlerini paylaşırız.",
      },
    ],
  },
  {
    slug: "lazer-epilasyon",
    navLabel: "Lazer Epilasyon",
    name: "Lazer Epilasyon",
    // Henüz teyit edilmedi: sayfa üretilmiyor, menüde ve sitemap'te yok.
    enabled: false,
    title: "Lazer Epilasyon Sarıyer | Armağan Egemen Güzellik",
    description:
      "Sarıyer Kilyos Caddesi'nde lazer epilasyon. Uygunluk ve randevu bilgisi için WhatsApp üzerinden yazabilirsiniz.",
    summary: "Salonumuzda sunulup sunulmayacağı henüz netleşmedi.",
    placeholderLabel: "Lazer epilasyon alanı fotoğrafı gelecek",
    blocks: [
      {
        t: "p",
        text: "Bu hizmetin salonumuzda verilip verilmeyeceği henüz netleşmedi. Netleştiğinde bu sayfa yayına alınacak.",
      },
    ],
    faqs: [],
  },
];

/* ---------------- Türetilmiş değerler ve yardımcılar ---------------- */

/** Sitenin kanonik kök adresi. */
export const SITE_URL = `https://${siteConfig.domain}`;

/** Verilen yol için mutlak adres. */
export function siteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** Hazır mesajlı WhatsApp sohbet bağlantısı. */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Menüde, sitemap'te ve hizmet listelerinde kullanılan açık hizmetler. */
export const enabledServices = services.filter((s) => s.enabled);

export function serviceBySlug(slug: string): Service | undefined {
  return enabledServices.find((s) => s.slug === slug);
}

/** Hizmet sayfasının yolu. */
export function servicePath(slug: string): string {
  return `/hizmetler/${slug}`;
}

/** Tek satırlık adres — footer ve JSON-LD metinlerinde. */
export function addressLine(): string {
  const a = siteConfig.address;
  return `${a.streetAddress}, ${a.addressLocality} / ${a.addressRegion}`;
}

/** Adresi Google Haritalar'da arayan bağlantı. */
export function mapsSearchLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine())}`;
}

/** Instagram profil adresi — kullanıcı adı girilmemişse null. */
export function instagramUrl(): string | null {
  const handle = siteConfig.instagram;
  if (!handle || handle.startsWith("TODO")) return null;
  return `https://www.instagram.com/${handle}/`;
}

/** Bir TODO alanının gerçekten doldurulup doldurulmadığı. */
export function isFilled(value: string): boolean {
  return Boolean(value) && !value.startsWith("TODO");
}
