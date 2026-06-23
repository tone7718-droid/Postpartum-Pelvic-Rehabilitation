import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Chapter = {
  slug: string; // e.g. "00-overview-and-myths"
  order: number; // numeric prefix
  number: string; // "0".."6"
  title: string; // first H1 without leading "# "
  shortTitle: string; // title without "N장." prefix
  body: string; // markdown without the H1 line and trailing nav footer
};

function parseTitle(raw: string): string {
  const m = raw.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : raw;
}

/** "0장. 시작하며 — ..." -> { number: "0", short: "시작하며 — ..." } */
function splitNumber(title: string): { number: string; short: string } {
  const m = title.match(/^(\d+)\s*장\.?\s*(.*)$/);
  if (m) return { number: m[1], short: m[2].trim() };
  return { number: "", short: title };
}

/** Strip the first H1 line and the trailing "🧭 ... " nav footer we authored. */
function stripChrome(raw: string): string {
  let body = raw.replace(/^#\s+.+?\r?\n/, "");
  // remove trailing navigation block starting at the last "🧭"
  const navIdx = body.lastIndexOf("🧭");
  if (navIdx !== -1) {
    // also drop a preceding "---" separator if present
    const before = body.slice(0, navIdx).replace(/\n---\s*\n\s*$/, "\n");
    body = before;
  }
  return body.trim();
}

export function getAllChapters(): Chapter[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /^\d+.*\.md$/.test(f))
    .sort();

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
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

export function getChapter(slug: string): Chapter | undefined {
  return getAllChapters().find((c) => c.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: Chapter;
  next?: Chapter;
} {
  const all = getAllChapters();
  const i = all.findIndex((c) => c.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined,
  };
}
