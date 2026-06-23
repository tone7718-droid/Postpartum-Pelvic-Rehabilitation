import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllChapters,
  getAdjacent,
  getChapter,
} from "@/lib/content";
import Markdown from "@/components/Markdown";
import ChapterNav from "@/components/ChapterNav";
import ReadingProgress from "@/components/ReadingProgress";

export function generateStaticParams() {
  return getAllChapters().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const chapter = getChapter(params.slug);
  if (!chapter) return { title: "산후 골반 회복 가이드" };
  return {
    title: `${chapter.title} · 산후 골반 회복 가이드`,
  };
}

export default function ChapterPage({
  params,
}: {
  params: { slug: string };
}) {
  const chapter = getChapter(params.slug);
  if (!chapter) notFound();
  const { prev, next } = getAdjacent(params.slug);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
      <ReadingProgress />

      <Link href="/" className="text-sm text-ink/50 hover:text-rose">
        ← 목차
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
        <Markdown>{chapter.body}</Markdown>
      </article>

      <ChapterNav prev={prev} next={next} />
    </main>
  );
}
