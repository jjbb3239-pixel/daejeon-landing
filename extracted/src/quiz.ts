/** 취향 4종. id는 App.tsx의 페이지 라우팅 키와 1:1로 대응된다. */
export type MoodId = "photo" | "food" | "cafe" | "solo";

export type Mood = {
  id: MoodId;
  icon: string;
  /** #choose 카드에 적힌 이름과 동일하게 유지할 것 */
  name: string;
  title: string;
  copy: string;
  /** 결과창 티켓의 목적지 표기 */
  destination: string;
};

export const MOODS: Record<MoodId, Mood> = {
  photo: {
    id: "photo",
    icon: "📷",
    name: "사진 왕창 찍고 싶은 날",
    title: "셔터부터 누르는 사람",
    copy: "오늘 하루가 카메라 롤에 남아야 직성이 풀리는 타입. 찍는 곳마다 그림 되는 대전 스팟들로 안내할게요.",
    destination: "PHOTO SPOT",
  },
  food: {
    id: "food",
    icon: "🍽️",
    name: "맛집 다 뿌수고 싶은 날",
    title: "일단 먹고 보는 사람",
    copy: "여행의 8할이 뭘 먹었느냐로 기억되는 타입. 오늘은 남의 입맛 말고 내 입맛대로 골라봐요.",
    destination: "EAT ALL DAY",
  },
  cafe: {
    id: "cafe",
    icon: "☕",
    name: "느좋 카페 가고 싶은 날",
    title: "앉아있는 걸 잘하는 사람",
    copy: "많이 돌아다니는 것보다 좋은 자리에 오래 앉아있는 게 취향인 타입. 기분에 맞는 카페부터 찾아볼게요.",
    destination: "CAFE HOPPING",
  },
  solo: {
    id: "solo",
    icon: "🌌",
    name: "혼자 감수성 터지는 날",
    title: "혼자 걷는 게 편한 사람",
    copy: "말 안 해도 되는 하루가 필요한 타입. 오래된 골목에서 시작해 노을과 야경으로 끝나는 코스로 안내할게요.",
    destination: "SOLO MOOD",
  },
};

export type Choice = {
  label: string;
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
      { label: "어디가 예쁠까? 분위기 좋은 데부터 가고 싶다", score: { photo: 2, cafe: 1 } },
      { label: "어디서 뭘 먹지? 일단 가까운 데부터 가고 싶다", score: { food: 2, solo: 1 } },
    ],
  },
  {
    q: "오늘 SNS에 딱 한 장만 올릴 수 있다면?",
    hint: "딱 한 장입니다. 신중하게.",
    choices: [
      { label: "방금 나온 음식 사진", score: { food: 2, photo: 1 } },
      { label: "창밖이 보이는 자리 사진", score: { cafe: 2, solo: 1 } },
    ],
  },
  {
    q: "일정이 비어서 두 시간이 남았습니다.",
    hint: "예정에 없던 시간이 생겼어요.",
    choices: [
      { label: "골목을 더 돌아본다. 걷는 김에 뭐라도 더 본다", score: { photo: 2, food: 1 } },
      { label: "안 움직인다. 앉을 데부터 찾는다", score: { solo: 2, cafe: 1 } },
    ],
  },
  {
    q: "집에 갈 때 손에 뭐가 들려 있으면 오늘 성공인가요?",
    hint: "마지막 질문이에요.",
    choices: [
      { label: "사진까지 찍어둔 예쁜 테이크아웃 컵", score: { cafe: 2, photo: 1 } },
      { label: "역 근처에서 대충 집은 간식 봉지", score: { solo: 2, food: 1 } },
    ],
  },
];

/** 동점일 때 밀어줄 최종 순서 */
const FALLBACK: MoodId[] = ["photo", "food", "cafe", "solo"];

/** 답변(각 문항의 선택지 index 0|1) 배열을 취향 하나로 판정한다. */
export function resolveMood(answers: number[]): MoodId {
  const score: Record<MoodId, number> = { photo: 0, food: 0, cafe: 0, solo: 0 };

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

  // 동점이면 마지막 문항에서 가장 크게 밀어준 취향을 우선한다.
  const last = QUESTIONS[answers.length - 1].choices[answers[answers.length - 1]].score;
  const lastPrimary = tied.find((id) => (last[id] ?? 0) === 2);

  return lastPrimary ?? tied[0];
}
