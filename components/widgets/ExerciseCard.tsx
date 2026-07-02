"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locales";

type Strings = {
  sets: string;
  reps: string;
  perSide: string;
  holdSec: (n: string) => string;
  done: string;
  reset: string;
  hint: string;
  setWord: string;
};

const STR: Record<Locale, Strings> = {
  ko: {
    sets: "세트",
    reps: "회",
    perSide: "좌우 각각",
    holdSec: (n) => `${n}초 유지`,
    done: "완료! 🌸",
    reset: "초기화",
    hint: "세트를 마칠 때마다 눌러 기록하세요",
    setWord: "세트",
  },
  vi: {
    sets: "hiệp",
    reps: "lần",
    perSide: "mỗi bên",
    holdSec: (n) => `giữ ${n} giây`,
    done: "Hoàn thành! 🌸",
    reset: "Đặt lại",
    hint: "Nhấn để ghi lại mỗi khi xong một hiệp",
    setWord: "hiệp",
  },
};

export type ExerciseParams = {
  sets?: number;
  reps?: string;
  hold?: string;
  side?: boolean;
  id?: string;
};

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function ExerciseCard({
  locale,
  params,
}: {
  locale: Locale;
  params: ExerciseParams;
}) {
  const s = STR[locale] ?? STR.ko;
  const sets = Math.max(1, Math.min(10, params.sets ?? 2));
  const storeKey = params.id ? `pp-ex-${params.id}` : null;

  const [done, setDone] = useState(0);
  const [ready, setReady] = useState(false);

  // 하루 단위로 진행 상태 복원(자정 지나면 리셋)
  useEffect(() => {
    setReady(true);
    if (!storeKey) return;
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { date: string; done: number };
        if (parsed.date === todayKey()) setDone(Math.min(parsed.done, sets));
      }
    } catch {
      /* ignore */
    }
  }, [storeKey, sets]);

  function persist(next: number) {
    if (!storeKey) return;
    try {
      localStorage.setItem(
        storeKey,
        JSON.stringify({ date: todayKey(), done: next }),
      );
    } catch {
      /* ignore */
    }
  }

  function toggle(i: number) {
    // i는 0-based 인덱스. 이미 채워진 마지막을 다시 누르면 하나 줄이기
    const next = done === i + 1 ? i : i + 1;
    setDone(next);
    persist(next);
  }

  const allDone = done >= sets;

  return (
    <div className="not-prose my-4 rounded-2xl border border-[#f0e2e6] bg-white p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="rounded-full bg-rose/15 px-2.5 py-0.5 font-semibold text-[#b5677e]">
          {sets} {s.sets}
        </span>
        {params.reps && (
          <span className="text-ink/70">
            × {params.reps} {s.reps}
            {params.side ? ` · ${s.perSide}` : ""}
          </span>
        )}
        {params.hold && (
          <span className="text-ink/70">· ⏱ {s.holdSec(params.hold)}</span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        {Array.from({ length: sets }).map((_, i) => {
          const filled = ready && i < done;
          return (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1} ${s.setWord}`}
              aria-pressed={filled}
              onClick={() => toggle(i)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                filled
                  ? "border-[#b5677e] bg-[#b5677e] text-white"
                  : "border-rose/40 bg-rose/5 text-[#b5677e] hover:bg-rose/15"
              }`}
            >
              {filled ? "✓" : i + 1}
            </button>
          );
        })}

        <span className="ml-1 min-w-0 text-sm font-medium text-ink/60">
          {allDone ? s.done : ready && done > 0 ? `${done}/${sets}` : s.hint}
        </span>

        {ready && done > 0 && (
          <button
            type="button"
            onClick={() => {
              setDone(0);
              persist(0);
            }}
            className="ml-auto shrink-0 text-xs text-ink/40 underline hover:text-rose"
          >
            {s.reset}
          </button>
        )}
      </div>
    </div>
  );
}
