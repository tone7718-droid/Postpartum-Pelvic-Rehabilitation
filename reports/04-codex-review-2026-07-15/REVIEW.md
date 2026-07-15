# Postpartum-Pelvic-Rehabilitation 전체 검토 보고서

검토일: 2026-07-15  
대상: [`tone7718-droid/Postpartum-Pelvic-Rehabilitation`](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation)  
검토 커밋: `7017bd6cb19629b01756ce49fc4d0b1c80a96ba0`

> 이 문서는 코드·편집·근거 품질 검토입니다. 개인의 진단이나 치료 지시를 대신하지 않습니다. 공개 전 산부인과/여성건강 물리치료 전문가와 베트남어 원어민 의료 검수자의 확인이 필요합니다.

## 한눈에 보는 결론

현재 저장소는 **구조가 좋은 정적 전자책 프로토타입**입니다. 한국어·베트남어 장 구성이 맞고, 빌드와 타입 검사를 통과했으며, 증상 중심의 단계적 회복이라는 큰 방향도 적절합니다. 다만 일반인 대상 건강 가이드로 공개하기 전에는 아래 여섯 가지를 먼저 고쳐야 합니다.

1. 빠진 산후 응급 경고 증상을 보완하고, `응급`과 `운동 중단·진료 예약`을 구분합니다.
2. “모든 운동은 6주 승인 후”라는 문구를 분만 방식·합병증·운동 강도에 따라 나눕니다.
3. 릴랙신 수치와 시점을 단정한 문구를 삭제하고 근거 수준에 맞춰 낮춥니다.
4. 아내의 정확한 출산일과 배우자 중심 표현을 제거해 개인정보와 독자 포용성을 높입니다.
5. 취약점이 보고된 Next.js 14.2.35를 지원되는 패치 버전으로 올리고 회귀 테스트를 추가합니다.
6. 베트남어 페이지의 서버 HTML도 `lang="vi"`가 되도록 라우트 레이아웃을 수정합니다.

## 확인한 범위와 검증 결과

- 앱·컴포넌트·콘텐츠 로더·미들웨어·스타일·의존성·디자인 명세를 읽었습니다.
- 한국어 7개 장을 전부 검토하고 베트남어 7개 장의 구조, 핵심 안전 문구, 링크와 개인화 문구를 대조했습니다.
- `npm run build`: 통과, 19개 정적 페이지 생성.
- `npx tsc --noEmit`: 통과.
- `npm run lint`: 실패. ESLint 설정이 없어 대화형 초기화 질문에서 멈춥니다.
- `npm audit --omit=dev`: 프로덕션 의존성 취약점 2건(Next.js high, PostCSS moderate).
- 테스트 파일과 GitHub Actions 워크플로는 없습니다.
- 저장소에는 변경·커밋·푸시를 하지 않았습니다.

## 잘된 점

- 한국어와 베트남어의 7개 장, 제목 수, 코드 펜스가 일치해 번역 동기화의 출발점이 좋습니다.
- 정적 생성과 로케일별 URL 구조가 단순하고 유지보수하기 쉽습니다.
- 운동 카드는 진행 상태를 브라우저 `localStorage`에만 저장해 서버로 민감한 건강 기록을 보내지 않습니다.
- Markdown에서 raw HTML을 활성화하지 않아 콘텐츠 주입 면이 비교적 좁습니다.
- 과도한 속도 경쟁보다 통증·압박감·출혈 등 증상에 따라 강도를 낮추는 방향을 반복해서 안내합니다.
- 골반저근은 수축뿐 아니라 이완도 중요하다고 언급하고, 제왕절개·회음부 손상·골반통의 차이를 별도 섹션으로 둔 점이 좋습니다.

## P0 — 공개 전에 고칠 항목

### 1. 산후 응급 경고 증상을 완성하고 두 단계로 구분

