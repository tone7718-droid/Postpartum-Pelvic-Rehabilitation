import type { Locale } from "./locales";

type Dict = {
  siteTitle: string;
  tagline: string;
  toc: string;
  startReading: string;
  cover: string;
  safety: string;
  tocHeading: string;
  prev: string;
  next: string;
  backToToc: string;
  finished: string;
  footerDisclaimer: string;
  footerSignoff: string;
  langName: string; // name of THIS locale
  switchTo: string; // label for switching to the other locale
  translatedNote?: string; // shown on non-default content
};

export const dict: Record<Locale, Dict> = {
  ko: {
    siteTitle: "산후 골반 회복 가이드",
    tagline:
      "출산 후 골반·코어 회복을 쉽고 안전하게. 셀프 평가부터 무리 없는 단계별 운동까지, 근거를 바탕으로 정리했습니다.",
    toc: "목차",
    startReading: "처음부터 읽기 →",
    cover: "산후 골반 회복 가이드",
    safety:
      "⚠️ 교육용 정보이며 의학적 진단·치료를 대신하지 않습니다. 산후 운동은 6주 진료에서 의료진 확인 후 시작하고, 통증·출혈·압박감이 늘면 멈추고 전문가와 상담하세요.",
    tocHeading: "목차",
    prev: "◀ 이전",
    next: "다음 ▶",
    backToToc: "목차로 돌아가기",
    finished: "🌸 끝까지 읽었어요",
    footerDisclaimer:
      "교육용 정보이며 의학적 진단·치료를 대신하지 않습니다. 통증·출혈·압박감이 늘면 멈추고 전문가와 상담하세요.",
    footerSignoff: "🌸 아내의 산후 회복을 응원하며",
    langName: "한국어",
    switchTo: "Tiếng Việt",
  },
  vi: {
    siteTitle: "Hướng dẫn phục hồi vùng chậu sau sinh",
    tagline:
      "Phục hồi vùng chậu và cơ lõi sau sinh một cách nhẹ nhàng và an toàn. Từ tự đánh giá đến các bài tập theo từng giai đoạn, được tổng hợp dựa trên bằng chứng khoa học.",
    toc: "Mục lục",
    startReading: "Bắt đầu đọc →",
    cover: "Hướng dẫn phục hồi vùng chậu sau sinh",
    safety:
      "⚠️ Đây là thông tin giáo dục, không thay thế chẩn đoán hoặc điều trị y khoa. Hãy bắt đầu tập sau khi được bác sĩ xác nhận ở lần khám tuần thứ 6; nếu đau, ra máu hoặc cảm giác đè nặng tăng lên, hãy dừng lại và hỏi ý kiến chuyên gia.",
    tocHeading: "Mục lục",
    prev: "◀ Trước",
    next: "Tiếp ▶",
    backToToc: "Quay lại mục lục",
    finished: "🌸 Bạn đã đọc đến hết",
    footerDisclaimer:
      "Thông tin giáo dục, không thay thế chẩn đoán hoặc điều trị y khoa. Nếu đau, ra máu hoặc cảm giác đè nặng tăng lên, hãy dừng lại và hỏi ý kiến chuyên gia.",
    footerSignoff: "🌸 Chúc vợ yêu sớm phục hồi sau sinh",
    langName: "Tiếng Việt",
    switchTo: "한국어",
    translatedNote:
      "Đây là bản dịch từ nội dung tiếng Hàn. Vì là thông tin y khoa, nên nhờ người bản ngữ hoặc nhân viên y tế kiểm tra lại khi có thể.",
  },
};

export function t(locale: Locale): Dict {
  return dict[locale] ?? dict.ko;
}
