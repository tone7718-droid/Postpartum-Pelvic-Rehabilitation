"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** content/NN-name.md 링크를 /chapter/NN-name 라우트로 변환 */
function rewriteHref(href: string): { href: string; internal: boolean } {
  if (!href) return { href: "#", internal: true };

  // 같은 폴더의 챕터 마크다운 링크: "01-self-assessment.md" or with #anchor
  const md = href.match(/^(\d+[\w-]*)\.md(#.*)?$/);
  if (md) {
    return { href: `/chapter/${md[1]}${md[2] ?? ""}`, internal: true };
  }
  // 상위 폴더(reports/design) 등은 그대로 외부 취급
  return { href, internal: /^https?:\/\//.test(href) ? false : true };
}

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a({ href, children, ...props }) {
          const { href: to, internal } = rewriteHref(href ?? "");
          if (internal && to.startsWith("/")) {
            return (
              <Link href={to} {...(props as any)}>
                {children}
              </Link>
            );
          }
          return (
            <a
              href={to}
              target={internal ? undefined : "_blank"}
              rel={internal ? undefined : "noopener noreferrer"}
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
