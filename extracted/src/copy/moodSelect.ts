import type { Copy } from "../i18n";
import type { MoodId } from "../quiz";

type CardCopy = {
  alt: string;
  category: string;
  /** 두 줄 구성. 카드 높이를 맞추려고 일부러 끊는다. */
  title: [string, string];
  copy: string;
  cta?: string;
};

type MoodSelectCopy = {
  kicker: string;
  headLead: string;
  headStrong: string;
  headTail: string;
  headLine2: string;
  cards: Record<MoodId, CardCopy>;
};

export const MOOD_SELECT: Copy<MoodSelectCopy> = {
  ko: {
    kicker: "TODAY’S MOOD",
    headLead: "오늘은 어떤 ",
    headStrong: "기분",
    headTail: "으로",
    headLine2: "대전을 돌아볼까요?",
    cards: {
      photo: {
        alt: "셀카봉을 들고 사진을 찍는 꿈누리",
        category: "PHOTO SPOT",
        title: ["대전에서 인생샷", "하나 건질래?"],
        copy: "인생샷 건지기 쉬운 대전 숨겨진 스팟 모음",
        cta: "인생샷 하나 건지고 싶은 날",
      },
      food: {
        alt: "빵 봉지를 안고 뛰어가는 온솔",
        category: "EAT",
        title: ["대전 맛집,", "블루리본 모음Zip"],
        copy: "오늘 먹방은 성공하고 싶으니까, 블루리본 선정 맛집 완성",
        cta: "맛집만큼은 제대로 뿌수고 싶은 날",
      },
      cafe: {
        alt: "화분을 들고 서 있는 안경 쓴 꿈씨패밀리",
        category: "CAFE",
        title: ["대전만의 카페를", "갈래"],
        copy: "오늘 기분에 맞는 대전다운 카페 리스트",
        cta: "대전에서만 만날 수 있는 카페가 궁금한 날",
      },
      course: {
        alt: "엎드려 누워 쉬고 있는 꿈동이",
        category: "EASY COURSE",
        title: ["오늘은", "다 귀찮아"],
        copy: "맛집, 카페, 산책까지. 최소 고민 코스로 알아서 짜드려요.",
      },
    },
  },
  en: {
    kicker: "TODAY’S MOOD",
    headLead: "What ",
    headStrong: "mood",
    headTail: " are you in",
    headLine2: "for Daejeon today?",
    cards: {
      photo: {
        alt: "Kkumnuri taking a photo with a selfie stick",
        category: "PHOTO SPOT",
        title: ["Time to fill", "up your feed?"],
        copy: "Daejeon spots that look good from every angle.",
      },
      food: {
        alt: "Onsol running with a bag of bread in her arms",
        category: "EAT",
        title: ["Eat your way", "through the city"],
        copy: "One place at a time, and the food tour plans itself.",
      },
      cafe: {
        alt: "A Kkumssi Family character in glasses holding a plant pot",
        category: "CAFE",
        title: ["A cafe for", "the mood you’re in"],
        copy: "Shall we find a Daejeon cafe that fits today?",
      },
      course: {
        alt: "Kkumdongi lying face down, taking a rest",
        category: "EASY COURSE",
        title: ["Today,", "everything’s a hassle"],
        copy: "Food, cafe, a walk. We plan it so you don’t have to.",
      },
    },
  },
};
