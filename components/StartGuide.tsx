"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/locales";

type Dict = {
  title: string;
  subtitle: string;
  birthQ: string;
  vaginal: string;
  cesarean: string;
  weeksQ: string;
  w0_6: string;
  w6_12: string;
  w12p: string;
  recTitle: string;
  recSelfCheck: string;
  recBreathing: string;
  recTimeline: string;
  recCsection: string;
  recStability: string;
  recAdvanced: string;
  disclaimer: string;
};

type Birth = "vaginal" | "cesarean";
type Weeks = "w0_6" | "w6_12" | "w12p";

const STORE_KEY = "pp-start-guide";

/** 선택 조합 → 추천 읽기 순서 (진단이 아닌 내비게이션) */
function recommend(
  birth: Birth,
  weeks: Weeks,
): { label: keyof Dict; slug: string }[] {
  const recs: { label: keyof Dict; slug: string }[] = [
    { label: "recSelfCheck", slug: "01-self-assessment" },
  ];
  if (birth === "cesarean") {
    recs.push({ label: "recCsection", slug: "03-recovery-timeline" });
  } else {
    recs.push({ label: "recTimeline", slug: "03-recovery-timeline" });
  }
  if (weeks === "w0_6") {
    recs.push({ label: "recBreathing", slug: "02-gentle-exercises" });
  } else if (weeks === "w6_12") {
    recs.push({ label: "recStability", slug: "02-gentle-exercises" });
  } else {
    recs.push({ label: "recAdvanced", slug: "05-advanced-progression" });
  }
  return recs;
}

const chipBase =
  "rounded-full border px-4 py-2 text-sm font-medium transition";
const chipOff =
  "border-[#f0e2e6] bg-white text-ink/70 hover:border-rose dark:border-[#403036] dark:bg-[#281e22] dark:text-white/70";
const chipOn = "border-[#9d5568] bg-[#9d5568] text-white shadow";

export default function StartGuide({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const [birth, setBirth] = useState<Birth | null>(null);
  const [weeks, setWeeks] = useState<Weeks | null>(null);

  // 지난 선택 복원 — 매번 다시 고르지 않아도 되게
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { birth?: Birth; weeks?: Weeks };
      if (saved.birth === "vaginal" || saved.birth === "cesarean")
        setBirth(saved.birth);
      if (saved.weeks === "w0_6" || saved.weeks === "w6_12" || saved.weeks === "w12p")
        setWeeks(saved.weeks);
    } catch {
      /* ignore */
    }
  }, []);

  function save(next: { birth?: Birth | null; weeks?: Weeks | null }) {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ birth: next.birth ?? birth, weeks: next.weeks ?? weeks }),
      );
    } catch {
      /* ignore */
    }
  }

  const recs = birth && weeks ? recommend(birth, weeks) : null;

  return (
    <section className="mt-6 rounded-2xl border border-[#f0e2e6] bg-white p-5 dark:border-[#403036] dark:bg-[#281e22]">
      <h2 className="text-lg font-bold">🧭 {dict.title}</h2>
      <p className="mt-1 text-sm text-ink/60 dark:text-white/60">{dict.subtitle}</p>

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-semibold text-ink/70 dark:text-white/70">
          {dict.birthQ}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(["vaginal", "cesarean"] as const).map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={birth === b}
              onClick={() => {
                setBirth(b);
                save({ birth: b });
              }}
              className={`${chipBase} ${birth === b ? chipOn : chipOff}`}
            >
              {dict[b]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-3">
        <legend className="mb-2 text-sm font-semibold text-ink/70 dark:text-white/70">
          {dict.weeksQ}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(["w0_6", "w6_12", "w12p"] as const).map((w) => (
            <button
              key={w}
              type="button"
              aria-pressed={weeks === w}
              onClick={() => {
                setWeeks(w);
                save({ weeks: w });
              }}
              className={`${chipBase} ${weeks === w ? chipOn : chipOff}`}
            >
              {dict[w]}
            </button>
          ))}
        </div>
      </fieldset>

      {recs && (
        <div className="mt-4 rounded-xl bg-rose/10 p-4 dark:bg-rose/15">
          <h3 className="text-sm font-bold text-[#9d5568] dark:text-rose">
            {dict.recTitle}
          </h3>
          <ol className="mt-2 space-y-2">
            {recs.map((r, i) => (
              <li key={r.slug + r.label}>
                <Link
                  href={`/${locale}/chapter/${r.slug}`}
                  className="group flex items-start gap-2 text-sm font-medium text-ink/80 hover:text-[#9d5568] dark:text-white/80 dark:hover:text-rose"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9d5568] text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="underline-offset-2 group-hover:underline">
                    {dict[r.label]}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs leading-relaxed text-ink/50 dark:text-white/50">
            {dict.disclaimer}
          </p>
        </div>
      )}
    </section>
  );
}
