import type { MetadataRoute } from "next";
import { countries } from "@/lib/data/countries";
import { regions } from "@/lib/data/regions";
import { policies } from "@/lib/data/policies";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/destinations",
    "/plans/regional",
    "/plans/global",
    "/how-it-works",
    "/compatibility",
    "/coverage",
    "/help",
    "/legal",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...countries.map((c) => ({
      url: `${site.url}/destinations/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...regions.map((r) => ({
      url: `${site.url}/regions/${r.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...policies.map((p) => ({
      url: `${site.url}/legal/${p.slug}`,
      lastModified: new Date(p.lastUpdated),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
