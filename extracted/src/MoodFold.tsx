import type { ReactNode } from "react";
import type { MoodId } from "./quiz";

/** 접힘 머리에 쓰는 이름. 기분 카드 아래에 적힌 문구와 같게 맞춘다. */
export const FOLD_LABEL: Record<MoodId, { emoji: string; label: string }> = {
  photo: { emoji: "📸", label: "사진 왕창 찍고 싶은 날" },
  food: { emoji: "🍜", label: "맛집 다 뿌수고 싶은 날" },
  cafe: { emoji: "☕", label: "느좋 카페 가고 싶은 날" },
  course: { emoji: "🗺️", label: "아무 생각 하기 싫은 날" },
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
  const { emoji, label } = FOLD_LABEL[id];

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
