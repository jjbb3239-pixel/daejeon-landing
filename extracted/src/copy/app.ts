import type { Copy } from "../i18n";

type AppCopy = {
  finalHead1: string;
  finalHead2: string;
  finalLead: string;
  /** 절 경계에서 한 줄씩 끊는 리듬이 있는 문단. 줄 단위로 보관한다. */
  finalLines: string[];
  finalCta: string;
  floatingCta: string;
};

export const APP: Copy<AppCopy> = {
  ko: {
    finalHead1: "대전에는",
    finalHead2: "정해진 관광코스가 없습니다.",
    finalLead: "꼭 봐야 하는 것도, 꼭 해야 하는 것도 없으니까.",
    finalLines: [
      "혼자 온 오늘만큼은",
      "먹고 싶으면 먹고,",
      "걷고 싶으면 걷고,",
      "마음에 들면 조금 더 머물러도 됩니다.",
    ],
    finalCta: "내 기분 다시 알아보기 →",
    floatingCta: "✦ 내 기분 알아보기",
  },
  en: {
    finalHead1: "Daejeon has no",
    finalHead2: "official tourist route.",
    finalLead: "Nothing you have to see, nothing you have to do.",
    finalLines: [
      "Just for today, on your own,",
      "eat when you feel like eating,",
      "walk when you feel like walking,",
      "and stay a little longer if you like the place.",
    ],
    finalCta: "Find my mood again →",
    floatingCta: "✦ Find my mood",
  },
};
