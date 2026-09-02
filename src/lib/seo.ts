import type { Country, Plan } from "@/lib/types";
import { formatData } from "@/lib/data/plans";
import { site } from "@/lib/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.company,
    url: site.url,
    description: site.description,
    email: site.supportEmail,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/destinations?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export function destinationSchema(country: Country, plans: Plan[]) {
  const low = Math.min(...plans.map((p) => p.price));
  const high = Math.max(...plans.map((p) => p.price));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${country.name} travel eSIM`,
    description: `Instant eSIM data plans for ${country.name}. ${country.speeds.join("/")} on ${country.networks.join(", ")}. Delivered as a QR code.`,
    brand: { "@type": "Brand", name: site.name },
    category: "Travel eSIM",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: low,
      highPrice: high,
      offerCount: plans.length,
      offers: plans.map((p) => ({
        "@type": "Offer",
        name: `${country.name} · ${formatData(p)} · ${p.validityDays} days`,
        price: p.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      })),
    },
  };
}

export function faqSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
