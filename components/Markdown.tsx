"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/lib/locales";

const GITHUB_BASE =
  "https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main";

/** 마크다운 링크를 로케일 라우트/외부 링크로 변환 */
function rewriteHref(
  href: string,
  locale: Locale,
): { href: string; external: boolean } {
  if (!href) return { href: "#", external: false };

  // 같은 폴더의 챕터 마크다운: "01-self-assessment.md" (+#anchor)
  const md = href.match(/^(\d+[\w-]*)\.md(#.*)?$/);
  if (md) {
    return { href: `/${locale}/chapter/${md[1]}${md[2] ?? ""}`, external: false };
  }
  // 상위 폴더(reports/design) → GitHub 원본으로
  const up = href.match(/^\.\.\/(.+)$/);
  if (up) {
    return { href: `${GITHUB_BASE}/${up[1]}`, external: true };
  }
  if (/^https?:\/\//.test(href)) return { href, external: true };
  return { href, external: false };
}

export default function Markdown({
  children,
  locale,
}: {
  children: string;
  locale: Locale;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a({ href, children, ...props }) {
          const { href: to, external } = rewriteHref(href ?? "", locale);
          if (!external && to.startsWith("/")) {
            return (
              <Link href={to} {...(props as any)}>
                {children}
              </Link>
            );
          }
          return (
            <a
              href={to}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              {...props}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
