import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/lib/content";
import { t } from "@/lib/i18n";
import LangSwitcher from "@/components/LangSwitcher";
import { siteUrl } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    metadataBase: new URL(siteUrl()),
    title: d.siteTitle,
    description: d.tagline,
    openGraph: {
      title: d.siteTitle,
      description: d.tagline,
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "vi_VN",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const d = t(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#9d5568] focus:shadow-lg"
        >
          {d.skipToContent}
        </a>
        <header className="sticky top-0 z-20 border-b border-[#f0e2e6] bg-cream/85 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-semibold"
            >
              <span aria-hidden>🌸</span>
              <span className="line-clamp-1">{d.siteTitle}</span>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/${locale}`}
                className="rounded-full bg-rose/20 px-3 py-1 text-sm text-[#9d5568] hover:bg-rose/30"
              >
                {d.toc}
              </Link>
              <LangSwitcher locale={locale} />
            </div>
          </div>
        </header>

        {children}

        <footer className="mx-auto max-w-3xl px-4 py-10 text-center text-xs text-ink/50">
          <p>{d.footerDisclaimer}</p>
          <p className="mt-1">{d.footerSignoff}</p>
        </footer>
      </body>
    </html>
  );
}
