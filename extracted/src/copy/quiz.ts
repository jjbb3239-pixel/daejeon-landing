import type { Copy } from "../i18n";
import type { MoodId } from "../quiz";

type MoodResultCopy = {
  title: string;
  description: string;
  tags: string[];
  recommendation: string;
};

type QuestionCopy = {
  q: string;
  hint: string;
  choices: [{ label: string; sub: string }, { label: string; sub: string }];
};

type QuizCopy = {
  dialogLabel: string;
  closeLabel: string;
  kicker: string;
  questionWord: string;
  back: string;
  resultLabel: string;
  resultSmall: string;
  recommendationLabel: string;
  go: string;
  shareButton: string;
  retry: string;
  shareTitle: string;
  /** {mood} 자리에 결과 이름이 들어간다 */
  shareText: string;
  copied: string;
  copyFailed: string;
  moods: Record<MoodId, MoodResultCopy>;
  questions: QuestionCopy[];
};

export const QUIZ: Copy<QuizCopy> = {
  ko: {
    dialogLabel: "오늘의 기분 테스트",
    closeLabel: "기분 테스트 닫기",
    kicker: "TODAY’S MOOD TEST",
    questionWord: "QUESTION",
    back: "← 이전 질문",
    resultLabel: "MOOD CHECK COMPLETE ✓",
    resultSmall: "TODAY’S DAEJEON MOOD",
    recommendationLabel: "TODAY’S RECOMMENDATION",
    go: "이 기분으로 대전 보기 →",
    shareButton: "결과 공유하기",
    retry: "↻ 다시 테스트하기",
    shareTitle: "기분이 이끄는 대로, 일단 대전행.",
    shareText: "오늘 내 대전 여행 기분은 「{mood}」. 당신은요?",
    copied: "결과 링크가 복사됐어요",
    copyFailed: "복사가 막혀 있어요. 주소창의 링크를 직접 복사해 주세요",
    moods: {
      photo: {
        title: "사진 왕창 찍고 싶은 날",
        description:
          "오늘은 그냥 지나치기 아까운 장면을 찾아다니며 대전을 기록하고 싶은 기분이에요.",
        tags: ["#사진왕창", "#야경", "#감성스팟", "#피드채우기"],
        recommendation:
          "엑스포다리부터 이응노미술관까지, 오늘 피드에 남길 대전을 만나보세요.",
      },
      food: {
        title: "맛집 다 뿌수고 싶은 날",
        description:
          "오늘 여행의 중심은 맛있는 한 끼. 혼자라서 먹고 싶은 메뉴를 누구와도 합의할 필요가 없어요.",
        tags: ["#맛집도장깨기", "#혼밥", "#먹부림", "#내입맛대로"],
        recommendation:
          "토미야, 트리니트 비스트로, 희락반점 중 오늘 당기는 한 곳부터 골라보세요.",
      },
      cafe: {
        title: "느좋 카페에 머물고 싶은 날",
        description:
          "오늘은 많이 돌아다니기보다 마음에 드는 공간 하나를 찾아 천천히 머물고 싶은 기분이에요.",
        tags: ["#느좋카페", "#커피", "#혼자시간", "#천천히머물기"],
        recommendation:
          "귀여움, 커피, 독서. 오늘 원하는 무드에 맞는 대전 카페를 찾아보세요.",
      },
      course: {
        title: "아무 생각 하기 싫은 날",
        description:
          "오늘은 어디 갈지 검색하고 비교하는 것조차 귀찮은 기분. 그냥 정해진 순서대로 따라가보세요.",
        tags: ["#무계획", "#알아서해줘", "#감성코스", "#그냥따라가기"],
        recommendation:
          "소제동에서 시작해 식장산까지 이어지는 감성 코스를 그대로 따라가보세요.",
      },
    },
    questions: [
      {
        q: "대전역 개찰구를 막 나왔습니다. 머릿속에 먼저 뜨는 생각은?",
        hint: "정답은 없어요. 지금 끌리는 쪽으로.",
        choices: [
          {
            label: "어디가 예쁠까? 분위기 좋은 데부터 가고 싶다",
            sub: "예쁜 장면은 그냥 못 지나침",
          },
          {
            label: "어디서 뭘 먹지? 일단 가까운 데부터 가고 싶다",
            sub: "여행의 절반은 먹는 거니까",
          },
        ],
      },
      {
        q: "오늘 SNS에 딱 한 장만 올릴 수 있다면?",
        hint: "딱 한 장입니다. 신중하게.",
        choices: [
          { label: "방금 나온 음식 사진", sub: "또 생각날 만큼 맛있었던 한 끼" },
          { label: "창밖이 보이는 자리 사진", sub: "오래 앉아 있고 싶은 자리" },
        ],
      },
      {
        q: "일정이 비어서 두 시간이 남았습니다.",
        hint: "예정에 없던 시간이 생겼어요.",
        choices: [
          {
            label: "골목을 더 돌아본다. 걷는 김에 뭐라도 더 본다",
            sub: "움직이는 건 아직 괜찮아",
          },
          { label: "안 움직인다. 앉을 데부터 찾는다", sub: "오늘은 그만 걷고 싶어" },
        ],
      },
      {
        q: "집에 갈 때 손에 뭐가 들려 있으면 오늘 성공인가요?",
        hint: "마지막 질문이에요.",
        choices: [
          { label: "사진까지 찍어둔 예쁜 테이크아웃 컵", sub: "손에 들고 한 장 더 찍기" },
          { label: "역 근처에서 대충 집은 간식 봉지", sub: "고민 없이 집어 온 마무리" },
        ],
      },
    ],
  },
  en: {
    dialogLabel: "Today’s mood test",
    closeLabel: "Close the mood test",
    kicker: "TODAY’S MOOD TEST",
    questionWord: "QUESTION",
    back: "← Previous question",
    resultLabel: "MOOD CHECK COMPLETE ✓",
    resultSmall: "TODAY’S DAEJEON MOOD",
    recommendationLabel: "TODAY’S RECOMMENDATION",
    go: "See Daejeon in this mood →",
    shareButton: "Share my result",
    retry: "↻ Take it again",
    shareTitle: "Follow your mood. Just go to Daejeon.",
    shareText: "My Daejeon mood today is “{mood}”. What’s yours?",
    copied: "Link copied",
    copyFailed: "Copying is blocked. Please copy the link from the address bar.",
    moods: {
      photo: {
        title: "A day for photographing everything",
        description:
          "Today you feel like walking Daejeon looking for scenes that are too good to pass by.",
        tags: ["#photodump", "#nightview", "#moodspots", "#fillthefeed"],
        recommendation:
          "From Expo Bridge to the Lee Ungno Museum — find the Daejeon you want on today’s feed.",
      },
      food: {
        title: "A day for eating everything in sight",
        description:
          "Today the trip is built around one good meal. On your own, you never have to agree with anyone about what to order.",
        tags: ["#eatyourway", "#solodining", "#allthefood", "#myowntaste"],
        recommendation:
          "Start with whichever one appeals today: Tomiya, Trinite Bistro or Huirak Banjeom.",
      },
      cafe: {
        title: "A day to settle into a good cafe",
        description:
          "Rather than covering ground, today you want to find one space you like and stay in it.",
        tags: ["#goodcafe", "#coffee", "#timealone", "#stayawhile"],
        recommendation:
          "Cuteness, coffee or reading — find the Daejeon cafe that fits today.",
      },
      course: {
        title: "A day for not thinking at all",
        description:
          "Even searching and comparing places feels like too much today. Just follow the order as it is set.",
        tags: ["#noplan", "#decideforme", "#moodroute", "#justfollow"],
        recommendation:
          "Follow the route from Sojedong through to Sikjangsan, exactly as it comes.",
      },
    },
    questions: [
      {
        q: "You’ve just come through the gate at Daejeon Station. What’s the first thing in your head?",
        hint: "There’s no right answer. Go with whatever pulls you.",
        choices: [
          {
            label: "Where’s the good-looking part? I want to start somewhere with atmosphere",
            sub: "Can’t walk past a good scene",
          },
          {
            label: "What am I eating? Let’s start with whatever’s close",
            sub: "Half of any trip is the food",
          },
        ],
      },
      {
        q: "If you could post only one photo today, which one?",
        hint: "Only one. Choose carefully.",
        choices: [
          { label: "The dish that just arrived", sub: "Good enough you’ll think about it again" },
          { label: "A seat with a view out the window", sub: "The kind of seat you stay at" },
        ],
      },
      {
        q: "Your plans fell through and you have two hours.",
        hint: "Time you weren’t expecting.",
        choices: [
          {
            label: "Walk more of the backstreets. See something else while I’m at it",
            sub: "Still fine to keep moving",
          },
          { label: "Not moving. Find somewhere to sit first", sub: "Done walking for today" },
        ],
      },
      {
        q: "What’s in your hand on the way home if today went well?",
        hint: "Last question.",
        choices: [
          { label: "A takeaway cup pretty enough to photograph", sub: "One more shot, cup in hand" },
          { label: "A bag of snacks grabbed near the station", sub: "An ending with no deliberating" },
        ],
      },
    ],
  },
};
