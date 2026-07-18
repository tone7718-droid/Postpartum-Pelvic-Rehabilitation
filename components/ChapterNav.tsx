import Link from "next/link";
import type { Chapter, Locale } from "@/lib/content";

type Dict = {
  prev: string;
  next: string;
  finished: string;
  backToToc: string;
};

export default function ChapterNav({
  locale,
  prev,
  next,
  dict,
}: {
  locale: Locale;
  prev?: Chapter;
  next?: Chapter;
  dict: Dict;
}) {
  return (
    <nav className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/${locale}/chapter/${prev.slug}`}
          className="rounded-2xl border border-[#f0e2e6] bg-white px-4 py-3 transition hover:border-rose hover:shadow-sm dark:border-[#403036] dark:bg-[#281e22]"
        >
          <span className="block text-xs text-ink/50 dark:text-white/50">{dict.prev}</span>
          <span className="font-semibold text-[#9d5568] dark:text-rose">
            {prev.number ? `${prev.number}. ` : ""}
            {prev.shortTitle}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/${locale}/chapter/${next.slug}`}
          className="rounded-2xl border border-[#f0e2e6] bg-white px-4 py-3 text-right transition hover:border-rose hover:shadow-sm dark:border-[#403036] dark:bg-[#281e22]"
        >
          <span className="block text-xs text-ink/50 dark:text-white/50">{dict.next}</span>
          <span className="font-semibold text-[#9d5568] dark:text-rose">
            {next.number ? `${next.number}. ` : ""}
            {next.shortTitle}
          </span>
        </Link>
      ) : (
        <Link
          href={`/${locale}`}
          className="rounded-2xl border border-[#f0e2e6] bg-white px-4 py-3 text-right transition hover:border-rose hover:shadow-sm dark:border-[#403036] dark:bg-[#281e22]"
        >
          <span className="block text-xs text-ink/50 dark:text-white/50">{dict.finished}</span>
          <span className="font-semibold text-[#9d5568] dark:text-rose">{dict.backToToc}</span>
        </Link>
      )}
    </nav>
  );
}
