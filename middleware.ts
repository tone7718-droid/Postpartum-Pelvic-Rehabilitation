import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./lib/locales";

/** 언어 버튼/직접 방문으로 고른 언어를 기억하는 쿠키 */
const LOCALE_COOKIE = "NEXT_LOCALE";

function detectLocale(req: NextRequest): Locale {
  // 1) 사용자가 이전에 고른 언어가 있으면 우선
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  // 2) Accept-Language를 q-value 포함해 파싱
  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  let best: Locale = DEFAULT_LOCALE;
  let bestQ = 0;
  for (const part of accept.split(",")) {
    const [tag, ...params] = part.trim().split(";");
    const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
    if (!Number.isFinite(q) || q <= bestQ) continue;
    const base = tag.trim().split("-")[0];
    if (isLocale(base)) {
      best = base;
      bestQ = q;
    }
  }
  return best;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const seg = pathname.split("/")[1];

  // 로케일이 붙은 경로: 통과시키되, 방문한 언어를 쿠키로 기억
  if (isLocale(seg)) {
    const res = NextResponse.next();
    if (req.cookies.get(LOCALE_COOKIE)?.value !== seg) {
      res.cookies.set(LOCALE_COOKIE, seg, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return res;
  }

  // 루트는 감지된 로케일로 리다이렉트
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
