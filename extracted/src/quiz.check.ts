/**
 * 퀴즈 자체 검사.
 *
 *   node --experimental-strip-types src/quiz.check.ts
 *
 * 16개 조합(2^4)이 전부 취향 하나로 판정되는지, 그리고 네 취향이 모두
 * 한 번 이상 나오는지 확인한다. 결과가 안 나오는 취향이 있으면 실패.
 */
import { MOODS, QUESTIONS, resolveMood, type MoodId } from "./quiz.ts";

const seen: Record<string, number> = {};
const total = 2 ** QUESTIONS.length;

for (let mask = 0; mask < total; mask++) {
  const answers = QUESTIONS.map((_, i) => (mask >> i) & 1);
  const mood = resolveMood(answers);

  if (!MOODS[mood]) {
    throw new Error(`알 수 없는 결과: ${mood} (답변 ${answers.join("")})`);
  }
  seen[mood] = (seen[mood] ?? 0) + 1;
}

const missing = (Object.keys(MOODS) as MoodId[]).filter((id) => !seen[id]);
if (missing.length) {
  throw new Error(`한 번도 안 나오는 취향: ${missing.join(", ")}`);
}

// 결과가 데려갈 섹션이 실제 섹션 id 와 맞는지도 같이 본다.
for (const id of Object.keys(MOODS) as MoodId[]) {
  if (MOODS[id].target !== `#${id}`) {
    throw new Error(`${id} 의 target 이 #${id} 가 아님: ${MOODS[id].target}`);
  }
}

console.log(`${total}개 조합 전부 통과. 분포:`, seen);
