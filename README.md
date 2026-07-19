# 🌸 산후 골반 교정 가이드 (Postpartum Pelvic Rehabilitation)

출산한 아내를 위해 **산후 골반·코어 회복**을 쉽고 안전하게 안내하는 전자책 웹사이트 프로젝트입니다.
(Next.js 기반 · Vercel 배포 · Production 브랜치 = `main`)

> ℹ️ 이 책에서 "골반 교정"은 뼈를 물리적으로 닫는다는 뜻이 아니라 **느슨해진 골반을 받쳐주는 근육(코어·골반저근·둔근)을 다시 강화하는 "골반·코어 재활"**을 의미합니다. (배경은 [`content/ko/00-overview-and-myths.md`](content/ko/00-overview-and-myths.md) 참고)

> 이 자료는 **교육용 정보**이며 의학적 진단·치료를 대신하지 않습니다.
> 부드러운 호흡·가벼운 골반저 운동·짧은 걷기는 경과가 좋으면 일찍 시작할 수 있지만, **본격적인 운동은 산후 진료에서 의료진과 상의한 뒤** 진행하세요. 통증·출혈·압박감이 늘면 멈추고 전문가와 상담하세요.

## 📚 콘텐츠 (수집본)

전자책의 기반이 될 정보를 근거 자료와 함께 정리한 수집본입니다. 심층 보고서(`reports/`)를 반영해 지속 보강합니다.

- [`content/ko/00-overview-and-myths.md`](content/ko/00-overview-and-myths.md) — **시작하며·통념 바로잡기**: "닫는 것"이 아니라 "다시 지탱하기", 릴랙신·골반교정 통념 정정, 핵심 근거 수치, 전체 지도
- [`content/ko/01-self-assessment.md`](content/ko/01-self-assessment.md) — **셀프 평가**: 복직근 이개 손가락 검사, 골반대 통증(ASLR·P4·브리지) 자가 테스트, 골반저근 점검, 위험 신호(Red Flags)
- [`content/ko/02-gentle-exercises.md`](content/ko/02-gentle-exercises.md) — **초기 운동**: 호흡→골반저→골반 기울이기→안정성→걷기의 4단계 진행, 하루 10분 초보 루틴, 자세·생활 습관 팁
- [`content/ko/03-recovery-timeline.md`](content/ko/03-recovery-timeline.md) — **회복 타임라인**: 시기별 가이드, 자연분만 회음부 열상·제왕절개 특이사항, 6~12개월 기능 회복, 달리기·고충격 복귀 기준
- [`content/ko/04-faq-glossary.md`](content/ko/04-faq-glossary.md) — **FAQ·용어 정리**: 자주 묻는 질문 11선(통념 정정·증상 유형별 접근 포함), Red Flags 요약, 핵심 용어 사전
- [`content/ko/05-advanced-progression.md`](content/ko/05-advanced-progression.md) — **본격 강화·기능 복귀(3개월+)**: 데드버그·팔로프·싱글레그·스텝업·스쿼트·런지·변형 플랭크, 고충격 복귀
- [`content/ko/06-practical-tools.md`](content/ko/06-practical-tools.md) — **실천 도구**: 증상 일지(주간 기록표), 6주 검진 체크리스트, 함께하는 사람을 위한 팁

## 📑 근거 자료 (reports/)

콘텐츠의 출처가 되는 심층 보고서 원본을 보존합니다. (여러 AI·자료를 교차 검증하기 위한 폴더)

- [`reports/01-claude-deep-research.md`](reports/01-claude-deep-research.md) — 근거 기반 산후 골반 회복 종합 보고서 (1차 연구 인용·통념 정정 포함)
- [`reports/02-grok-deep-research.md`](reports/02-grok-deep-research.md) — Grok 작성 종합 보고서 (force closure·자가 테스트·실천 가이드)
- [`reports/03-chatgpt-deep-research.md`](reports/03-chatgpt-deep-research.md) — ChatGPT 작성 종합 보고서 (근거 수준 구분·증상 유형별 접근·국내 공식 자료)

### 🔍 교차 검증 메모 (보고서 3편 비교)

| 쟁점 | Grok | Claude | ChatGPT | 채택안 / 판단 |
|---|---|---|---|---|
| **릴랙신 정상화** | 수개월~12개월 | 3일 내 소실, ~2주 정상화 | 종료시점 불확실·개인차, 릴랙신만으로 설명 약함 | **혈중 릴랙신은 빠르게 하락**, 장기 "느슨함"은 릴랙신과 별개. 단일 원인화 금지(0장) |
| **"6주면 끝"** | 골든타임 4~6개월 | DRA는 수년 뒤도 재활 가능 | 해부학 회복은 6개월, **기능은 12개월까지** 지속 | "끝" 아님. 6~12개월 회복 뉘앙스 반영(0·3장) |
| **운동 효과 근거** | 대체로 긍정 | 요실금 강함/이개 낮음 | **요실금 강함, 성기능·항문실금·탈출 제한적** | 근거 수준 정직하게 구분(0장) |
| **증상 유형** | 강화 중심 | 이완 중요 언급 | **누출형 vs 통증/긴장(과긴장)형 구분** | 유형별 접근 FAQ로 반영(4장) |
| **SI 벨트** | 적극 권장 | — | (직접 언급 적음) | 보조 도구로 한정(2장) |
| **회음부 열상/OASI** | — | — | **자연분만 열상·OASI 별도 관리** | 자연분만 섹션 신설(3장) |

## 🧭 콘텐츠 구성 원칙

