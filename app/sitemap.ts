import type { MetadataRoute } from "next";
import { LOCALES, getAllChapters } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    entries.push({ url: `${base}/${locale}` });
    for (const c of getAllChapters(locale)) {
      entries.push({ url: `${base}/${locale}/chapter/${c.slug}` });
    }
  }
  return entries;
}
