import { business } from "@/data/business";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && !fromEnv.includes("{{")) return fromEnv.replace(/\/$/, "");
  if (business.siteUrl && !business.siteUrl.includes("{{")) return business.siteUrl.replace(/\/$/, "");
  return "https://example.com"; // placeholder for local/build; replace on launch
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function getLocalBusinessJsonLd() {
  const site = getSiteUrl();
  const sameAs = [business.profiles.googleBusiness, business.profiles.instagram, business.profiles.facebook, business.profiles.youtube]
    .filter((v) => v && !v.includes("{{"));
  const telephone = business.phone.e164 && !business.phone.e164.includes("{{") ? business.phone.e164 : undefined;
  const email = business.email && !business.email.includes("{{") ? business.email : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site}/#business`,
    name: business.name,
    description: business.description,
    url: `${site}/`,
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.line1}, ${business.address.line2}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: "IN",
    },
    openingHoursSpecification: business.hours.openingHoursSpecification.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: business.serviceAreas.map((a) => a.name),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getServiceJsonLd(service: { name: string; shortDescription: string; slug: string }) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    provider: { "@id": `${site}/#business` },
    areaServed: { "@type": "City", name: "New Delhi" },
    url: absoluteUrl(`/services/${service.slug}/`),
  };
}

export function getFaqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
