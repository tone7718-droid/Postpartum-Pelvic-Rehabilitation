import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "산후 골반 회복 가이드 · Hướng dẫn phục hồi vùng chậu sau sinh",
  description:
    "출산 후 골반·코어 회복을 쉽고 안전하게 안내하는 근거 기반 전자책 (한국어·Tiếng Việt).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
