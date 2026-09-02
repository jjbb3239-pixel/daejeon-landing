import type { Copy } from "../i18n";
import type { MoodId } from "../quiz";

/**
 * 기분 이름은 세 군데(기분 카드 · 모바일 접힘 머리 · 승차권 캔버스)에서
 * 같이 쓴다. 여기 한 곳만 고치면 세 군데가 같이 바뀐다.
 */
export const MOOD_LABEL: Copy<Record<MoodId, string>> = {
  ko: {
    photo: "사진 왕창 찍고 싶은 날",
    food: "맛집 다 뿌수고 싶은 날",
    cafe: "느좋 카페 가고 싶은 날",
    course: "아무 생각 하기 싫은 날",
  },
  en: {
    photo: "A day for taking way too many photos",
    food: "A day for eating everything in sight",
    cafe: "A day for a really good-looking cafe",
    course: "A day for not thinking at all",
  },
};
