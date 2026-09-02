import type { Copy } from "../i18n";

type ReviewCopy = {
  alt: string;
  place: string;
  quote: string;
  source: string;
};

type GroupCopy = {
  title: [string, string];
  reviews: [ReviewCopy, ReviewCopy];
};

type ProofCopy = {
  kicker: string;
  headLine1: string;
  headStrong: string;
  lead: string;
  /** 영문에서만 쓴다. 인용문이 한국어 원문을 옮긴 것이라는 안내. */
  translatedNotice?: string;
  note: string;
  groups: GroupCopy[];
};

export const PROOF: Copy<ProofCopy> = {
  ko: {
    kicker: "REAL REVIEWS",
    headLine1: "대전, 우리만 좋다고",
    headStrong: "하는 거 아닙니다.",
    lead: "앞에서 추천한 곳들, 실제로 다녀온 사람들은 어떻게 느꼈을까요? 긴 설명 대신 사진 한 장과 솔직한 한 줄만 모았습니다.",
    note: "* 별점·리뷰 수는 확인 가능한 공개 플랫폼의 현재 표시값을 사용했으며, 플랫폼별 집계 기준은 서로 다를 수 있습니다.",
    groups: [
      {
        title: ["사진 왕창", "찍고 싶은 날"],
        reviews: [
          {
            alt: "엑스포다리 방문 사진",
            place: "엑스포다리",
            quote: "“야경이 아름답고, 차가 다니지 않아 산책하기 좋아요.”",
            source: "Google review · via Wanderlog",
          },
          {
            alt: "이응노미술관 방문 사진",
            place: "이응노미술관",
            quote: "“미술관 건물이 예뻤어요. 그림도 괜찮고 공간 자체가 좋았어요.”",
            source: "Google review · via Wanderlog",
          },
        ],
      },
      {
        title: ["맛집 다", "뿌수고 싶은 날"],
        reviews: [
          {
            alt: "토미야 우동과 튀김 메뉴 사진",
            place: "토미야",
            quote: "“면발이 쫄깃하고 냉우동 육수와 튀김까지 정말 훌륭했어요.”",
            source: "DiningCode visitor review",
          },
          {
            alt: "희락반점 짜장면과 탕수육이 함께 놓인 음식 사진",
            place: "희락반점",
            quote: "“유니짜장은 확실히 다르고, 탕수육도 쫄깃해서 맛있어요.”",
            source: "DiningCode visitor review",
          },
        ],
      },
      {
        title: ["느좋 카페", "가고 싶은 날"],
        reviews: [
          {
            alt: "톨드 어 스토리 카페 내부 분위기 사진",
            place: "톨드 어 스토리",
            quote: "“깔끔함의 극치. 대전에서 근본 있는 곳이라 불리는 이유를 알겠던 곳.”",
            source: "Polle visitor review",
          },
          {
            alt: "쌍리 갤러리형 카페 내부 사진",
            place: "쌍리",
            quote: "“커피도 맛있고 공간과 인테리어가 너무 좋았어요. 가까우면 자주 갈 듯.”",
            source: "Polle visitor review",
          },
        ],
      },
      {
        title: ["아무 생각", "하기 싫은 날"],
        reviews: [
          {
            alt: "대동 하늘공원 방문 사진",
            place: "대동 하늘공원",
            quote: "“일몰 시간에 맞춰 오면 좋아요.”",
            source: "Google review · via Wanderlog",
          },
          {
            alt: "식장산 해돋이전망대에서 내려다본 대전 야경",
            place: "식장산 해돋이전망대",
            quote: "“주차도 무료고 올라가는 길도 재미있고, 야경이 정말 너무 예뻐요.”",
            source: "Google review · via Wanderlog",
          },
        ],
      },
    ],
  },
  en: {
    kicker: "REAL REVIEWS",
    headLine1: "It isn’t only us",
    headStrong: "saying Daejeon is good.",
    lead: "How did the places above feel to people who actually went? Instead of a long write-up, one photo and one honest line each.",
    translatedNotice:
      "The reviews below were written in Korean and have been translated here.",
    note: "* Ratings and review counts are the values shown on each public platform at the time of writing. How each platform counts them differs.",
    groups: [
      {
        title: ["For days you want", "to shoot everything"],
        reviews: [
          {
            alt: "A visitor photo of Expo Bridge",
            place: "Expo Bridge",
            quote: "“Beautiful at night, and no cars, so it’s a good place to walk.”",
            source: "Google review · via Wanderlog · translated",
          },
          {
            alt: "A visitor photo of the Lee Ungno Museum",
            place: "Lee Ungno Museum",
            quote: "“The building was lovely. The paintings were good and the space itself was great.”",
            source: "Google review · via Wanderlog · translated",
          },
        ],
      },
      {
        title: ["For days you want", "to eat it all"],
        reviews: [
          {
            alt: "A photo of udon and tempura at Tomiya",
            place: "Tomiya",
            quote: "“Chewy noodles, and the cold udon broth and the tempura were both excellent.”",
            source: "DiningCode visitor review · translated",
          },
          {
            alt: "A photo of jjajangmyeon and tangsuyuk at Huirak Banjeom",
            place: "Huirak Banjeom",
            quote: "“The yuni-jjajang is genuinely different, and the tangsuyuk has a good chew to it.”",
            source: "DiningCode visitor review · translated",
          },
        ],
      },
      {
        title: ["For days you want", "a good-looking cafe"],
        reviews: [
          {
            alt: "A photo of the interior of Told a Story",
            place: "Told a Story",
            quote: "“Immaculate. You can see why people call it one of the real ones in Daejeon.”",
            source: "Polle visitor review · translated",
          },
          {
            alt: "A photo inside the gallery-style cafe Ssangri",
            place: "Ssangri",
            quote: "“Good coffee, and I loved the space and the interior. If it were closer I’d go all the time.”",
            source: "Polle visitor review · translated",
          },
        ],
      },
      {
        title: ["For days you", "don’t want to think"],
        reviews: [
          {
            alt: "A visitor photo of Daedong Sky Park",
            place: "Daedong Sky Park",
            quote: "“Worth timing your visit for sunset.”",
            source: "Google review · via Wanderlog · translated",
          },
          {
            alt: "The Daejeon night view from the Sikjangsan Sunrise Observatory",
            place: "Sikjangsan Sunrise Observatory",
            quote: "“Parking is free, the road up is fun, and the night view is honestly gorgeous.”",
            source: "Google review · via Wanderlog · translated",
          },
        ],
      },
    ],
  },
};
