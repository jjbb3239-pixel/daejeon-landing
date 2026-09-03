import type { Copy } from "../i18n";

type StopCopy = {
  alt: string;
  kicker: string;
  name: string;
  copy: string;
  dual?: string[];
  action: string;
};

type CourseCopy = {
  eyebrow: string;
  titleLine1: string;
  titleStrong: string;
  leadLine1: string;
  leadLine2: string;
  mapEyebrow: string;
  mapTitle: string;
  mapLead: string;
  mapRoute: string;
  mapNote: string;
  stops: StopCopy[];
};

export const COURSE: Copy<CourseCopy> = {
  ko: {
    eyebrow: "😴 오늘은 코스 짜기도 귀찮은 기분이에요",
    titleLine1: "생각하지 마세요.",
    titleStrong: "오늘 코스는 정해드릴게요.",
    leadLine1: "오래된 골목부터 카페와 책방, 대전의 풍경이 내려다보이는 곳까지.",
    leadLine2: "그냥 이 순서대로 따라가면 되는 대전의 하루.",
    mapEyebrow: "4 STOP MAP",
    mapTitle: "오늘 코스, 한 지도에",
    mapLead: "핀을 누르면 각 장소를 Google 지도에서 바로 확인할 수 있어요.",
    mapRoute: "Google 지도에서 전체 코스 보기",
    mapNote: "표시된 선은 이동 순서를 보여주는 간략 동선입니다. 정확한 길과 교통 상황은 Google 지도에서 확인해 주세요.",
    stops: [
      {
        alt: "오래된 관사와 전봇대가 늘어선 소제동 골목",
        kicker: "START · OLD TOWN",
        name: "소제동 철도관사촌",
        copy: "오래된 대전에서 하루 시작. 처음부터 바쁘게 움직일 필요는 없어요. 소제동의 골목을 천천히 걸으며 오늘 여행을 시작해보세요.",
        action: "📸 마음에 드는 골목 하나 찍어두기",
      },
      {
        alt: "저녁 불빛이 켜진 구모카페와 책방 외관",
        kicker: "COFFEE & BOOK",
        name: "구모카페 · 구름책방",
        copy: "걷다가 마음에 들면 잠깐 앉아 있기. 다음 목적지를 서두르지 말고 커피와 책 사이에서 잠깐 쉬어가세요.",
        dual: ["☕ 구모카페", "📚 구름책방"],
        action: "☕ 커피 한 잔 마시며 아무것도 안 하기",
      },
      {
        alt: "풍차 너머로 노을 지는 대전 시내 전망",
        kicker: "SUNSET",
        name: "대동 하늘공원",
        copy: "슬슬 하늘이 예뻐질 시간. 잠깐 멈춰 대전의 풍경을 바라보세요.",
        action: "🌇 오늘 가장 마음에 드는 하늘 남기기",
      },
      {
        alt: "저녁 하늘 아래 불이 켜진 식장산 정상 팔각정과 멀리 보이는 대전 시내",
        kicker: "FINISH · NIGHT VIEW",
        name: "식장산 해돋이 전망대",
        copy: "오늘 하루의 마지막 장면. 대전의 풍경을 바라보며 오늘 여행을 천천히 마무리해보세요.",
        action: "🌃 사진 한 장 찍고 잠깐 휴대폰 내려놓기",
      },
    ],
  },
  en: {
    eyebrow: "😴 Today, even planning feels like too much",
    titleLine1: "Don’t think about it.",
    titleStrong: "We’ll set today’s route for you.",
    leadLine1: "Old alleys, a cafe and a bookshop, and a place that looks out over the whole city.",
    leadLine2: "One Daejeon day you can follow in order and nothing else.",
    mapEyebrow: "4 STOP MAP",
    mapTitle: "Today’s route on one map",
    mapLead: "Tap any pin to open that place directly in Google Maps.",
    mapRoute: "Open the full route in Google Maps",
    mapNote: "The line shows the order of the stops, not an exact road route. Check Google Maps for live directions and traffic.",
    stops: [
      {
        alt: "An alley in Sojedong lined with old railway houses and power poles",
        kicker: "START · OLD TOWN",
        name: "Sojedong Railway Village",
        copy: "Start the day in the older Daejeon. There is no need to rush at the beginning — walk the Sojedong alleys slowly and let the day open up.",
        action: "📸 Photograph one alley you like",
      },
      {
        alt: "Gumo Cafe and the bookshop next door with evening lights on",
        kicker: "COFFEE & BOOK",
        name: "Gumo Cafe · Gureum Bookshop",
        copy: "If somewhere looks good while you are walking, sit down for a while. Don’t hurry to the next stop — rest between a coffee and a book.",
        dual: ["☕ Gumo Cafe", "📚 Gureum Bookshop"],
        action: "☕ Have a coffee and do nothing",
      },
      {
        alt: "The Daejeon skyline at sunset seen past a windmill",
        kicker: "SUNSET",
        name: "Daedong Sky Park",
        copy: "About the hour the sky starts to turn. Stop for a moment and look out over the city.",
        action: "🌇 Keep the best sky of the day",
      },
      {
        alt: "The lit pavilion at the summit of Sikjangsan under an evening sky, with Daejeon in the distance",
        kicker: "FINISH · NIGHT VIEW",
        name: "Sikjangsan Sunrise Observatory",
        copy: "The last scene of the day. Look out over Daejeon and let the trip close slowly.",
        action: "🌃 Take one photo, then put the phone down",
      },
    ],
  },
};
