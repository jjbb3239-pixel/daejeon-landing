import type { ReactNode } from "react";
import type { MoodId } from "./quiz";
import { MOOD_LABEL } from "./copy/moods";
import { useCopy } from "./i18n";

/** 접힘 머리 아이콘. 문구는 기분 카드와 같은 사전(MOOD_LABEL)을 쓴다. */
const FOLD_EMOJI: Record<MoodId, string> = {
  photo: "📸",
  food: "🍜",
  cafe: "☕",
  course: "🗺️",
};

type MoodFoldProps = {
  id: MoodId;
  open: boolean;
  onToggle: (id: MoodId) => void;
  children: ReactNode;
};

/**
 * 모바일에서 기분 섹션을 접었다 펴는 껍데기.
 *
 * PC 에서는 토글이 숨겨지고 본문이 항상 보인다 (CSS 가 처리).
 * 섹션의 `id` 는 안쪽 컴포넌트에 그대로 있어서 앵커 링크가 그대로 동작한다.
 */
export default function MoodFold({ id, open, onToggle, children }: MoodFoldProps) {
  const emoji = FOLD_EMOJI[id];
  const label = useCopy(MOOD_LABEL)[id];

  return (
    <div className={open ? "mood-fold is-open" : "mood-fold"} data-mood={id}>
      <button
        type="button"
        className="mood-fold-toggle"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="mood-fold-emoji" aria-hidden="true">
          {emoji}
        </span>

        <span className="mood-fold-label">{label}</span>

        <span className="mood-fold-arrow" aria-hidden="true">
          ▾
        </span>
      </button>

      <div className="mood-fold-body">{children}</div>
    </div>
  );
}
