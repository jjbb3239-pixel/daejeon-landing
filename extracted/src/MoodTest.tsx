import { useEffect, useRef, useState } from "react";
import { MOODS, QUESTIONS, resolveMood, type MoodId } from "./quiz";
import { share } from "./share";

type MoodTestProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * 「최종 수정본.html」의 기분 테스트 모달.
 * 화면은 새 디자인 그대로, 문항과 판정은 기존 퀴즈(4문항 × 2지선다)를 쓴다.
 */
export default function MoodTest({ open, onClose }: MoodTestProps) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [notice, setNotice] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  const step = answers.length;
  const done = step === QUESTIONS.length;
  const mood: MoodId | null = done ? resolveMood(answers) : null;

  // 열릴 때마다 처음부터. 닫는 동안 결과가 스쳐 보이지 않게 열림에 맞춰 초기화한다.
  useEffect(() => {
    if (open) {
      setAnswers([]);
      setNotice("");
    }
  }, [open]);

  // 공유 안내는 잠깐 띄웠다 지운다
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 2600);
    return () => clearTimeout(t);
  }, [notice]);

  // 열려 있는 동안 뒤 배경 스크롤을 막는다.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  // ESC 로 닫기 + 열릴 때 포커스를 모달 안으로
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function onShare(mood: MoodId) {
    const result = await share({
      title: "기분이 이끄는 대로, 일단 대전행.",
      text: `오늘 내 대전 여행 기분은 「${MOODS[mood].title}」. 당신은요?`,
    });
    if (result === "copied") setNotice("결과 링크가 복사됐어요");
    if (result === "failed") setNotice("복사가 막혀 있어요. 주소창의 링크를 직접 복사해 주세요");
  }

  function goToSection(target: string) {
    onClose();
    // 모달이 닫히고 body 스크롤 잠금이 풀린 뒤에 이동해야 실제로 스크롤된다.
    setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 250);
  }

  return (
    <div
      className={open ? "mood-modal is-open" : "mood-modal"}
      id="moodModal"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="mood-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="오늘의 기분 테스트"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="기분 테스트 닫기"
        >
          ×
        </button>

        <div className="test-progress">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={i <= step ? "progress-bar active" : "progress-bar"} />
          ))}
        </div>

        {QUESTIONS.map((question, i) => (
          <div key={i} className={i === step ? "test-step active" : "test-step"}>
            <span className="test-kicker">TODAY&apos;S MOOD TEST</span>

            <span className="question-number">
              QUESTION {String(i + 1).padStart(2, "0")}
            </span>

            <h2 className="question-title">{question.q}</h2>

            <p className="question-copy">{question.hint}</p>

            <div className="answer-grid">
              {question.choices.map((choice, c) => (
                <button
                  key={c}
                  type="button"
                  className="answer-button"
                  onClick={() => setAnswers([...answers, c])}
                >
                  <span className="answer-icon">{choice.icon}</span>
                  <span className="answer-title">{choice.label}</span>
                  <span className="answer-sub">{choice.sub}</span>
                </button>
              ))}
            </div>

            {i > 0 && (
              <button
                type="button"
                className="test-back"
                onClick={() => setAnswers(answers.slice(0, -1))}
              >
                ← 이전 질문
              </button>
            )}
          </div>
        ))}

        {mood && (
          <div className="result-screen active">
            <span className="result-label">MOOD CHECK COMPLETE ✓</span>

            <div className="result-emoji">{MOODS[mood].emoji}</div>

            <div className="result-small">TODAY&apos;S DAEJEON MOOD</div>

            <h2 className="result-title">{MOODS[mood].title}</h2>

            <p className="result-description">{MOODS[mood].description}</p>

            <div className="result-tags">
              {MOODS[mood].tags.map((tag) => (
                <span key={tag} className="result-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="result-card">
              <span className="result-card-title">TODAY&apos;S RECOMMENDATION</span>
              <strong>{MOODS[mood].recommendation}</strong>
            </div>

            <button
              type="button"
              className="result-go"
              onClick={() => goToSection(MOODS[mood].target)}
            >
              이 기분으로 대전 보기 →
            </button>

            <button type="button" className="result-share" onClick={() => onShare(mood)}>
              결과 공유하기
            </button>

            <button type="button" className="result-retry" onClick={() => setAnswers([])}>
              ↻ 다시 테스트하기
            </button>

            <p className="result-notice" role="status">
              {notice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
