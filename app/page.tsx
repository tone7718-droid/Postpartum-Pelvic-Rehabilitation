import Link from "next/link";
import { getAllChapters } from "@/lib/content";

export default function Home() {
  const chapters = getAllChapters();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
      {/* 표지 */}
      <section className="rounded-3xl bg-gradient-to-b from-rose/25 to-sage/15 px-6 py-12 text-center">
        <p className="text-4xl" aria-hidden>
          🌸
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          산후 골반 회복 가이드
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
          출산 후 골반·코어 회복을 <b>쉽고 안전하게</b>. 셀프 평가부터 무리 없는
          단계별 운동까지, 근거를 바탕으로 정리했습니다.
        </p>
        <Link
          href="/chapter/00-overview-and-myths"
          className="mt-6 inline-block rounded-full bg-[#b5677e] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#a45a70]"
        >
          처음부터 읽기 →
        </Link>
      </section>

      {/* 안전 안내 */}
      <p className="mt-6 rounded-xl border border-[#f0e2e6] bg-white px-4 py-3 text-xs leading-relaxed text-ink/70">
        ⚠️ 교육용 정보이며 의학적 진단·치료를 대신하지 않습니다. 산후 운동은{" "}
        <b>6주 진료에서 의료진 확인 후</b> 시작하고, 통증·출혈·압박감이 늘면 멈추고
        전문가와 상담하세요.
      </p>

      {/* 목차 */}
      <h2 className="mb-3 mt-10 text-lg font-bold">목차</h2>
      <ul className="space-y-3">
        {chapters.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/chapter/${c.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-[#f0e2e6] bg-white px-4 py-4 transition hover:border-rose hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose/20 font-bold text-[#b5677e]">
                {c.number || "·"}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold group-hover:text-[#b5677e]">
                  {c.shortTitle}
                </span>
              </span>
              <span
                className="ml-auto text-ink/30 transition group-hover:translate-x-1 group-hover:text-rose"
                aria-hidden
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
