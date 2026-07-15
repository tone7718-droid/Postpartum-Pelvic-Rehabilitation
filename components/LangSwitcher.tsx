"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/locales";

/** 현재 경로에서 로케일 세그먼트만 바꾼 링크를 만든다. */
export default function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const other: Locale = locale === "ko" ? "vi" : "ko";

  const parts = pathname.split("/");
  // parts[0] === "" , parts[1] === locale
  if (LOCALES.includes(parts[1] as Locale)) {
    parts[1] = other;
  } else {
    parts.splice(1, 0, other);
  }
  const href = parts.join("/") || `/${other}`;

  const label = other === "vi" ? "Tiếng Việt" : "한국어";

  return (
    <Link
      href={href}
      className="rounded-full border border-rose/40 px-3 py-1 text-sm text-[#9d5568] hover:bg-rose/15"
      hrefLang={other}
    >
      {label}
    </Link>
  );
}
