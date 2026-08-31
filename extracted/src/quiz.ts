/**
 * 기분 테스트.
 *
 * 문항과 판정 로직은 기존 것을 그대로 유지한다 (4문항 × 2지선다, 주 취향 +2 / 부 취향 +1).
 * 바뀐 건 네 번째 취향의 이름뿐 — `solo`(혼자 감수성) → `course`(아무 생각 하기 싫은 날).
 * 새 디자인의 네 번째 카드·섹션과 이름을 맞추기 위해서다.
 */

/** id 는 페이지의 섹션 id(#photo, #food, #cafe, #course)와 1:1로 대응된다. */
export type MoodId = "photo" | "food" | "cafe" | "course";

export type Mood = {
  id: MoodId;
  emoji: string;
  /** 결과 화면 제목 */
  title: string;
  description: string;
  /** 결과 화면 해시태그 */
  tags: string[];
  recommendation: string;
  /** 결과 버튼이 데려갈 섹션 */
  target: string;
};

export const MOODS: Record<MoodId, Mood> = {
  photo: {
    id: "photo",
    emoji: "📸",
    title: "사진 왕창 찍고 싶은 날",
    description:
      "오늘은 그냥 지나치기 아까운 장면을 찾아다니며 대전을 기록하고 싶은 기분이에요.",
    tags: ["#사진왕창", "#야경", "#감성스팟", "#피드채우기"],
    recommendation:
      "엑스포다리부터 이응노미술관까지, 오늘 피드에 남길 대전을 만나보세요.",
    target: "#photo",
  },

  food: {
    id: "food",
    emoji: "🍜",
    title: "맛집 다 뿌수고 싶은 날",
    description:
      "오늘 여행의 중심은 맛있는 한 끼. 혼자라서 먹고 싶은 메뉴를 누구와도 합의할 필요가 없어요.",
    tags: ["#맛집도장깨기", "#혼밥", "#먹부림", "#내입맛대로"],
    recommendation:
      "토미야, 트리니트 비스트로, 희락반점 중 오늘 당기는 한 곳부터 골라보세요.",
    target: "#food",
  },

  cafe: {
    id: "cafe",
    emoji: "☕",
    title: "느좋 카페에 머물고 싶은 날",
    description:
      "오늘은 많이 돌아다니기보다 마음에 드는 공간 하나를 찾아 천천히 머물고 싶은 기분이에요.",
    tags: ["#느좋카페", "#커피", "#혼자시간", "#천천히머물기"],
    recommendation:
      "귀여움, 커피, 독서. 오늘 원하는 무드에 맞는 대전 카페를 찾아보세요.",
    target: "#cafe",
  },

  course: {
    id: "course",
    emoji: "🗺️",
    title: "아무 생각 하기 싫은 날",
    description:
      "오늘은 어디 갈지 검색하고 비교하는 것조차 귀찮은 기분. 그냥 정해진 순서대로 따라가보세요.",
    tags: ["#무계획", "#알아서해줘", "#감성코스", "#그냥따라가기"],
    recommendation:
      "소제동에서 시작해 식장산까지 이어지는 감성 코스를 그대로 따라가보세요.",
    target: "#course",
  },
};

export type Choice = {
  /** 선택지 제목 */
  label: string;
  /** 새 디자인의 선택지 버튼에 들어가는 아이콘과 보조 문구 */
  icon: string;
  sub: string;
  /** 취향별 가중치. 주 취향 +2, 부 취향 +1 */
  score: Partial<Record<MoodId, number>>;
};

export type Question = {
  q: string;
  hint: string;
  choices: [Choice, Choice];
};

/**
 * 4문항 × 2지선다.
 * 각 취향이 '주 취향(+2)'으로 2번, '부 취향(+1)'으로 2번씩 나오도록 배분해
 * 네 가지 결과가 모두 나올 수 있게 맞춰뒀다. (검증: quiz.check.ts)
 */
export const QUESTIONS: Question[] = [
  {
    q: "대전역 개찰구를 막 나왔습니다. 머릿속에 먼저 뜨는 생각은?",
    hint: "정답은 없어요. 지금 끌리는 쪽으로.",
    choices: [
      {
        label: "어디가 예쁠까? 분위기 좋은 데부터 가고 싶다",
        icon: "📸",
        sub: "예쁜 장면은 그냥 못 지나침",
        score: { photo: 2, cafe: 1 },
      },
      {
        label: "어디서 뭘 먹지? 일단 가까운 데부터 가고 싶다",
        icon: "🍜",
        sub: "여행의 절반은 먹는 거니까",
        score: { food: 2, course: 1 },
      },
    ],
  },
  {
    q: "오늘 SNS에 딱 한 장만 올릴 수 있다면?",
    hint: "딱 한 장입니다. 신중하게.",
    choices: [
      { label: "방금 나온 음식 사진",
        icon: "🥢",
        sub: "또 생각날 만큼 맛있었던 한 끼", score: { food: 2, photo: 1 } },
      { label: "창밖이 보이는 자리 사진",
        icon: "🌿",
        sub: "오래 앉아 있고 싶은 자리", score: { cafe: 2, course: 1 } },
    ],
  },
  {
    q: "일정이 비어서 두 시간이 남았습니다.",
    hint: "예정에 없던 시간이 생겼어요.",
    choices: [
      {
        label: "골목을 더 돌아본다. 걷는 김에 뭐라도 더 본다",
        icon: "🏃",
        sub: "움직이는 건 아직 괜찮아",
        score: { photo: 2, food: 1 },
      },
      { label: "안 움직인다. 앉을 데부터 찾는다",
        icon: "🫠",
        sub: "오늘은 그만 걷고 싶어", score: { course: 2, cafe: 1 } },
    ],
  },
  {
    q: "집에 갈 때 손에 뭐가 들려 있으면 오늘 성공인가요?",
    hint: "마지막 질문이에요.",
    choices: [
      { label: "사진까지 찍어둔 예쁜 테이크아웃 컵",
        icon: "☕",
        sub: "손에 들고 한 장 더 찍기", score: { cafe: 2, photo: 1 } },
      { label: "역 근처에서 대충 집은 간식 봉지",
        icon: "🛍️",
        sub: "고민 없이 집어 온 마무리", score: { course: 2, food: 1 } },
    ],
  },
];

/** 동점일 때 밀어줄 최종 순서 */
const FALLBACK: MoodId[] = ["photo", "food", "cafe", "course"];

/** 답변(각 문항의 선택지 index 0|1) 배열을 취향 하나로 판정한다. */
export function resolveMood(answers: number[]): MoodId {
  const score: Record<MoodId, number> = { photo: 0, food: 0, cafe: 0, course: 0 };

  answers.forEach((pick, i) => {
    const chosen = QUESTIONS[i].choices[pick].score;
    for (const key in chosen) {
      const id = key as MoodId;
      score[id] += chosen[id]!;
    }
  });

  const best = Math.max(...FALLBACK.map((id) => score[id]));
  const tied = FALLBACK.filter((id) => score[id] === best);
  if (tied.length === 1) return tied[0];

  // 동점이면 마지막 문항에서 고른 쪽의 주 취향을 밀어준다.
  const last = QUESTIONS[QUESTIONS.length - 1].choices[answers[answers.length - 1]];
  const primary = (Object.keys(last.score) as MoodId[]).find(
    (id) => last.score[id] === 2,
  );

  if (primary && tied.includes(primary)) return primary;
  return tied[0];
}
