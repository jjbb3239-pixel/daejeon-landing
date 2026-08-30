import { useEffect, useRef, useState } from "react";
import { MOODS, QUESTIONS, resolveMood, type MoodId } from "./quiz";
import { playTicketTear } from "./ticketTear";

type QuizModalProps = {
  onClose: () => void;
  /** 결과창에서 코스를 고르면 해당 코스 페이지로 전환한다 */
  onSelect: (id: MoodId) => void;
};

export default function QuizModal({ onClose, onSelect }: QuizModalProps) {
  const [answers, setAnswers] = useState<number[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const step = answers.length;
  const done = step === QUESTIONS.length;
  const mood: MoodId | null = done ? resolveMood(answers) : null;

  // 팝업이 열려 있는 동안 뒤 배경 스크롤을 막는다.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC로 닫기 + 열릴 때 팝업 안으로 포커스 이동
  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function goToCourse(id: MoodId) {
    // 승차권이 자라날 출발 위치. 팝업이 닫히기 전에 재둬야 한다.
    const from = ticketRef.current?.getBoundingClientRect();
    onClose();

    if (!from) {
      onSelect(id);
      return;
    }

    void playTicketTear({ from, mood: id, ms: 2000, onArrive: () => onSelect(id) });
  }

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div
        className="quiz-panel"
        role="dialog"
        aria-modal="true"
        aria-label="내 취향 찾기"
        tabIndex={-1}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="quiz-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        <div className="quiz-perforation" />

        {!done && (
          <>
            <div className="quiz-head">
              <span className="quiz-label">★ 내 취향 찾기</span>

              <div className="quiz-progress" aria-label={`${QUESTIONS.length}문항 중 ${step + 1}번째`}>
                {QUESTIONS.map((_, i) => (
                  <span key={i} className={i <= step ? "dot on" : "dot"} />
                ))}
                <em>
                  {step + 1} / {QUESTIONS.length}
                </em>
              </div>
            </div>

            <div className="quiz-body">
              <span className="quiz-hint">{QUESTIONS[step].hint}</span>

              <h3 className="quiz-question">{QUESTIONS[step].q}</h3>

              <div className="quiz-choices">
                {QUESTIONS[step].choices.map((choice, i) => (
                  <button
                    key={i}
                    className="quiz-choice"
                    onClick={() => setAnswers([...answers, i])}
                  >
                    <span className="choice-tag">{i === 0 ? "A" : "B"}</span>
                    <span className="choice-text">{choice.label}</span>
                    <span className="choice-arrow">→</span>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button className="quiz-back" onClick={() => setAnswers(answers.slice(0, -1))}>
                  ← 이전 질문
                </button>
              )}
            </div>
          </>
        )}

        {done && mood && (
          <>
            <div className="quiz-head">
              <span className="quiz-label">★ 오늘의 대전행 티켓</span>

              <div className="quiz-progress">
                <em>RESULT</em>
              </div>
            </div>

            <div className="quiz-body quiz-result">
              <span className="result-icon">{MOODS[mood].icon}</span>

              <span className="result-kicker">오늘 당신은</span>

              <h3 className="result-title">{MOODS[mood].title}</h3>

              <div className="result-ticket" ref={ticketRef}>
                <div>
                  <span className="info-label">MOOD</span>
                  <span className="info-value">{MOODS[mood].name}</span>
                </div>

                <div>
                  <span className="info-label">DESTINATION</span>
                  <span className="info-value">{MOODS[mood].destination}</span>
                </div>
              </div>

              <p className="result-copy">{MOODS[mood].copy}</p>

              <button className="result-cta" onClick={() => goToCourse(mood)}>
                <span>이 코스 보러가기</span>
                <span>→</span>
              </button>

              <button className="quiz-back" onClick={() => setAnswers([])}>
                ↺ 다시 해보기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