현재 [실천 도구의 위험 신호](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/06-practical-tools.md#L55)는 출혈·발열·상처·다리 통증 등을 다루지만, **지속되거나 심한 두통, 시야 변화, 흉통/심계항진, 호흡 곤란, 실신, 심한 복통, 얼굴·손의 심한 부종, 자신이나 아기를 해칠 생각**이 빠져 있습니다. CDC는 산후 1년까지 이런 증상을 긴급 경고로 봅니다. 과다 출혈도 모호한 표현 대신 “한 시간에 패드 한 장 이상 젖는 출혈”처럼 행동 가능한 기준을 함께 제시할 수 있습니다. [CDC Hear Her 경고 증상](https://www.cdc.gov/hearher/maternal-warning-signs/index.html)

권장 구조:

- **지금 응급 도움을 받을 증상:** 호흡 곤란, 흉통, 실신, 심한/지속 두통과 시야 변화, 심한 출혈, 자해·타해 생각 등.
- **운동을 멈추고 의료진/골반건강 전문가에게 평가받을 증상:** 새로 생기거나 악화되는 요·변실금, 질 압박감, 도밍, 지속 통증 등.

도밍이나 가벼운 누출까지 모두 “Red Flag”로 부르면 실제 응급 상황의 우선순위가 흐려집니다.

### 2. “6주 승인”을 모든 활동의 절대 관문으로 쓰지 않기

[0장 첫 문구](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/00-overview-and-myths.md#L4), [1장](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/01-self-assessment.md#L5), [3장](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/03-recovery-timeline.md#L6)은 운동을 6주 승인 뒤에만 시작하라고 하지만, [FAQ](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/04-faq-glossary.md#L11)는 합병증 없는 질식분만 뒤 호흡·짧은 걷기·부드러운 골반저 운동을 며칠 내 시작할 수 있다고 합니다. 독자에게는 서로 모순됩니다.

ACOG는 합병증 없는 질식분만 뒤에는 준비되는 대로 며칠 내 운동을 시작할 수 있다고 안내하고, 제왕절개나 합병증이 있으면 담당 산부인과와 시점을 상의하라고 합니다. 또한 산후 관리는 단일 “6주 허가”가 아니라 3주 이내 접촉과 늦어도 12주 이내 포괄 진료를 포함한 연속 과정입니다. [ACOG 산후 운동](https://www.acog.org/womens-health/faqs/exercise-after-pregnancy), [ACOG 산후 관리](https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/05/optimizing-postpartum-care)

따라서 `분만 방식/합병증 × 활동 강도`로 바꾸십시오. 짧은 걷기·호흡·편안한 움직임, 일반 근력운동, 달리기·점프를 서로 다른 기준으로 안내하는 편이 정확합니다.

### 3. 릴랙신의 정확한 소실 시점과 수유 비교를 단정하지 않기

[0장 29–35행](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/00-overview-and-myths.md#L29)과 [FAQ](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/04-faq-glossary.md#L34)는 “3일이면 거의 사라지고 2주면 정상화”, “모유수유 중 오히려 낮다”고 씁니다. 연결된 1989년 연구는 산후 3일의 혈청·모유와 6주의 혈청을 측정했지만, 이 문장들의 정확한 시간표와 수유군 비교를 모두 입증하지 않습니다. [원 연구](https://www.sciencedirect.com/science/article/pii/0002937889907643)

권장 문구: “혈중 릴랙신은 산후 감소하지만 개인별 증상 종료 시점을 정하는 지표로 쓰기 어렵습니다. 산후 골반통이나 관절의 불안정감을 릴랙신 하나로 설명할 근거도 충분하지 않습니다.” 임신 관련 골반통과 릴랙신의 관계도 연구 결과가 일관되지 않습니다. [체계적 문헌고찰](https://pmc.ncbi.nlm.nih.gov/articles/PMC3459115/)

### 4. 개인정보와 배우자 중심 프레이밍 제거

[1장 6행](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/01-self-assessment.md#L6)에 배우자의 정확한 분만일이 있고 베트남어판에도 그대로 번역돼 있습니다. 공개 자료에 필요하지 않은 개인 건강정보이므로 삭제하십시오. [README 첫 문장](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/README.md#L3)의 “아내를 위해”, 베트남어판의 `vợ yêu`, 파트너가 “운동을 못 하게 한다”는 식의 표현도 일반 독자를 위한 중립적·자기결정적인 표현으로 바꾸는 것이 좋습니다. CDC도 지시보다 경청, 지지, 진료 연결을 강조합니다. [CDC 가족·친구 지원 안내](https://www.cdc.gov/hearher/caring/index.html)

### 5. Next.js 보안 업데이트

[`package.json`](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/package.json#L12)은 Next.js 14.2.35에 고정돼 있고 `npm audit --omit=dev`에서 direct dependency high 취약점이 확인됐습니다. [Next.js 보안 공지](https://github.com/vercel/next.js/security/advisories)를 기준으로 지원되는 최신 패치 목표를 정하고, 한 번에 메이저 버전을 올릴 경우 Node 최소 버전·비동기 라우트 파라미터·`middleware`→`proxy`·`next lint` 제거 같은 변경을 별도 브랜치에서 검증하십시오. [Next.js 16 업그레이드 가이드](https://nextjs.org/docs/app/guides/upgrading/version-16)

### 6. 베트남어 서버 HTML의 언어 속성 수정

루트 레이아웃이 항상 [`<html lang="ko">`](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/app/layout.tsx#L16)를 출력하고, [`HtmlLang`](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/components/HtmlLang.tsx#L5)은 hydration 뒤 `useEffect`로만 바꿉니다. 실제 빌드 결과의 `/vi` HTML도 `lang="ko"`였습니다. 이는 스크린리더 발음, 자동 번역, 검색엔진 언어 판별에 불리합니다. 로케일 라우트의 서버 레이아웃에서 정확한 `lang`을 렌더링하도록 구조를 바꾸고 클라이언트 보정을 제거하십시오.

## P1 — 정확성과 신뢰도를 크게 높이는 항목

### 의학·운동 내용

1. **복직근 이개(DRA):** [손가락 너비 표](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/01-self-assessment.md#L32), 0장의 2/2.5손가락, FAQ의 3손가락 기준이 서로 다릅니다. 손가락 측정은 검사자 간 일치도가 기구보다 낮고 진단 등급으로 쓰기 어렵습니다. 폭의 숫자보다 증상, 장력, 기능을 강조하고 필요 시 캘리퍼/초음파를 사용하는 전문가 평가로 연결하십시오. [신뢰도 연구](https://pmc.ncbi.nlm.nih.gov/articles/PMC8413957/), [유럽 탈장학회 가이드라인](https://pmc.ncbi.nlm.nih.gov/articles/10364860/)
2. **크런치 전면 금지:** “크런치는 이개를 악화한다”는 단정은 근거보다 강합니다. 산후 복부 운동은 복직근 간격을 줄일 수 있지만 최적 프로그램과 임상적 의미의 확실성은 낮습니다. 동작 이름을 금지하기보다 도밍·통증·호흡 정지·골반저 증상에 따라 부하를 낮추라고 안내하십시오. [2025 메타분석](https://pubmed.ncbi.nlm.nih.gov/39694630/), [2021 체계적 문헌고찰](https://pubmed.ncbi.nlm.nih.gov/34391661/)
3. **셀프 테스트:** ASLR/P4의 근거는 주로 임신 또는 만성 임신 관련 골반대 통증의 임상검사입니다. 급성 산후 독자가 스스로 무릎을 눌러 P4를 재현하는 방식은 진단처럼 보이지 않게 하거나 임상가 평가 항목으로 옮기십시오.
4. **골반저근:** 모든 날숨과 반복마다 강하게 수축시키는 일반 처방은 통증·과긴장·배뇨 곤란이 있는 독자에게 맞지 않을 수 있습니다. 수축과 완전 이완을 확인하고 증상·기능에 맞춘 감독 프로그램을 권하십시오. NICE는 수축과 이완 능력을 평가하고 프로그램을 개인화하라고 합니다. [NICE NG210](https://www.nice.org.uk/guidance/ng210/chapter/Recommendations)
5. **달리기 복귀:** “최소 12주”는 보수적 전문가 지침임을 표시하십시오. 최신 합의는 특정 주차 하나보다 개인별 회복과 단계적 부하를 강조하며, 30분 걷기를 견디는 것이 평가 전 기준이 될 수 있지만 홉·최대 케겔 같은 자가 테스트를 검증된 허가 검사처럼 쓰지는 않습니다. [2024 프로그램 합의](https://bjsm.bmj.com/content/58/4/183), [2024 준비도 합의](https://bjsm.bmj.com/content/58/6/299)
6. **3·4도 회음부 열상(OASI):** 6–12주 전문 추적, 방귀·변 조절 질문, 증상 시 전문 의뢰를 추가하십시오. 도넛/고무 링 쿠션 대신 압력이 고르게 분산되는 평평하고 편안한 쿠션을 안내하십시오. [RCOG 환자 안내](https://www.rcog.org.uk/for-the-public/browse-our-patient-information/care-of-a-third-or-fourth-degree-tear-that-occurred-during-childbirth-also-known-as-obstetric-anal-sphincter-injury-oasi/)
7. **걷기 문구:** ACOG를 “며칠 뒤부터 매일 30분”으로 인용하기보다 20–30분을 목표로 짧은 세션부터 점진적으로 늘린다고 정확히 옮기십시오. 제왕절개·합병증은 별도 조건을 붙이십시오.
8. **생리 설명:** “횡격막 호흡이 가장 깊은 코어를 켠다/산소를 보내 치유한다”, “도밍은 압력이 백선으로 샌다”는 표현은 단순화가 지나칩니다. 호흡·압력·동작 협응을 배우는 방법, 부하를 조절할 신호라고 표현하십시오.
9. **운동 큐:** [데드버그의 ‘허리를 붙인 채 골반 중립’](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/05-advanced-progression.md#L25)은 서로 충돌합니다. [스쿼트의 ‘무릎이 발끝을 넘지 않게’](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/content/ko/05-advanced-progression.md#L79)는 “무릎이 발가락 방향으로 정렬되고 편안한 깊이”로 바꾸십시오. 0–6주 모든 독자에게 깊은 스쿼트·넓은 보폭을 금지하기보다 치골통·상처·증상에 따라 조절하도록 안내하십시오.

### 코드·품질 체계

1. **타이머의 일시정지:** [`BreathingTimer`](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/components/widgets/BreathingTimer.tsx#L134)는 재개할 때 `phaseStartRef`를 현재 시각으로 덮어써 진행 중 단계가 처음부터 다시 시작됩니다. `elapsedBeforePause`를 저장해 진짜 일시정지를 구현하고, `cycles`와 각 초 값을 안전한 범위로 제한하며 0초 단계는 건너뛰십시오.
2. **Lint·테스트·CI:** 비대화형 ESLint 설정, `lint/typecheck/test/build` 스크립트, GitHub Actions를 추가하십시오. 최소 테스트는 로케일 리다이렉트, 장 링크 무결성, 한/베 장 대응, Markdown 위젯 파싱, 타이머 pause/resume, 콘텐츠 안전 문구 존재 여부입니다.
3. **콘텐츠 스키마:** [`lastIndexOf("🧭")`](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/lib/content.ts#L36)로 푸터를 잘라내는 방식은 본문에 같은 문자가 들어오면 깨집니다. frontmatter에 `title`, `order`, `locale`, `translationOf`, `reviewedAt`, `medicalReviewer`를 두고 빌드 시 검증하십시오.
4. **Markdown 번들:** [`Markdown.tsx`](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/components/Markdown.tsx#L1) 전체가 클라이언트 컴포넌트라 모든 장에 Markdown 파서와 두 위젯이 번들됩니다. Markdown은 서버에서 렌더링하고 실제 위젯만 client island로 분리하십시오. `any`와 무검증 숫자 파싱도 스키마로 교체하십시오.
5. **번역 동기화:** 현재 구조는 잘 맞지만 핵심 안전 문구가 바뀔 때 두 언어를 함께 실패시키는 빌드 검사가 없습니다. `translationOf`와 필수 섹션 ID를 검사하고 베트남어는 원어민 의료 검수를 릴리스 조건으로 두십시오.
6. **README 링크:** README의 장 링크가 `content/00-...md`처럼 예전 루트를 가리키지만 실제 파일은 `content/ko/`와 `content/vi/` 아래에 있어 GitHub에서 깨집니다. 언어별 링크로 고치고 링크 무결성 검사를 CI에 포함하십시오.

## P2 — 접근성·성능·편집 품질

- 본문 링크 `#b5677e`는 흰색 대비 약 4.03:1, 크림색 대비 약 3.79:1로 일반 텍스트 WCAG AA 4.5:1에 미달합니다. 경고·정보색도 크림 배경에서 4.5:1 미만인 조합이 있습니다. 더 어두운 토큰을 만들고 자동 대비 테스트를 추가하십시오.
- [Pretendard CDN `@import`](https://github.com/tone7718-droid/Postpartum-Pelvic-Rehabilitation/blob/main/app/globals.css#L1)은 렌더링 지연과 제3자 의존성을 만듭니다. 로컬 파일과 `next/font/local`을 사용하십시오.
- 본문 바로가기(skip link), 명확한 `:focus-visible`, 진행률의 접근 가능한 이름/값, 동작 감소 설정을 전체 UI에 추가하십시오.
- 로케일별 제목·설명, canonical, `hreflang`, Open Graph 이미지를 생성하십시오. 현재 메타데이터는 두 언어를 한 문자열에 합칩니다.
- `Accept-Language`의 q-value를 무시하는 직접 파싱은 단순하지만 정확하지 않습니다. 표준 파서를 쓰거나 사용자 선택 쿠키를 우선하십시오.
- 상업 블로그와 인플루언서 자료는 동작 아이디어 참고로만 두고, 의료 주장에는 ACOG·CDC·NICE·RCOG·체계적 문헌고찰·원 연구를 우선하십시오. `reports/`의 AI 조사 문서는 작업 노트로 표시하고 최종 근거로 인용하지 마십시오.
- 각 주장에 `claim / 출처 / 대상 집단 / 근거 유형 / 마지막 검토일 / 한·베 동기화 상태`를 기록하는 근거 원장을 두면 다음 개정이 쉬워집니다.

## 일반 독자를 위한 편집 원칙

- 독자를 “아내”가 아니라 “산후 회복 중인 사람”으로 직접 부릅니다.
- 한 문단에는 행동 하나만 둡니다: `해도 되는 것`, `멈출 신호`, `누구에게 연락할지`.
- 숫자는 진단처럼 쓰지 말고 범위와 한계를 함께 씁니다.
- “골반이 틀어졌다”, “코어가 꺼졌다”, “압력이 샌다”처럼 공포를 키우는 은유를 피합니다.
- 제왕절개, 기구분만, 3·4도 열상, 조산, 고혈압·감염 등은 일반 경로에 억지로 넣지 말고 별도 분기로 연결합니다.
- 한국어 원문이 확정된 뒤 베트남어를 동기화하고, 전문용어·호칭·응급 행동 문구는 원어민 의료 검수자가 확인합니다.

## 이미지 세트

디자인 명세의 15개 ID를 모두 애니메이션풍 교육 일러스트로 제작했습니다. 같은 젊은 여성 캐릭터, 로즈·세이지·웜화이트 팔레트, 텍스트 없는 구성으로 한국어와 베트남어에서 함께 쓸 수 있게 했습니다. 자세 오해가 있었던 ASLR, 도밍, 스플릿 스쿼트 이미지는 교정본을 최종 파일로 사용했습니다.

- 전체 목록과 대체 텍스트: [GALLERY.md](GALLERY.md)
- 재생성용 프롬프트 세트: [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md)
- 실제 적용 전에는 각 이미지의 운동 자세와 해부학적 표현을 여성건강 물리치료 전문가가 한 번 더 확인해야 합니다.

## 권장 실행 순서

1. P0 의료 문구와 개인정보를 한국어에서 먼저 수정하고 임상 검수를 받습니다.
2. 같은 변경을 베트남어로 번역·원어민 검수하고 안전 문구 동기화 검사를 추가합니다.
3. Next.js 보안 업그레이드, 서버 `lang`, 타이머, ESLint·테스트·CI를 별도 PR로 나눕니다.
4. 접근성·메타데이터·폰트·Markdown 번들 최적화를 진행합니다.
5. 최종 승인된 본문에 이미지와 대체 텍스트를 연결하고, 모바일에서 확대·가독성을 확인합니다.
