import type { Copy } from "../i18n";

type RestaurantCopy = {
  alt: string;
  type: string;
  name: string;
  copy: string;
  menu: [string, string][];
  address: string;
  walk: string;
};

type FoodCopy = {
  eyebrow: string;
  titleLead: string;
  titleStrong: string;
  titleLine2: string;
  leadLine1: string;
  leadLine2: string;
  menuLabel: string;
  addressLabel: string;
  walkLabel: string;
  restaurants: RestaurantCopy[];
};

export const FOOD: Copy<FoodCopy> = {
  ko: {
    eyebrow: "맛있는 거 다 뿌수고 싶은 기분이에요",
    titleLead: "대전 ",
    titleStrong: "맛집",
    titleLine2: "도장깨기",
    leadLine1: "혼밥 난이도는 낮게, 만족도는 높게.",
    leadLine2:
      "혼자여도 제대로 즐길 수 있는 대전 맛집 3곳을 골랐어요. 전부 블루리본 맛집만 찾아왔어요.",
    menuLabel: "추천 메뉴",
    addressLabel: "위치",
    walkLabel: "가는 길",
    restaurants: [
      {
        alt: "토미야의 토리텐붓카케",
        type: "일식",
        name: "토미야",
        copy: "오늘은 깔끔한 일식이 당기는 날. 혼자 천천히 한 끼를 즐기고 싶을 때 체크해보세요.",
        menu: [
          ["토리텐붓카케", "13,000원"],
          ["니꾸우동", "11,000원"],
          ["붓카케우동", "8,500원"],
        ],
        address: "대전 중구 대흥로529번길 18",
        walk: "대전역 도보 10분",
      },
      {
        alt: "트리니트 비스트로의 파스타",
        type: "양식",
        name: "트리니트 비스트로",
        copy: "음식뿐 아니라 분위기까지 챙기고 싶은 날. 오늘의 양식 한 끼 후보로 저장해두세요.",
        menu: [
          ["트러플 크림 뇨끼", "19,000원"],
          ["라구 파스타", "18,000원"],
          ["채끝 스테이크", "32,000원"],
        ],
        address: "대전 유성구 계룡로123번길 45",
        walk: "유성온천역 도보 5분",
      },
      {
        alt: "희락반점의 유니짜장",
        type: "중식",
        name: "희락반점",
        copy: "든든한 중식 한 끼가 생각나는 날. 오늘 내 입맛이 중식을 가리킨다면 후보에 넣어보세요.",
        menu: [
          ["유니짜장", "8,000원"],
          ["탕수육", "20,000원"],
          ["짬뽕", "9,000원"],
        ],
        address: "대전 동구 대전로 829",
        walk: "대전역 도보 8분",
      },
    ],
  },
  en: {
    eyebrow: "You’re in the mood to eat everything in sight",
    titleLead: "Working through ",
    titleStrong: "Daejeon’s",
    titleLine2: "best tables",
    leadLine1: "Easy to do alone, and still worth the trip.",
    leadLine2:
      "Three Daejeon restaurants you can properly enjoy on your own — all of them Blue Ribbon picks.",
    menuLabel: "What to order",
    addressLabel: "Address",
    walkLabel: "Getting there",
    restaurants: [
      {
        alt: "Toriten bukkake udon at Tomiya",
        type: "Japanese",
        name: "Tomiya",
        copy: "For a day when you want something clean and Japanese, and a meal you can take slowly on your own.",
        menu: [
          ["Toriten Bukkake Udon", "13,000 KRW"],
          ["Niku Udon", "11,000 KRW"],
          ["Bukkake Udon", "8,500 KRW"],
        ],
        address: "18 Daeheung-ro 529beon-gil, Jung-gu, Daejeon",
        walk: "10 min walk from Daejeon Station",
      },
      {
        alt: "Pasta at Trinite Bistro",
        type: "Western",
        name: "Trinite Bistro",
        copy: "For a day when the room matters as much as the plate. Keep it in mind for a Western meal.",
        menu: [
          ["Truffle Cream Gnocchi", "19,000 KRW"],
          ["Ragu Pasta", "18,000 KRW"],
          ["Sirloin Steak", "32,000 KRW"],
        ],
        address: "45 Gyeryong-ro 123beon-gil, Yuseong-gu, Daejeon",
        walk: "5 min walk from Yuseong Oncheon Station",
      },
      {
        alt: "Yuni-jjajang at Huirak Banjeom",
        type: "Chinese",
        name: "Huirak Banjeom",
        copy: "For a day that calls for a solid Chinese meal. If that is where your appetite is pointing, put it on the list.",
        menu: [
          ["Yuni-jjajang", "8,000 KRW"],
          ["Tangsuyuk", "20,000 KRW"],
          ["Jjamppong", "9,000 KRW"],
        ],
        address: "829 Daejeon-ro, Dong-gu, Daejeon",
        walk: "8 min walk from Daejeon Station",
      },
    ],
  },
};
