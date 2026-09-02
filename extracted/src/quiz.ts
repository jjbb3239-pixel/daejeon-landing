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
  /** 결과 버튼이 데려갈 섹션 */
  target: string;
};

/** 제목·설명·태그·추천 문구는 copy/quiz.ts 에 있다. */
export const MOODS: Record<MoodId, Mood> = {
  photo: { id: "photo", emoji: "📸", target: "#photo" },
  food: { id: "food", emoji: "🍜", target: "#food" },
  cafe: { id: "cafe", emoji: "☕", target: "#cafe" },
  course: { id: "course", emoji: "🗺️", target: "#course" },
};

export type Choice = {
  /** 선택지 버튼의 아이콘. 문구는 copy/quiz.ts */
  icon: string;
  /** 취향별 가중치. 주 취향 +2, 부 취향 +1 */
  score: Partial<Record<MoodId, number>>;
};

export type Question = {
  choices: [Choice, Choice];
};

/**
 * 4문항 × 2지선다.
 * 각 취향이 '주 취향(+2)'으로 2번, '부 취향(+1)'으로 2번씩 나오도록 배분해
 * 네 가지 결과가 모두 나올 수 있게 맞춰뒀다. (검증: quiz.check.ts)
 */
export const QUESTIONS: Question[] = [
  {
    choices: [
      { icon: "📸", score: { photo: 2, cafe: 1 } },
      { icon: "🍜", score: { food: 2, course: 1 } },
    ],
  },
  {
    choices: [
      { icon: "🥢", score: { food: 2, photo: 1 } },
      { icon: "🌿", score: { cafe: 2, course: 1 } },
    ],
  },
  {
    choices: [
      { icon: "🏃", score: { photo: 2, food: 1 } },
      { icon: "🫠", score: { course: 2, cafe: 1 } },
    ],
  },
  {
    choices: [
      { icon: "☕", score: { cafe: 2, photo: 1 } },
      { icon: "🛍️", score: { course: 2, food: 1 } },
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
