import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LOCALES,
  getAllChapters,
  getAdjacent,
  getChapter,
  isLocale,
  type Locale,
} from "@/lib/content";
import { t } from "@/lib/i18n";
import Markdown from "@/components/Markdown";
import ChapterNav from "@/components/ChapterNav";
import ReadingProgress from "@/components/ReadingProgress";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const c of getAllChapters(locale)) {
      params.push({ locale, slug: c.slug });
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) return {};
  const chapter = getChapter(params.locale as Locale, params.slug);
  const d = t(params.locale as Locale);
  if (!chapter) return { title: d.siteTitle };
  return { title: `${chapter.title} · ${d.siteTitle}` };
}

export default function ChapterPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = t(locale);
  const chapter = getChapter(locale, params.slug);
  if (!chapter) notFound();
  const { prev, next } = getAdjacent(locale, params.slug);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
      <ReadingProgress />

      <Link href={`/${locale}`} className="text-sm text-ink/50 hover:text-rose">
        ← {d.toc}
      </Link>

      <header className="mt-3 flex items-baseline gap-3">
        {chapter.number && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose/20 text-sm font-bold text-[#b5677e]">
            {chapter.number}
          </span>
        )}
        <h1 className="text-2xl font-bold leading-snug">{chapter.shortTitle}</h1>
      </header>

      <article className="prose prose-neutral mt-6 max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-li:my-1">
        <Markdown locale={locale}>{chapter.body}</Markdown>
      </article>

      <ChapterNav locale={locale} prev={prev} next={next} dict={d} />
    </main>
  );
}
