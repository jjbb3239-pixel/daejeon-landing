// 실행: node src/quiz.check.ts
// 2지선다 4문항 = 16가지 답변 조합이 모두 유효한 결과로 떨어지는지,
// 그리고 네 가지 취향이 전부 나올 수 있는지 확인한다.
import assert from "node:assert";
import { MOODS, QUESTIONS, resolveMood, type MoodId } from "./quiz.ts";

const combos: number[][] = [];
for (let i = 0; i < 1 << QUESTIONS.length; i++) {
  combos.push(QUESTIONS.map((_, q) => (i >> q) & 1));
}

const hits: Record<string, number> = {};
for (const answers of combos) {
  const mood = resolveMood(answers);
  assert.ok(MOODS[mood], `알 수 없는 결과: ${mood} (${answers})`);
  hits[mood] = (hits[mood] ?? 0) + 1;
}

assert.equal(combos.length, 16, "조합 수가 16이 아님");
for (const id of Object.keys(MOODS) as MoodId[]) {
  assert.ok(hits[id] > 0, `결과로 한 번도 안 나오는 취향: ${id}`);
}

// 취향마다 페이지가 연결돼 있는지는 App.tsx의 라우팅 맵 타입이 컴파일 단계에서 보장한다.

// 문항별 가중치가 한쪽으로 쏠리면 특정 결과가 안 나온다. 주 취향(+2)이 고르게 퍼졌는지 확인.
const primary: Record<string, number> = {};
for (const q of QUESTIONS) {
  for (const c of q.choices) {
    for (const [id, w] of Object.entries(c.score)) {
      if (w === 2) primary[id] = (primary[id] ?? 0) + 1;
    }
  }
}
for (const id of Object.keys(MOODS) as MoodId[]) {
  assert.equal(primary[id], 2, `주 취향 배분이 2가 아님: ${id} = ${primary[id]}`);
}

console.log("16개 조합 전부 통과. 분포:", hits);
