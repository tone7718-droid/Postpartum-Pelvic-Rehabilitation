// 사이트 전역 상수 — 절대 URL이 필요한 곳(sitemap·robots·metadataBase)에서 사용
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Vercel 빌드에서는 프로덕션 도메인이 주입된다
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

/** 콘텐츠에서 저장소 원본(reports/, design/)으로 링크할 때의 기준 URL */
export const REPO_URL =
  "https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main";
