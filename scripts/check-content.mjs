// 콘텐츠 무결성 검사 — CI와 로컬(npm run check:content)에서 실행
// 1) ko/vi 챕터 파일 대응  2) 챕터 제목·내비 푸터 존재
// 3) 내부 링크(같은 폴더 챕터, ../ 저장소 파일) 유효성
// 4) 인터랙티브 위젯 코드펜스 수 ko/vi 일치
import fs from "node:fs";
import path from "node:path";

const LOCALES = ["ko", "vi"];
const root = process.cwd();
const errors = [];

const files = {};
for (const l of LOCALES) {
  files[l] = fs
    .readdirSync(path.join(root, "content", l))
    .filter((f) => f.endsWith(".md"))
    .sort();
}

if (files.ko.join(",") !== files.vi.join(",")) {
  errors.push(
    `챕터 파일 목록 불일치:\n    ko: ${files.ko.join(", ")}\n    vi: ${files.vi.join(", ")}`,
  );
}

const widgetFence = /^```(breathing|exercise)\s*$/gm;

for (const l of LOCALES) {
  for (const f of files[l]) {
    const p = path.join(root, "content", l, f);
    const raw = fs.readFileSync(p, "utf8");
    const rel = `${l}/${f}`;

    if (!/^#\s+\S/m.test(raw)) errors.push(`${rel}: 챕터 제목(# ...)이 없습니다`);
    if (!/\r?\n---\s*\r?\n\s*🧭[^\n]*\s*$/.test(raw))
      errors.push(`${rel}: 파일 끝 내비게이션 푸터(--- + 🧭)가 없습니다`);

    // 같은 폴더 챕터 링크: [text](01-xxx.md#anchor)
    for (const m of raw.matchAll(/\]\((\d[\w-]*\.md)(?:#[^)]*)?\)/g)) {
      if (!fs.existsSync(path.join(root, "content", l, m[1])))
        errors.push(`${rel}: 깨진 챕터 링크 → ${m[1]}`);
    }
    // 상위 폴더 링크: [text](../../reports/xxx.md) — 저장소 루트 기준 존재 확인
    for (const m of raw.matchAll(/\]\(((?:\.\.\/)+)([^)#]+)\)/g)) {
      const resolved = path.resolve(path.join(root, "content", l), m[1] + m[2]);
      if (!resolved.startsWith(root) || !fs.existsSync(resolved))
        errors.push(`${rel}: 깨진 상위 폴더 링크 → ${m[1]}${m[2]}`);
    }
  }
}

const headingRe = /^#{1,3} /gm;
const imageRe = /!\[[^\]]*\]\(([^)]+)\)/g;
const exerciseIdRe = /^```exercise\s*$[\s\S]*?^id:\s*([\w-]+)\s*$[\s\S]*?^```/gm;

for (const f of files.ko) {
  if (!files.vi.includes(f)) continue;
  const read = (l) => fs.readFileSync(path.join(root, "content", l, f), "utf8");
  const ko = read("ko");
  const vi = read("vi");

  // 위젯 코드펜스 수
  const wKo = (ko.match(widgetFence) ?? []).length;
  const wVi = (vi.match(widgetFence) ?? []).length;
  if (wKo !== wVi)
    errors.push(`${f}: 위젯 코드펜스 수 불일치 (ko ${wKo}개 vs vi ${wVi}개)`);

  // 헤딩 수 — 구조가 어긋나면 이미지·앵커 삽입 위치가 어긋난다
  const hKo = (ko.match(headingRe) ?? []).length;
  const hVi = (vi.match(headingRe) ?? []).length;
  if (hKo !== hVi)
    errors.push(`${f}: 헤딩 수 불일치 (ko ${hKo}개 vs vi ${hVi}개)`);

  // 운동 id 집합
  const ids = (t) => [...t.matchAll(exerciseIdRe)].map((m) => m[1]).sort().join(",");
  if (ids(ko) !== ids(vi))
    errors.push(`${f}: exercise id 불일치 (ko [${ids(ko)}] vs vi [${ids(vi)}])`);

  // 이미지: 경로 실존 + ko/vi 같은 이미지 목록
  const imgs = (t) => [...t.matchAll(imageRe)].map((m) => m[1]);
  for (const l of LOCALES) {
    for (const src of imgs(l === "ko" ? ko : vi)) {
      if (!src.startsWith("/")) continue;
      if (!fs.existsSync(path.join(root, "public", src)))
        errors.push(`${l}/${f}: 없는 이미지 → ${src}`);
    }
  }
  if (imgs(ko).join(",") !== imgs(vi).join(","))
    errors.push(`${f}: 이미지 목록/순서 불일치 (ko ${imgs(ko).length}장 vs vi ${imgs(vi).length}장)`);
}

if (errors.length) {
  console.error(`콘텐츠 검사 실패 (${errors.length}건):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `콘텐츠 검사 통과: ${LOCALES.map((l) => `${l} ${files[l].length}장`).join(" · ")}`,
);
