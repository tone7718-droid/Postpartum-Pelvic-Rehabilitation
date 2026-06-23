import fs from "node:fs";
import path from "node:path";
import { type Locale } from "./locales";

export { LOCALES, DEFAULT_LOCALE, isLocale } from "./locales";
export type { Locale } from "./locales";

function contentDir(locale: Locale) {
  return path.join(process.cwd(), "content", locale);
}

export type Chapter = {
  slug: string;
  order: number;
  number: string;
  title: string;
  shortTitle: string;
  body: string;
};

function parseTitle(raw: string): string {
  const m = raw.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : raw;
}

/** "0장. 시작하며 — ..." / "Chương 0. ..." -> number + short */
function splitNumber(title: string): { number: string; short: string } {
  // 한국어: "0장. ..." / 베트남어: "Chương 0. ..."
  const ko = title.match(/^(\d+)\s*장\.?\s*(.*)$/);
  if (ko) return { number: ko[1], short: ko[2].trim() };
  const vi = title.match(/^Chương\s+(\d+)\.?\s*(.*)$/i);
  if (vi) return { number: vi[1], short: vi[2].trim() };
  return { number: "", short: title };
}

function stripChrome(raw: string): string {
  let body = raw.replace(/^#\s+.+?\r?\n/, "");
  const navIdx = body.lastIndexOf("🧭");
  if (navIdx !== -1) {
    body = body.slice(0, navIdx).replace(/\n---\s*\n\s*$/, "\n");
  }
  return body.trim();
}

export function getAllChapters(locale: Locale): Chapter[] {
  const dir = contentDir(locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => /^\d+.*\.md$/.test(f))
    .sort();

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const slug = file.replace(/\.md$/, "");
    const order = parseInt(slug.match(/^(\d+)/)?.[1] ?? "0", 10);
    const title = parseTitle(raw);
    const { number, short } = splitNumber(title);
    return {
      slug,
      order,
      number,
      title,
      shortTitle: short || title,
      body: stripChrome(raw),
    };
  });
}

export function getChapter(locale: Locale, slug: string): Chapter | undefined {
  return getAllChapters(locale).find((c) => c.slug === slug);
}

export function getAdjacent(
  locale: Locale,
  slug: string,
): { prev?: Chapter; next?: Chapter } {
  const all = getAllChapters(locale);
  const i = all.findIndex((c) => c.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined,
  };
}
