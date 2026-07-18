import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "산후 골반 회복 가이드 · Phục hồi vùng chậu sau sinh",
    short_name: "골반 회복",
    description:
      "출산 후 골반·코어 회복 가이드 — 셀프 평가부터 단계별 운동까지",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7f4",
    theme_color: "#e8a6b8",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
