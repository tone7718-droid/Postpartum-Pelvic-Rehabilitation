# 🌸 산후 골반 교정 가이드 (Postpartum Pelvic Rehabilitation)

출산한 아내를 위해 **산후 골반·코어 회복**을 쉽고 안전하게 안내하는 전자책 웹사이트 프로젝트입니다.
(Vercel 배포 예정 · Next.js 기반으로 구축 예정)

> ℹ️ 이 책에서 "골반 교정"은 뼈를 물리적으로 닫는다는 뜻이 아니라 **느슨해진 골반을 받쳐주는 근육(코어·골반저근·둔근)을 다시 강화하는 "골반·코어 재활"**을 의미합니다. (배경은 [`content/00-overview-and-myths.md`](content/00-overview-and-myths.md) 참고)

> 이 자료는 **교육용 정보**이며 의학적 진단·치료를 대신하지 않습니다.
> 산후 운동은 **6주 진료에서 의료진 승인 후** 시작하고, 통증·출혈·압박감이 늘면 멈추고 전문가와 상담하세요.

## 📚 콘텐츠 (수집본)

전자책의 기반이 될 정보를 근거 자료와 함께 정리한 수집본입니다. 심층 보고서(`reports/`)를 반영해 지속 보강합니다.

- [`content/00-overview-and-myths.md`](content/00-overview-and-myths.md) — **시작하며·통념 바로잡기**: "닫는 것"이 아니라 "다시 지탱하기", 릴랙신·골반교정 통념 정정, 핵심 근거 수치, 전체 지도
- [`content/01-self-assessment.md`](content/01-self-assessment.md) — **셀프 평가**: 복직근 이개 손가락 검사, 골반대 통증(ASLR·P4·브리지) 자가 테스트, 골반저근 점검, 위험 신호(Red Flags)
- [`content/02-gentle-exercises.md`](content/02-gentle-exercises.md) — **초기 운동**: 호흡→골반저→골반 기울이기→안정성→걷기의 4단계 진행, 하루 10분 초보 루틴, 자세·생활 습관 팁
- [`content/03-recovery-timeline.md`](content/03-recovery-timeline.md) — **회복 타임라인**: 0~2주/2~6주/6주 진료/6~12주/12주+ 시기별 가이드, 제왕절개 특이사항, 달리기·고충격 복귀 기준
- [`content/04-faq-glossary.md`](content/04-faq-glossary.md) — **FAQ·용어 정리**: 자주 묻는 질문 10선(통념 정정 포함), Red Flags 요약, 핵심 용어 사전

## 📑 근거 자료 (reports/)

콘텐츠의 출처가 되는 심층 보고서 원본을 보존합니다. (여러 AI·자료를 교차 검증하기 위한 폴더)

- [`reports/01-claude-deep-research.md`](reports/01-claude-deep-research.md) — 근거 기반 산후 골반 회복 종합 보고서 (1차 연구 인용·통념 정정 포함)

## 🧭 콘텐츠 구성 원칙

1. **안전 우선** — 6주 승인·제왕절개 고려·통증 없는 범위·숨 참지 않기
2. **근거 기반** — ACOG·코크란·1차 연구를 출처로 명시, 통념은 근거로 정정
3. **점진적 진행** — 호흡부터 시작해 무리하지 않게 단계 상승
4. **쉬운 언어 + 일러스트(예정)** — 일반인도 직관적으로 따라 할 수 있게

## 🗺 다음 단계 (예정)

- [x] Claude 심층 보고서 1편 반영 (통념 정정·근거 보강)
- [ ] Grok·ChatGPT 심층 보고서 추가 반영 및 교차 검증
- [ ] 동작별 SVG/일러스트 추가
- [ ] Next.js + Tailwind 전자책 UI 구축 (셀프 평가 인터랙티브 체크 포함)
- [ ] Vercel 배포

## 📁 현재 구조

```
content/
  00-overview-and-myths.md # 시작하며·통념 바로잡기
  01-self-assessment.md    # 셀프 평가
  02-gentle-exercises.md   # 초기 운동
  03-recovery-timeline.md  # 회복 타임라인 (제왕절개·복귀 기준 포함)
  04-faq-glossary.md       # FAQ·용어 정리
reports/
  01-claude-deep-research.md # 근거 심층 보고서 원본
```
