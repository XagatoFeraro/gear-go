import type { MetadataRoute } from "next";
import { serviceAreas, services } from "@/data/business";

export const dynamic = "force-static";

const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://{{DOMAIN}}").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/service-areas",
    "/about",
    "/why-gear-go",
    "/contact",
    "/book",
    "/faq",
    "/privacy",
    "/terms",
  ];
  const now = new Date();
  return [
    ...routes.map((route) => ({
      url: `${base}${route || "/"}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...serviceAreas.map((a) => ({
      url: `${base}/service-areas/${a.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