1. **안전 우선** — 분만 방식·시기·강도에 맞는 안내, 제왕절개·합병증 고려, 통증 없는 범위, 숨 참지 않기
2. **근거 기반** — ACOG·코크란·1차 연구를 출처로 명시, 통념은 근거로 정정
3. **점진적 진행** — 호흡부터 시작해 무리하지 않게 단계 상승
4. **쉬운 언어 + 일러스트** — 동작·자가평가마다 그림을 함께 배치해 일반인도 직관적으로 따라 할 수 있게

## 🗺 다음 단계 (예정)

- [x] Claude 심층 보고서 1편 반영 (통념 정정·근거 보강)
- [x] Grok 심층 보고서 반영 + 교차 검증 메모 작성
- [x] ChatGPT 심층 보고서 반영 (근거 수준 구분·증상 유형별 접근·회음부 열상·6~12개월 회복)
- [x] 콘텐츠 전체 정합성 다듬기 (장 간 내비게이션·상호참조·면책 문구 일관화)
- [x] 일러스트·인터랙션 설계 명세 작성 ([`design/illustration-and-interaction-spec.md`](design/illustration-and-interaction-spec.md))
- [x] Next.js 전자책 골격 구축 (MDX 렌더 · 장 라우팅 · 내비게이션 · 읽기 진행률)
- [x] 한국어/베트남어 2개 언어 지원 (i18n · 브라우저 언어 자동 감지 · 전환 버튼)
- [x] 운동 카드 · 호흡 타이머 인터랙티브 컴포넌트
- [x] 동작별 일러스트 15종 제작 ([`reports/04-codex-review-2026-07-15/GALLERY.md`](reports/04-codex-review-2026-07-15/GALLERY.md))
- [x] Vercel 배포 (Production = main)
- [x] 보안·품질: Next.js 15 업그레이드, ESLint·CI·콘텐츠 무결성 검사, 접근성(AA 대비·skip link), SEO(hreflang·sitemap)
- [x] 일러스트 15종 본문 연결 + WebP 최적화 (ko·vi 동일 위치, 언어별 대체 텍스트)
- [x] 다크 모드 · PWA(오프라인·홈 화면 설치) · 폰트 자체 호스팅(Pretendard + 베트남어용 Be Vietnam Pro)
- [x] 홈 화면 시작 가이드(출산 방식·경과 선택 → 읽기 순서 추천) · OG 공유 이미지
- [ ] 일러스트 전문가(여성건강 물리치료) 최종 검수
- [ ] 베트남어 원어민·의료 종사자 검수
- [ ] 셀프 평가 인터랙티브 컴포넌트

## 🌐 다국어 (한국어 · Tiếng Việt)

- 콘텐츠: `content/ko/*.md`, `content/vi/*.md` (언어별 폴더, 같은 파일명 = 같은 챕터)
- 라우팅: `/ko/...`, `/vi/...` · 루트 `/`는 브라우저 언어 자동 감지 후 리다이렉트(`middleware.ts`)
- UI 문구: `lib/i18n.ts` 사전 / 로케일 상수: `lib/locales.ts`
- 헤더의 언어 버튼으로 같은 페이지의 다른 언어로 전환
- ⚠️ 베트남어는 한국어 원문의 번역본입니다. 의료 정보이므로 원어민·의료 종사자 검수 권장 (VI 페이지에 안내 표기)

## 🖥 웹사이트 실행 (Next.js)

`content/<locale>/*.md`를 그대로 읽어 전자책으로 렌더하는 Next.js(App Router) 앱입니다.

```bash
npm install
npm run dev            # http://localhost:3000  (→ /ko 또는 /vi 로 이동)
npm run build          # 정적 빌드 (ko·vi × 7장 SSG)
npm run lint           # ESLint (next/core-web-vitals)
npm run typecheck      # TypeScript 검사
npm run check:content  # ko/vi 챕터 대응·링크·위젯 무결성 검사
```

- 콘텐츠 소스: `content/<locale>/*.md` (단일 출처 — 본문 수정은 마크다운만 고치면 됩니다)
- 라우팅: `/<locale>` 표지·목차, `/<locale>/chapter/<slug>` 각 장
- 디자인 팔레트: `design/illustration-and-interaction-spec.md` 기준 (로즈/세이지/웜화이트)
- 배포: Vercel에 레포 루트 그대로 연결 (Framework: Next.js 자동 감지), Production 브랜치 = `main`

## 📁 현재 구조

```
content/
  ko/  00~06 *.md            # 한국어 7개 챕터 (단일 출처)
  vi/  00~06 *.md            # 베트남어 7개 챕터 (번역본)
app/                         # Next.js App Router (로케일 레이아웃·챕터 라우트·sitemap/robots)
components/                  # Markdown 렌더러·내비게이션·위젯(호흡 타이머·운동 카드)
lib/                         # 콘텐츠 로더·i18n 사전·로케일/사이트 상수
scripts/
  check-content.mjs          # ko/vi 대응·링크·위젯 무결성 검사 (CI에서 실행)
public/images/illustrations/ # 일러스트 15종 (전문가 검수 후 본문 연결 예정)
reports/
  01-claude-deep-research.md   # 근거 심층 보고서 원본 (Claude)
  02-grok-deep-research.md     # 근거 심층 보고서 원본 (Grok)
  03-chatgpt-deep-research.md  # 근거 심층 보고서 원본 (ChatGPT)
  04-codex-review-2026-07-15/  # 전체 검토 보고서·일러스트 갤러리·프롬프트
design/
  illustration-and-interaction-spec.md # 일러스트·인터랙션 설계 명세
```
