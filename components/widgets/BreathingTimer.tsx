"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locales";

type PhaseType = "in" | "hold" | "out" | "holdOut";
type Phase = { type: PhaseType; label: string; seconds: number };

type Strings = {
  start: string;
  pause: string;
  reset: string;
  cycleUnit: string;
  ofLabel: (n: number, total: number) => string;
  done: string;
  ready: string;
  phases: Record<PhaseType, string>;
  kegel: Record<PhaseType, string>;
};

const STR: Record<Locale, Strings> = {
  ko: {
    start: "시작",
    pause: "일시정지",
    reset: "다시",
    cycleUnit: "회",
    ofLabel: (n, total) => `${n} / ${total}회`,
    done: "잘하셨어요 🌸",
    ready: "준비되면 시작을 누르세요",
    phases: { in: "들이쉬기", hold: "잠시 멈춤", out: "내쉬기", holdOut: "잠시 멈춤" },
    kegel: { in: "조이기", hold: "유지", out: "천천히 풀기", holdOut: "쉬기" },
  },
  vi: {
    start: "Bắt đầu",
    pause: "Tạm dừng",
    reset: "Làm lại",
    cycleUnit: "lần",
    ofLabel: (n, total) => `${n} / ${total} lần`,
    done: "Bạn làm tốt lắm 🌸",
    ready: "Sẵn sàng thì nhấn Bắt đầu",
    phases: { in: "Hít vào", hold: "Giữ", out: "Thở ra", holdOut: "Nghỉ" },
    kegel: { in: "Siết lên", hold: "Giữ", out: "Thả từ từ", holdOut: "Nghỉ" },
  },
};

export type BreathingParams = {
  inhale?: number;
  hold?: number;
  exhale?: number;
  holdOut?: number;
  cycles?: number;
  variant?: "breath" | "kegel";
};

function buildPhases(p: BreathingParams, s: Strings): Phase[] {
  const labels = p.variant === "kegel" ? s.kegel : s.phases;
  const seq: Phase[] = [];
  if ((p.inhale ?? 0) > 0)
    seq.push({ type: "in", label: labels.in, seconds: p.inhale! });
  if ((p.hold ?? 0) > 0)
    seq.push({ type: "hold", label: labels.hold, seconds: p.hold! });
  if ((p.exhale ?? 0) > 0)
    seq.push({ type: "out", label: labels.out, seconds: p.exhale! });
  if ((p.holdOut ?? 0) > 0)
    seq.push({ type: "holdOut", label: labels.holdOut, seconds: p.holdOut! });
  return seq;
}

const SMALL = 0.5;
const LARGE = 1;

function scaleFor(type: PhaseType, progress: number): number {
  switch (type) {
    case "in":
      return SMALL + (LARGE - SMALL) * progress;
    case "out":
      return LARGE - (LARGE - SMALL) * progress;
    case "hold":
      return LARGE;
    case "holdOut":
      return SMALL;
  }
}

export default function BreathingTimer({
  locale,
  params,
}: {
  locale: Locale;
  params: BreathingParams;
}) {
  const s = STR[locale] ?? STR.ko;
  const cycles = Math.max(1, params.cycles ?? 6);
  const phases = buildPhases(
    {
      inhale: params.inhale ?? 4,
      hold: params.hold ?? 0,
      exhale: params.exhale ?? 4,
      holdOut: params.holdOut ?? 0,
      variant: params.variant ?? "breath",
    },
    s,
  );

  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [cycle, setCycle] = useState(0); // 0-based completed-ish
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secLeft, setSecLeft] = useState(phases[0]?.seconds ?? 0);
  const [scale, setScale] = useState(scaleFor(phases[0]?.type ?? "in", 0));

  const rafRef = useRef<number | null>(null);
  const phaseStartRef = useRef<number>(0);
  const cycleRef = useRef(0);
  const phaseIdxRef = useRef(0);

  const stop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const reset = useCallback(() => {
    stop();
    setRunning(false);
    setFinished(false);
    setCycle(0);
    setPhaseIdx(0);
    cycleRef.current = 0;
    phaseIdxRef.current = 0;
    setSecLeft(phases[0]?.seconds ?? 0);
    setScale(scaleFor(phases[0]?.type ?? "in", 0));
  }, [phases, stop]);

  useEffect(() => {
    if (!running) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    phaseStartRef.current = performance.now();

    const tick = (now: number) => {
      const phase = phases[phaseIdxRef.current];
      if (!phase) return;
      const elapsed = (now - phaseStartRef.current) / 1000;
      const progress = Math.min(1, elapsed / phase.seconds);

      setSecLeft(Math.max(0, Math.ceil(phase.seconds - elapsed)));
      if (!reduce) setScale(scaleFor(phase.type, progress));
      else setScale(phase.type === "in" || phase.type === "hold" ? LARGE : SMALL);

      if (elapsed >= phase.seconds) {
        // advance phase
        let nextPhase = phaseIdxRef.current + 1;
        let nextCycle = cycleRef.current;
        if (nextPhase >= phases.length) {
          nextPhase = 0;
          nextCycle += 1;
        }
        if (nextCycle >= cycles) {
          stop();
          setRunning(false);
          setFinished(true);
          setCycle(cycles);
          return;
        }
        cycleRef.current = nextCycle;
        phaseIdxRef.current = nextPhase;
        setCycle(nextCycle);
        setPhaseIdx(nextPhase);
        phaseStartRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => stop, [stop]);

  const currentPhase = finished
    ? null
    : phases[phaseIdx] ?? phases[0];

  const centerText = finished
    ? "🌸"
    : running
      ? String(secLeft)
      : "";

  return (
    <div className="not-prose my-5 rounded-2xl border border-[#f0e2e6] bg-white p-5">
      <div className="flex flex-col items-center gap-3">
        {/* animated circle */}
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-b from-rose/40 to-sage/30"
            style={{
              transform: `scale(${scale})`,
              transition:
                rafRef.current == null ? "transform 0.4s ease-out" : "none",
            }}
          />
          <div className="relative text-center">
            <div
              className="text-3xl font-bold tabular-nums text-[#a45a70]"
              aria-hidden
            >
              {centerText}
            </div>
          </div>
        </div>

        {/* phase label + cycle */}
        <div className="text-center" aria-live="polite">
          <p className="text-lg font-semibold text-ink">
            {finished ? s.done : running ? currentPhase?.label : s.ready}
          </p>
          {!finished && (
            <p className="mt-0.5 text-sm text-ink/50">
              {s.ofLabel(Math.min(cycle + 1, cycles), cycles)}
            </p>
          )}
        </div>

        {/* controls */}
        <div className="mt-1 flex items-center gap-2">
          {!finished && (
            <button
              type="button"
              onClick={() => {
                if (running) {
                  stop();
                  setRunning(false);
                } else {
                  setFinished(false);
                  setRunning(true);
                }
              }}
              className="rounded-full bg-[#b5677e] px-5 py-2 text-sm font-semibold text-white shadow hover:bg-[#a45a70]"
            >
              {running ? s.pause : s.start}
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-rose/40 px-4 py-2 text-sm text-[#b5677e] hover:bg-rose/15"
          >
            {s.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
