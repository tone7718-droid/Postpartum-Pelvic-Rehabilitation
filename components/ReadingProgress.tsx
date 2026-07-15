"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress({ label }: { label?: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="fixed left-0 top-0 z-30 h-1 w-full bg-transparent"
    >
      <div
        className="h-full bg-rose transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
