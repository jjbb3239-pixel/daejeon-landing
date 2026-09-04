import type { Copy } from "../i18n";

type HeroCopy = {
  /** 두 줄 구성은 의도한 리듬이다. 절 경계에서만 끊는다. */
  titleLine1: string;
  titleLead: string;
  titleEm: string;
  leadLine1: string;
  leadLine2: string;
  cta: string;
  mobileCtaLine1: string;
  mobileCtaLine2: string;
  boardingTitle: string;
  scrollLead: string;
};

export const HERO: Copy<HeroCopy> = {
  ko: {
    titleLine1: "기분이 이끄는 대로,",
    titleLead: "일단 ",
    titleEm: "대전행.",
    leadLine1: "대전에서 뭐 하지? 아직 몰라도 괜찮아요.",
    leadLine2: "오늘 내 기분부터 알아보면 되니까.",
    cta: "30초 만에 내 대전 여행 기분 찾기 →",
    mobileCtaLine1: "30초 만에",
    mobileCtaLine2: "내 여행 기분 찾기",
    boardingTitle: "대전행",
    scrollLead: "아직 어디 갈지 모르겠다면",
  },
  en: {
    titleLine1: "Follow your mood,",
    titleLead: "just go to ",
    titleEm: "Daejeon.",
    leadLine1: "No idea what to do in Daejeon? That is fine for now.",
    leadLine2: "Start with the mood you are in today.",
    cta: "Find your Daejeon mood in 30 seconds →",
    mobileCtaLine1: "In 30 seconds",
    mobileCtaLine2: "Find my travel mood",
    boardingTitle: "TO DAEJEON",
    scrollLead: "Still not sure where to go?",
  },
};
