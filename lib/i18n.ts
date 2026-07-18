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
  skipToContent: string;
  readingProgress: string;
  startGuide: {
    title: string;
    subtitle: string;
    birthQ: string;
    vaginal: string;
    cesarean: string;
    weeksQ: string;
    w0_6: string;
    w6_12: string;
    w12p: string;
    recTitle: string;
    recSelfCheck: string;
    recBreathing: string;
    recTimeline: string;
    recCsection: string;
    recStability: string;
    recAdvanced: string;
    disclaimer: string;
  };
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
      "⚠️ 교육용 정보이며 의학적 진단·치료를 대신하지 않습니다. 본격적인 운동은 산후 진료에서 의료진과 상의한 뒤 시작하고, 통증·출혈·압박감이 늘면 멈추고 전문가와 상담하세요.",
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
    skipToContent: "본문으로 건너뛰기",
    readingProgress: "읽기 진행률",
    startGuide: {
      title: "오늘은 어디서 시작할까요?",
      subtitle:
        "두 가지만 고르면 지금 읽기 좋은 장을 추천해 드려요.",
      birthQ: "출산 방식",
      vaginal: "자연분만",
      cesarean: "제왕절개",
      weeksQ: "출산 후 지난 시간",
      w0_6: "6주 미만",
      w6_12: "6주~3개월",
      w12p: "3개월 이상",
      recTitle: "지금 읽기 좋은 순서",
      recSelfCheck: "1장 · 내 상태 셀프 점검부터 (위험 신호 확인 포함)",
      recBreathing: "2장 · 호흡과 골반저 인지부터 부드럽게",
      recTimeline: "3장 · 내 시기에 해도 되는 것/피할 것",
      recCsection: "3장 · 제왕절개라면 꼭 읽어야 할 부분(3-4)",
      recStability: "2장 · 3단계 안정성 운동으로 올라가기",
      recAdvanced: "5장 · 본격 강화·복귀 운동 (3-5 복귀 기준과 함께)",
      disclaimer:
        "진단이 아닌 읽기 안내입니다. 통증·출혈·압박감이 늘면 멈추고 전문가와 상담하세요.",
    },
  },
  vi: {
    siteTitle: "Hướng dẫn phục hồi vùng chậu sau sinh",
    tagline:
      "Phục hồi vùng chậu và cơ lõi sau sinh một cách nhẹ nhàng và an toàn. Từ tự đánh giá đến các bài tập theo từng giai đoạn, được tổng hợp dựa trên bằng chứng khoa học.",
    toc: "Mục lục",
    startReading: "Bắt đầu đọc →",
    cover: "Hướng dẫn phục hồi vùng chậu sau sinh",
    safety:
      "⚠️ Đây là thông tin giáo dục, không thay thế chẩn đoán hoặc điều trị y khoa. Bài tập chính thức nên bắt đầu sau khi trao đổi với bác sĩ ở lần khám sau sinh; nếu đau, ra máu hoặc cảm giác đè nặng tăng lên, hãy dừng lại và hỏi ý kiến chuyên gia.",
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
    skipToContent: "Bỏ qua đến nội dung",
    readingProgress: "Tiến độ đọc",
    startGuide: {
      title: "Hôm nay bắt đầu từ đâu?",
      subtitle:
        "Chỉ cần chọn hai mục, chúng tôi sẽ gợi ý chương nên đọc bây giờ.",
      birthQ: "Cách sinh",
      vaginal: "Sinh thường",
      cesarean: "Sinh mổ",
      weeksQ: "Thời gian sau sinh",
      w0_6: "Dưới 6 tuần",
      w6_12: "6 tuần ~ 3 tháng",
      w12p: "Trên 3 tháng",
      recTitle: "Thứ tự nên đọc bây giờ",
      recSelfCheck:
        "Chương 1 · Tự kiểm tra tình trạng của bạn trước (kèm dấu hiệu cần đi khám)",
      recBreathing:
        "Chương 2 · Bắt đầu nhẹ nhàng với hơi thở và nhận biết sàn chậu",
      recTimeline:
        "Chương 3 · Giai đoạn của bạn — nên làm gì, tránh gì",
      recCsection:
        "Chương 3 · Nếu sinh mổ, phần cần đọc kỹ (mục 3-4)",
      recStability:
        "Chương 2 · Tiến lên bài tập ổn định (giai đoạn 3)",
      recAdvanced:
        "Chương 5 · Bài tập tăng cường và trở lại vận động (cùng tiêu chí 3-5)",
      disclaimer:
        "Đây là gợi ý đọc, không phải chẩn đoán. Nếu đau, ra máu hoặc cảm giác đè nặng tăng lên, hãy dừng lại và hỏi ý kiến chuyên gia.",
    },
    translatedNote:
      "Đây là bản dịch từ nội dung tiếng Hàn. Vì là thông tin y khoa, nên nhờ người bản ngữ hoặc nhân viên y tế kiểm tra lại khi có thể.",
  },
};

export function t(locale: Locale): Dict {
  return dict[locale] ?? dict.ko;
}
