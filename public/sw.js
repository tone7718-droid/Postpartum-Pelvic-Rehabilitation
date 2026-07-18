/* 서비스 워커 — 오프라인 지원.
   챕터를 추가/이름 변경하면 CHAPTERS와 CACHE 버전을 함께 갱신한다. */
const CACHE = "pp-rehab-v1";

const CHAPTERS = [
  "00-overview-and-myths",
  "01-self-assessment",
  "02-gentle-exercises",
  "03-recovery-timeline",
  "04-faq-glossary",
  "05-advanced-progression",
  "06-practical-tools",
];

const PRECACHE = [
  "/ko",
  "/vi",
  ...CHAPTERS.flatMap((slug) => [`/ko/chapter/${slug}`, `/vi/chapter/${slug}`]),
  "/fonts/pretendard/pretendardvariable-dynamic-subset.css",
  "/fonts/be-vietnam-pro/be-vietnam-pro.css",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      // 개별 실패가 전체 설치를 막지 않도록 하나씩 담는다
      .then((c) =>
        Promise.allSettled(PRECACHE.map((url) => c.add(url))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 페이지 이동: 네트워크 우선, 오프라인이면 캐시 → 홈 순으로
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req, { ignoreSearch: true });
          return (
            cached ||
            (await caches.match("/vi")) ||
            (await caches.match("/ko")) ||
            Response.error()
          );
        }),
    );
    return;
  }

  // 빌드 해시가 붙는 정적 자원·이미지·폰트: 캐시 우선
  e.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        }),
    ),
  );
});
