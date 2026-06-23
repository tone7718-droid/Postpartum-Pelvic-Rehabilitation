import Link from "next/link";
import type { Chapter } from "@/lib/content";

export default function ChapterNav({
  prev,
  next,
}: {
  prev?: Chapter;
  next?: Chapter;
}) {
  return (
    <nav className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/chapter/${prev.slug}`}
          className="rounded-2xl border border-[#f0e2e6] bg-white px-4 py-3 transition hover:border-rose hover:shadow-sm"
        >
          <span className="block text-xs text-ink/50">◀ 이전</span>
          <span className="font-semibold text-[#b5677e]">
            {prev.number ? `${prev.number}장. ` : ""}
            {prev.shortTitle}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/chapter/${next.slug}`}
          className="rounded-2xl border border-[#f0e2e6] bg-white px-4 py-3 text-right transition hover:border-rose hover:shadow-sm"
        >
          <span className="block text-xs text-ink/50">다음 ▶</span>
          <span className="font-semibold text-[#b5677e]">
            {next.number ? `${next.number}장. ` : ""}
            {next.shortTitle}
          </span>
        </Link>
      ) : (
        <Link
          href="/"
          className="rounded-2xl border border-[#f0e2e6] bg-white px-4 py-3 text-right transition hover:border-rose hover:shadow-sm"
        >
          <span className="block text-xs text-ink/50">🌸 끝까지 읽었어요</span>
          <span className="font-semibold text-[#b5677e]">목차로 돌아가기</span>
        </Link>
      )}
    </nav>
  );
}
