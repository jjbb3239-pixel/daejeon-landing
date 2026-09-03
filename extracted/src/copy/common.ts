import type { Copy } from "../i18n";

/** 여러 섹션이 같이 쓰는 문구. */
export const COMMON: Copy<{ back: string; linkPending: string; map: string }> = {
  ko: { back: "← 기분 다시 고르기", linkPending: "링크 준비 중입니다", map: "지도" },
  en: { back: "← Pick another mood", linkPending: "This link is not ready yet", map: "Map" },
};
