/**
 * Sayfa başlıkları, canonical bağlantıları ve yapısal veri (JSON-LD).
 *
 * Buradaki her değer src/config/site.config.ts'ten gelir; NAP bilgisi
 * (isim, adres, telefon) harfi harfine config'teki hâliyle basılır.
 */

import {
  SITE_URL,
  addressLine,
  instagramUrl,
  isFilled,
  services,
  servicePath,
  serviceTitle,
  siteConfig,
  siteUrl,
  type Service,
} from "@/config/site.config";

/** Sitenin varsayılan paylaşım görseli (scripts/generate-brand-assets.mjs üretir). */
export const OG_IMAGE = siteUrl("/og-image.png");

/** Ana sayfadaki BeautySalon düğümünün @id'si — Service.provider buraya bağlanır. */
export const BUSINESS_ID = `${SITE_URL}/#beautysalon`;

type MetaTag = Record<string, string>;

/** Search Console doğrulaması — token boşken etiket hiç basılmaz. */
function verificationMeta(): MetaTag[] {
  const token = siteConfig.analytics.searchConsoleToken;
  if (!isFilled(token)) return [];
  return [{ name: "google-site-verification", content: token }];
}

export type PageHeadInput = {
  /** 60 karakteri geçmemeli */
  title: string;
  /** 155 karakteri geçmemeli */
  description: string;
  /** Kök dizinden itibaren yol, örn. "/hizmetler" */
  path: string;
  image?: string;
  imageAlt?: string;
};

/** Her sayfanın ortak head() gövdesi: title, description, canonical, OG. */
export function pageHead({ title, description, path, image, imageAlt }: PageHeadInput) {
  const url = siteUrl(path);
  const img = image ?? OG_IMAGE;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt ?? siteConfig.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: img },
      ...verificationMeta(),
    ] as MetaTag[],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Sitenin her sayfasında basılan işletme şeması. */
export function beautySalonJsonLd() {
  const sameAs = [instagramUrl()].filter((x): x is string => Boolean(x));
  const a = siteConfig.address;

  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    image: OG_IMAGE,
    telephone: siteConfig.phone.display,
    email: siteConfig.email,
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.jobTitle,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: a.streetAddress,
      addressLocality: a.addressLocality,
      addressRegion: a.addressRegion,
      ...(isFilled(a.postalCode) ? { postalCode: a.postalCode } : {}),
      addressCountry: a.addressCountry,
    },
    ...(siteConfig.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: siteConfig.geo.latitude,
            longitude: siteConfig.geo.longitude,
          },
        }
      : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...siteConfig.hours.openDays],
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
    areaServed: { "@type": "City", name: siteConfig.address.addressRegion },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hizmetler",
      itemListElement: services
        .filter((s) => s.enabled)
        .map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: siteUrl(servicePath(s.slug)) },
        })),
    },
  };
}

/** Hizmet sayfalarının head()'i: Service + BreadcrumbList + FAQPage. */
export function serviceHead(service: Service) {
  const path = servicePath(service.slug);
  const url = siteUrl(path);
  const head = pageHead({
    title: serviceTitle(service),
    description: service.description,
    path,
    imageAlt: `${service.name} — ${siteConfig.name}`,
  });

  const scripts = [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${service.name} ${siteConfig.address.addressLocality}`,
        description: service.description,
        url,
        serviceType: service.navLabel,
        areaServed: { "@type": "City", name: siteConfig.address.addressRegion },
        provider: { "@id": BUSINESS_ID },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: siteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Hizmetler", item: siteUrl("/hizmetler") },
          { "@type": "ListItem", position: 3, name: service.navLabel, item: url },
        ],
      }),
    },
  ];

  if (service.faqs.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    });
  }

  return { ...head, scripts };
}

/** Adresin tek satırlık hâli — footer ve iletişim bölümünde kullanılır. */
export { addressLine };
