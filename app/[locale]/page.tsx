import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllChapters, isLocale, type Locale } from "@/lib/content";
import { t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: "/ko", vi: "/vi", "x-default": "/ko" },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const d = t(locale);
  const chapters = getAllChapters(locale);

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-8">
      {/* 표지 */}
      <section className="rounded-3xl bg-gradient-to-b from-rose/25 to-sage/15 px-6 py-12 text-center">
        <p className="text-4xl" aria-hidden>
          🌸
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{d.cover}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
          {d.tagline}
        </p>
        {chapters[0] && (
          <Link
            href={`/${locale}/chapter/${chapters[0].slug}`}
            className="mt-6 inline-block rounded-full bg-[#9d5568] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#8f4a5e]"
          >
            {d.startReading}
          </Link>
        )}
      </section>

      {/* 안전 안내 */}
      <p className="mt-6 rounded-xl border border-[#f0e2e6] bg-white px-4 py-3 text-xs leading-relaxed text-ink/70">
        {d.safety}
      </p>

      {/* 번역 안내 (vi) */}
      {d.translatedNote && (
        <p className="mt-3 rounded-xl border border-info/30 bg-info/5 px-4 py-3 text-xs leading-relaxed text-info">
          ℹ️ {d.translatedNote}
        </p>
      )}

      {/* 목차 */}
      <h2 className="mb-3 mt-10 text-lg font-bold">{d.tocHeading}</h2>
      <ul className="space-y-3">
        {chapters.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${locale}/chapter/${c.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-[#f0e2e6] bg-white px-4 py-4 transition hover:border-rose hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose/20 font-bold text-[#9d5568]">
                {c.number || "·"}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold group-hover:text-[#9d5568]">
                  {c.shortTitle}
                </span>
              </span>
              <span
                className="ml-auto text-ink/30 transition group-hover:translate-x-1 group-hover:text-rose"
                aria-hidden
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
