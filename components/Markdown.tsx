// 서버 컴포넌트: 마크다운 파싱은 빌드/서버에서 수행하고,
// 인터랙티브 위젯(BreathingTimer·ExerciseCard)만 클라이언트로 내려보낸다.
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/lib/locales";
import { REPO_URL } from "@/lib/site";
import BreathingTimer from "@/components/widgets/BreathingTimer";
import ExerciseCard from "@/components/widgets/ExerciseCard";

/** ```breathing / ```exercise 블록 안의 "key: value" 줄을 파싱 */
function parseParams(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([\w-]+)\s*:\s*(.+?)\s*$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function num(v: string | undefined): number | undefined {
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function bool(v: string | undefined): boolean {
  return v === "true" || v === "1" || v === "yes";
}

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
  // 상위 폴더(reports/design) → GitHub 원본으로 (../ 반복 허용)
  const up = href.match(/^(?:\.\.\/)+(.+)$/);
  if (up) {
    return { href: `${REPO_URL}/${up[1]}`, external: true };
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
      // singleTilde:false — "8~10회"처럼 물결표로 쓴 숫자 범위가 취소선으로 렌더링되는 것을 방지
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        pre({ children }) {
          const child: any = Array.isArray(children) ? children[0] : children;
          const className: string = child?.props?.className ?? "";
          const rawChildren = child?.props?.children;
          const raw: string = Array.isArray(rawChildren)
            ? rawChildren.join("")
            : String(rawChildren ?? "");
          const lang = className.match(/language-([\w-]+)/)?.[1];

          if (lang === "breathing") {
            const p = parseParams(raw);
            return (
              <BreathingTimer
                locale={locale}
                params={{
                  inhale: num(p.inhale),
                  hold: num(p.hold),
                  exhale: num(p.exhale),
                  holdOut: num(p.holdOut),
                  cycles: num(p.cycles),
                  variant: p.variant === "kegel" ? "kegel" : "breath",
                }}
              />
            );
          }
          if (lang === "exercise") {
            const p = parseParams(raw);
            return (
              <ExerciseCard
                locale={locale}
                params={{
                  sets: num(p.sets),
                  reps: p.reps,
                  hold: p.hold,
                  side: bool(p.side),
                  id: p.id,
                }}
              />
            );
          }
          return <pre>{children}</pre>;
        },
        img({ node: _node, src, alt, ...props }) {
          // 일러스트: 지연 로딩 + 대체 텍스트 필수 (스타일은 globals.css .prose img)
          return (
            // eslint-disable-next-line @next/next/no-img-element -- 정적 자산 원본 그대로 서빙, next/image 불필요
            <img
              src={typeof src === "string" ? src : undefined}
              alt={alt ?? ""}
              loading="lazy"
              decoding="async"
              {...props}
            />
          );
        },
        a({ href, children, node: _node, ...props }) {
          // node는 react-markdown 내부용 — DOM으로 전달하지 않는다
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
