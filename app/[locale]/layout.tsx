import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/lib/content";
import { t } from "@/lib/i18n";
import HtmlLang from "@/components/HtmlLang";
import LangSwitcher from "@/components/LangSwitcher";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = t(locale);

  return (
    <>
      <HtmlLang locale={locale} />
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
              className="rounded-full bg-rose/20 px-3 py-1 text-sm text-[#b5677e] hover:bg-rose/30"
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
    </>
  );
}
