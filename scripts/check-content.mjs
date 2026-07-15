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

for (const f of files.ko) {
  if (!files.vi.includes(f)) continue;
  const count = (l) =>
    (fs.readFileSync(path.join(root, "content", l, f), "utf8").match(widgetFence) ?? [])
      .length;
  const ko = count("ko");
  const vi = count("vi");
  if (ko !== vi)
    errors.push(`${f}: 위젯 코드펜스 수 불일치 (ko ${ko}개 vs vi ${vi}개)`);
}

if (errors.length) {
  console.error(`콘텐츠 검사 실패 (${errors.length}건):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `콘텐츠 검사 통과: ${LOCALES.map((l) => `${l} ${files[l].length}장`).join(" · ")}`,
);
