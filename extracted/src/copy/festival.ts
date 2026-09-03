import type { Copy } from "../i18n";

type RouteStopCopy = { title: string; when: string; linkText: string };

type FestivalCardCopy = {
  alts: string[];
  badge: string;
  label: string;
  title: [string] | [string, string];
  meta: { date: string; place: string };
  description: [string, string];
  tags?: string[];
  linkText?: string;
  route?: { from: RouteStopCopy; middle: string; to: RouteStopCopy };
};

type FestivalCopy = {
  kicker: string;
  headLead: string;
  headHighlight1: string;
  headMid: string;
  headLine2Lead: string;
  headHighlight2: string;
  headTail: string;
  leadLine1: string;
  leadLine2: string;
  bottomCta: string;
  cards: FestivalCardCopy[];
};

export const FESTIVAL: Copy<FestivalCopy> = {
  ko: {
    kicker: "WHAT’S ON IN DAEJEON",
    headLead: "대전이 아직도 ",
    headHighlight1: "NO잼",
    headMid: " 같다면,",
    headLine2Lead: "지금 열리는 ",
    headHighlight2: "행사",
    headTail: "를 아직 못 본 거예요.",
    leadLine1: "계획에 없던 축제나 행사를 만나는 것도 여행의 재미니까.",
    leadLine2: "지금 대전에서 열리는 행사를 가볍게 둘러보세요.",
    bottomCta: "또 다른 대전 행사 보러가기",
    cards: [
      {
        alts: ["유성온날 YUON 포스터"],
        badge: "8–12월",
        label: "YUSEONG EVENT",
        title: ["유성온날 YUON"],
        meta: { date: "2026.08.14 —", place: "유성구" },
        description: [
          "8월 14일부터 시작되는 유성온날(YUON).",
          "자세한 행사 내용은 정리 페이지에서 확인해보세요.",
        ],
        linkText: "자세히 보기 ↗",
      },
      {
        alts: ["2026 대전 동구동락 축제 포스터"],
        badge: "10월",
        label: "CITY FESTIVAL",
        title: ["동구동락 축제"],
        meta: { date: "10.09 — 10.11", place: "소제동 · 대동천 일원" },
        description: ["선선한 가을, 공연과 체험을 즐기며", "대전 원도심을 천천히 걸어보세요."],
        tags: ["공연", "체험", "원도심", "상권 연계"],
        linkText: "축제 자세히 보기 ↗",
      },
      {
        alts: ["2026 대전콘텐츠페어 포스터", "2026 대전빵축제 포스터"],
        badge: "10월 추천 PICK",
        label: "OCTOBER PICK",
        title: ["귀여움 챙기고,", "빵으로 마무리"],
        meta: { date: "2026.10.16 — 10.18", place: "DCC → 엑스포과학공원" },
        description: [
          "캐릭터·게임·굿즈로 놀고, 물빛광장을 산책한 뒤",
          "대전 빵축제로 마무리하는 10월 코스.",
        ],
        route: {
          from: {
            title: "🎰 대전콘텐츠페어",
            when: "10.16 — 10.18 · DCC 제2전시장",
            linkText: "공식 사이트 ↗",
          },
          middle: "↓ 물빛광장 산책 20~30분",
          to: {
            title: "🍞 2026 대전빵축제",
            when: "10.17 — 10.18 · 엑스포과학공원 한빛탑",
            linkText: "공식 인스타그램 ↗",
          },
        },
      },
    ],
  },
  en: {
    kicker: "WHAT’S ON IN DAEJEON",
    headLead: "If Daejeon still looks ",
    headHighlight1: "boring",
    headMid: " to you,",
    headLine2Lead: "you haven’t seen ",
    headHighlight2: "what’s on",
    headTail: " right now.",
    leadLine1: "Running into a festival you never planned for is part of the trip.",
    leadLine2: "Have a quick look at what is happening in Daejeon right now.",
    bottomCta: "See more Daejeon events",
    cards: [
      {
        alts: ["Poster for Yuseong Yuon (YUON)"],
        badge: "Aug–Dec",
        label: "YUSEONG EVENT",
        title: ["Yuseong Yuon (YUON)"],
        meta: { date: "14 Aug 2026 —", place: "Yuseong-gu" },
        description: [
          "Yuseong Yuon (YUON) runs from 14 August.",
          "The full programme is on the official page.",
        ],
        linkText: "See details ↗",
      },
      {
        alts: ["Poster for the 2026 Daejeon Donggu Dongrak Festival"],
        badge: "October",
        label: "CITY FESTIVAL",
        title: ["Donggu Dongrak Festival"],
        meta: { date: "9 — 11 Oct", place: "Sojedong · along the Daedongcheon" },
        description: [
          "Cool autumn days, performances and hands-on programmes,",
          "and the old downtown to walk at your own pace.",
        ],
        tags: ["Performances", "Hands-on", "Old downtown", "Local shops"],
        linkText: "See the festival ↗",
      },
      {
        alts: ["Poster for the 2026 Daejeon Content Fair", "Poster for the 2026 Daejeon Bread Festival"],
        badge: "OCTOBER PICK",
        label: "OCTOBER PICK",
        title: ["Characters first,", "bread to finish"],
        meta: { date: "16 — 18 Oct 2026", place: "DCC → Expo Science Park" },
        description: [
          "Characters, games and goods, then a walk across Mulbit Plaza,",
          "and the Daejeon Bread Festival to close the day.",
        ],
        route: {
          from: {
            title: "🎰 Daejeon Content Fair",
            when: "16 — 18 Oct · DCC Exhibition Hall 2",
            linkText: "Official site ↗",
          },
          middle: "↓ 20–30 min walk across Mulbit Plaza",
          to: {
            title: "🍞 2026 Daejeon Bread Festival",
            when: "17 — 18 Oct · Hanbit Tower, Expo Science Park",
            linkText: "Official Instagram ↗",
          },
        },
      },
    ],
  },
};
