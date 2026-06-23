// 순수 상수/타입만 — 서버·클라이언트 양쪽에서 안전하게 import (node:fs 없음)
export const LOCALES = ["ko", "vi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ko";

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}
