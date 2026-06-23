import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "산후 골반 회복 가이드",
  description:
    "출산 후 골반·코어 회복을 쉽고 안전하게 안내하는 근거 기반 전자책. 셀프 평가부터 단계별 운동까지.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen font-sans antialiased">
        <header className="sticky top-0 z-20 border-b border-[#f0e2e6] bg-cream/85 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span aria-hidden>🌸</span>
              <span>산후 골반 회복 가이드</span>
            </Link>
            <Link
              href="/"
              className="rounded-full bg-rose/20 px-3 py-1 text-sm text-[#b5677e] hover:bg-rose/30"
            >
              목차
            </Link>
          </div>
        </header>
        {children}
        <footer className="mx-auto max-w-3xl px-4 py-10 text-center text-xs text-ink/50">
          <p>
            교육용 정보이며 의학적 진단·치료를 대신하지 않습니다. 통증·출혈·압박감이
            늘면 멈추고 전문가와 상담하세요.
          </p>
          <p className="mt-1">🌸 아내의 산후 회복을 응원하며</p>
        </footer>
      </body>
    </html>
  );
}
