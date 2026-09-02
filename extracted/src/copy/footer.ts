import type { Copy } from "../i18n";

type CreditCopy = {
  label: string;
  body?: string | string[];
  /** [장소, 출처] — 원문 주소는 SiteFooter 에 코드로 있다 */
  items?: [string, string][];
  linkText?: string;
};

type FooterCopy = {
  toTop: string;
  brandLine1: string;
  brandLine2: string;
  brandCopy: string;
  instagram: string;
  shareButton: string;
  copied: string;
  copyFailed: string;
  navTitle: string;
  nav: string[];
  teamTitle: string;
  teamLabel: string;
  contactLabel: string;
  creditsTitle: string;
  credits: CreditCopy[];
  notice: string;
  meta: string;
  shareTitle: string;
  shareText: string;
};

export const FOOTER: Copy<FooterCopy> = {
  ko: {
    toTop: "맨 위로 ↑",
    brandLine1: "기분이 이끄는 대로,",
    brandLine2: "일단 대전행.",
    brandCopy:
      "오늘 내 기분에 맞는 대전 하루를 찾아주는 페이지입니다. 계획은 도착해서 세워도 괜찮으니까요.",
    instagram: "Instagram ↗",
    shareButton: "친구에게 공유",
    copied: "링크가 복사됐어요",
    copyFailed: "복사가 막혀 있어요. 주소창의 링크를 직접 복사해 주세요",
    navTitle: "바로가기",
    nav: [
      "오늘의 기분 고르기",
      "사진 왕창 찍고 싶은 날",
      "맛집 다 뿌수고 싶은 날",
      "느좋 카페 가고 싶은 날",
      "아무 생각 하기 싫은 날",
      "실제 방문객 리뷰",
      "지금 열리는 행사",
    ],
    teamTitle: "만든 사람",
    teamLabel: "팀",
    contactLabel: "문의",
    creditsTitle: "사진 · 콘텐츠 출처",
    credits: [
      {
        label: "캐릭터",
        body: "꿈돌이 · 꿈씨패밀리 — 대전광역시 공식 캐릭터. 「꿈씨패밀리 캐릭터 디자인 및 활용 가이드라인」의 기본형·응용 동작을 그대로 사용했습니다.",
      },
      {
        label: "리뷰",
        body: "Google 리뷰(via Wanderlog) · 다이닝코드 · 폴레. 별점과 리뷰 수는 각 플랫폼에 공개된 표시값이며, 집계 기준은 서로 다를 수 있습니다.",
      },
      {
        label: "행사 포스터",
        body: [
          "[동구동락]: 대전 동구청,「다가오는 10월, 대전 동구 큰 거 온다! 2026년 동구동락 축제 커밍순✨」, 대전 동구청 블로그, 2026.08.27.",
          "[유성온날]: 공식 홈페이지,(https://blog.naver.com/djdonggu/224391972520",
          "[대전콘텐츠페어]: 공식 홈페이지,(https://dcfair.co.kr/)",
          "[대전빵축제]: 공식 인스타그램(@bakery_festival_daejeon),2026. 8. 21. 게시물",
        ],
      },
      {
        label: "명소 사진",
        body: "엑스포다리 · 이응노미술관 · 엑스포과학공원 한빛탑 · 대전근현대사전시관 — 한국관광공사 「대한민국 명소발굴 100×100」에서 가져왔습니다. 사이트에 이용조건 표시가 없어 재이용 범위는 확인 중입니다.",
        linkText: "spot100x100.kr ↗",
      },
      {
        label: "코스 사진",
        items: [
          ["소제동 철도관사촌", "스마트관광신문"],
          ["구모카페 · 구름책방", "K-books trends"],
          ["대동 하늘공원", "대전관광공사"],
          ["식장산 해돋이전망대", "대전광역시 동구 (공공누리 제1유형)"],
        ],
      },
      {
        label: "카페 사진",
        items: [
          [
            "궁동 소신",
            "pan03184, 「대전 유성 궁동 충남대 유명한 파티세리소신 꿈돌이 디저트 카페」, 졍졍졍블로그 (2026.08.30)",
          ],
          [
            "갈마동 톨드어스토리",
            "톨드어스토리 공식 홈페이지 「COFFEE LETTER — 하리오 V60 드리퍼 브루잉 가이드」",
          ],
          ["대흥동 쌍리", "출처 정리 중"],
        ],
      },
      {
        label: "맛집 사진",
        body: "토미야 · 트리니트 비스트로 · 희락반점의 음식 사진은 맛집 섹션과 리뷰 섹션 모두 AI 로 만든 것입니다. 실제 매장에서 찍은 사진이 아닙니다.",
      },
    ],
    notice:
      "행사 일정과 메뉴·가격은 바뀔 수 있습니다. 방문 전에 각 공식 채널에서 한 번 더 확인해 주세요.",
    meta: "© 2026 대전 여행 랜딩페이지 · 비상업 학습용 프로젝트",
    shareTitle: "기분이 이끄는 대로, 일단 대전행.",
    shareText: "오늘 기분에 맞는 대전 하루 코스를 찾아보세요.",
  },
  en: {
    toTop: "Back to top ↑",
    brandLine1: "Follow your mood,",
    brandLine2: "just go to Daejeon.",
    brandCopy:
      "A page that finds you a day in Daejeon to match the mood you are in. You can plan once you get there.",
    instagram: "Instagram ↗",
    shareButton: "Share with a friend",
    copied: "Link copied",
    copyFailed: "Copying is blocked. Please copy the link from the address bar.",
    navTitle: "Jump to",
    nav: [
      "Pick today’s mood",
      "A day for photos",
      "A day for eating",
      "A day for a good cafe",
      "A day for not thinking",
      "Real visitor reviews",
      "What’s on right now",
    ],
    teamTitle: "Made by",
    teamLabel: "Team",
    contactLabel: "Contact",
    creditsTitle: "Photo and content credits",
    credits: [
      {
        label: "Characters",
        body: "Kkumdori and the Kkumssi Family are the official characters of Daejeon Metropolitan City. The base and applied poses are used as published in the official character design and usage guidelines.",
      },
      {
        label: "Reviews",
        body: "Google reviews (via Wanderlog), DiningCode and Polle. Ratings and review counts are the values shown publicly on each platform, and each platform counts them differently.",
      },
      {
        label: "Event posters",
        body: [
          "[Donggu Dongrak]: Dong-gu Office, Daejeon, “Something big is coming to Dong-gu this October — the 2026 Donggu Dongrak Festival ✨”, Dong-gu Office blog, 27 Aug 2026.",
          "[Yuseong Yuon]: official page, https://blog.naver.com/djdonggu/224391972520",
          "[Daejeon Content Fair]: official site, https://dcfair.co.kr/",
          "[Daejeon Bread Festival]: official Instagram (@bakery_festival_daejeon), post of 21 Aug 2026",
        ],
      },
      {
        label: "Landmark photos",
        body: "Expo Bridge, Lee Ungno Museum, Hanbit Tower at Expo Science Park and the Daejeon Museum of Modern History are from Korea Tourism Organization's \"Discover Korea 100x100\". The site states no usage terms, so reuse scope is still being confirmed.",
        linkText: "spot100x100.kr ↗",
      },
      {
        label: "Course photos",
        items: [
          ["Sojedong Railway Village", "Smart Tourism News"],
          ["Gumo Cafe · Gureum Bookshop", "K-books trends"],
          ["Daedong Sky Park", "Daejeon Tourism Organization"],
          ["Sikjangsan Sunrise Observatory", "Dong-gu, Daejeon (KOGL Type 1)"],
        ],
      },
      {
        label: "Cafe photos",
        items: [
          [
            "Sosin, Gungdong",
            "pan03184, “Patisserie Sosin, the Kkumdori dessert cafe in Gungdong, Yuseong”, Jjeongjjeongjjeong Blog (30 Aug 2026)",
          ],
          [
            "Told a Story, Galma-dong",
            "Told a Story official site, “COFFEE LETTER — Hario V60 brewing guide”",
          ],
          ["Ssangri, Daeheung-dong", "Source being confirmed"],
        ],
      },
      {
        label: "Restaurant photos",
        body: "The food images for Tomiya, Trinite Bistro and Huirak Banjeom — in both the restaurant section and the review section — were generated with AI. They are not photographs taken at the restaurants.",
      },
    ],
    notice:
      "Event dates, menus and prices can change. Please check each official channel once more before you go.",
    meta: "© 2026 Daejeon travel landing page · non-commercial student project",
    shareTitle: "Follow your mood. Just go to Daejeon.",
    shareText: "Find a day in Daejeon that matches how you feel today.",
  },
};
