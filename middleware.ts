import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["ko", "vi"] as const;
const DEFAULT_LOCALE = "ko";

function detectLocale(req: NextRequest): string {
  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  // 베트남어 우선 표기가 있으면 vi, 아니면 기본 ko
  for (const part of accept.split(",")) {
    const code = part.trim().split(";")[0];
    if (code.startsWith("vi")) return "vi";
    if (code.startsWith("ko")) return "ko";
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 이미 로케일이 붙어 있으면 통과
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // 루트(또는 로케일 없는 경로)는 감지된 로케일로 리다이렉트
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${detectLocale(req)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // 정적 자원·API 제외
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
