import type { Copy } from "../i18n";

type CafeCardCopy = {
  alt: string;
  label: string;
  name: string;
  headline: string;
  copy: string;
  mood: string;
  point: string;
  mission: string;
};

type CafeCopy = {
  eyebrow: string;
  titleLine1: string;
  titleStrong: string;
  leadLine1: string;
  leadLine2: string;
  testTitle: string;
  shortcuts: string[];
  moodLabel: string;
  cafes: CafeCardCopy[];
};

export const CAFE: Copy<CafeCopy> = {
  ko: {
    eyebrow: "☕ 느좋 카페 가고 싶은 기분이에요",
    titleLine1: "오늘은 어떤",
    titleStrong: "카페 무드?",
    leadLine1: "같은 커피 한 잔이어도 오늘 원하는 시간은 조금씩 다르니까.",
    leadLine2: "지금 하고 싶은 걸 골라 대전 카페로 가볼까요?",
    testTitle: "TODAY’S CAFE MOOD",
    shortcuts: [
      "👽 대전에서만 할 수 있는 것 → 소신",
      "☕ 진짜 맛있는 커피 한 잔 → 톨드어스토리",
      "📖 아무도 방해하지 않는 시간 → 쌍리",
    ],
    moodLabel: "추천 기분",
    cafes: [
      {
        alt: "궁동 소신의 꿈돌이 얼굴 케이크",
        label: "ONLY DAEJEON",
        name: "궁동 소신",
        headline: "꿈돌이 보러 갈래? 👽💛",
        copy: "대전의 상징이라고 할 수 있는 귀여운 캐릭터 꿈돌이. 너무 유명하고 붐비는 곳보다 조금 여유롭게 대전다운 귀여움을 만나고 싶은 혼자 여행자에게 궁동의 ‘소신’을 추천합니다.",
        mood: "대전에서만 할 수 있는 것을 찾아보고 싶은 날",
        point: "꿈돌이 · 대전 로컬 감성",
        mission: "📸 오늘의 미션 : 꿈돌이와 인증샷 남기기",
      },
      {
        alt: "갈마동 톨드어스토리 카페 외관",
        label: "COFFEE LOVER",
        name: "갈마동 톨드어스토리",
        headline: "커피 맛에 푹 빠지고 싶을 때 ☕",
        copy: "제공한 자료에 따르면 외관 창문에 블루리본 스티커가 10개 붙어 있는 곳. 2005년부터 시작해 2021년 갈마동으로 이전한 뒤에도 발길이 이어지고 있는 공간입니다.",
        mood: "오늘만큼은 커피 맛 자체에 집중하고 싶은 날",
        point: "커피 · 오랜 시간 이어온 공간",
        mission: "☕ 오늘의 미션 : 평소 안 마셔본 커피 한 잔 골라보기",
      },
      {
        alt: "대흥동 쌍리 카페 2층 갤러리 공간",
        label: "READ & WORK",
        name: "대흥동 쌍리",
        headline: "책 한 권 들고 가고 싶은 카페 📖",
        copy: "‘쌍리’라는 이름은 두 마리의 잉어를 뜻하고, 고전 문학에서는 멀리서 온 반가운 편지를 의미한다고 합니다. 2008년부터 한 자리를 지켜온 카페로, 1층은 레트로한 분위기, 2층은 밝고 모던한 갤러리 공간으로 소개되어 있습니다.",
        mood: "혼자라면 2층 갤러리형 공간에 자리를 잡고 책을 읽거나 작업하며 천천히 머물러보세요.",
        point: "핸드드립 · 갤러리 · 작업 · 독서",
        mission: "📖 오늘의 미션 : 휴대폰 내려놓고 20분 집중하기",
      },
    ],
  },
  en: {
    eyebrow: "☕ You’re in the mood for a really good cafe",
    titleLine1: "What kind of cafe",
    titleStrong: "are you after today?",
    leadLine1: "It may be the same cup of coffee, but the hour you want out of it changes.",
    leadLine2: "Pick what you feel like doing and let’s find the cafe for it.",
    testTitle: "TODAY’S CAFE MOOD",
    shortcuts: [
      "👽 Something only Daejeon has → Sosin",
      "☕ One genuinely good coffee → Told a Story",
      "📖 Time where nobody bothers you → Ssangri",
    ],
    moodLabel: "Good for",
    cafes: [
      {
        alt: "A Kkumdori face cake at Sosin in Gungdong",
        label: "ONLY DAEJEON",
        name: "Sosin, Gungdong",
        headline: "Want to go see Kkumdori? 👽💛",
        copy: "Kkumdori is about as close as Daejeon gets to a mascot. If you would rather meet that particular local cuteness somewhere unhurried than somewhere famous and packed, Sosin in Gungdong is the one to head for.",
        mood: "A day for finding something you can only do in Daejeon",
        point: "Kkumdori · local Daejeon character",
        mission: "📸 Today’s mission: get a photo with Kkumdori",
      },
      {
        alt: "The exterior of Told a Story cafe in Galma-dong",
        label: "COFFEE LOVER",
        name: "Told a Story, Galma-dong",
        headline: "For when you want to fall into the coffee ☕",
        copy: "Ten Blue Ribbon stickers are lined up on the front window. Open since 2005, it moved to Galma-dong in 2021 and people have kept coming.",
        mood: "A day to focus on nothing but how the coffee tastes",
        point: "Coffee · a place that has lasted",
        mission: "☕ Today’s mission: order a coffee you have never tried",
      },
      {
        alt: "The second-floor gallery space of Ssangri cafe in Daeheung-dong",
        label: "READ & WORK",
        name: "Ssangri, Daeheung-dong",
        headline: "The cafe to bring a book to 📖",
        copy: "The name Ssangri means a pair of carp, and in classical literature it stands for a welcome letter from far away. The cafe has held the same spot since 2008 — the ground floor retro, the upper floor a bright, modern gallery space.",
        mood: "On your own, take a seat in the upstairs gallery space and read or work for a while",
        point: "Hand drip · gallery · work · reading",
        mission: "📖 Today’s mission: put the phone down and focus for 20 minutes",
      },
    ],
  },
};
