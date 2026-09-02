import { useEffect, useRef, useState } from "react";
import { MOODS, QUESTIONS, resolveMood, type MoodId } from "./quiz";
import { share } from "./share";
import { QUIZ } from "./copy/quiz";
import { useCopy } from "./i18n";

type MoodTestProps = {
  open: boolean;
  onClose: () => void;
  /** 결과에서 코스로 보낼 때. 접혀 있는 섹션을 펼치고 스크롤까지 처리한다. */
  onGoToMood: (id: MoodId) => void;
};

/**
 * 「최종 수정본.html」의 기분 테스트 모달.
 * 화면은 새 디자인 그대로, 문항과 판정은 기존 퀴즈(4문항 × 2지선다)를 쓴다.
 */
export default function MoodTest({ open, onClose, onGoToMood }: MoodTestProps) {
  const t = useCopy(QUIZ);
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
      title: t.shareTitle,
      text: t.shareText.replace("{mood}", t.moods[mood].title),
    });
    if (result === "copied") setNotice(t.copied);
    if (result === "failed") setNotice(t.copyFailed);
  }

  function goToSection(id: MoodId) {
    onClose();
    // 모달이 닫히고 body 스크롤 잠금이 풀린 뒤에 이동해야 실제로 스크롤된다.
    setTimeout(() => onGoToMood(id), 250);
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
        aria-label={t.dialogLabel}
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label={t.closeLabel}
        >
          ×
        </button>

        <div className="test-progress">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={i <= step ? "progress-bar active" : "progress-bar"} />
          ))}
        </div>

        {QUESTIONS.map((question, i) => {
          const q = t.questions[i];

          return (
          <div key={i} className={i === step ? "test-step active" : "test-step"}>
            <span className="test-kicker">{t.kicker}</span>

            <span className="question-number">
              {t.questionWord} {String(i + 1).padStart(2, "0")}
            </span>

            <h2 className="question-title">{q.q}</h2>

            <p className="question-copy">{q.hint}</p>

            <div className="answer-grid">
              {question.choices.map((choice, c) => (
                <button
                  key={c}
                  type="button"
                  className="answer-button"
                  onClick={() => setAnswers([...answers, c])}
                >
                  <span className="answer-icon">{choice.icon}</span>
                  <span className="answer-title">{q.choices[c].label}</span>
                  <span className="answer-sub">{q.choices[c].sub}</span>
                </button>
              ))}
            </div>

            {i > 0 && (
              <button
                type="button"
                className="test-back"
                onClick={() => setAnswers(answers.slice(0, -1))}
              >
                {t.back}
              </button>
            )}
          </div>
          );
        })}

        {mood && (
          <div className="result-screen active">
            <span className="result-label">{t.resultLabel}</span>

            <div className="result-emoji">{MOODS[mood].emoji}</div>

            <div className="result-small">{t.resultSmall}</div>

            <h2 className="result-title">{t.moods[mood].title}</h2>

            <p className="result-description">{t.moods[mood].description}</p>

            <div className="result-tags">
              {t.moods[mood].tags.map((tag) => (
                <span key={tag} className="result-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="result-card">
              <span className="result-card-title">{t.recommendationLabel}</span>
              <strong>{t.moods[mood].recommendation}</strong>
            </div>

            <button
              type="button"
              className="result-go"
              onClick={() => goToSection(mood)}
            >
              {t.go}
            </button>

            <button type="button" className="result-share" onClick={() => onShare(mood)}>
              {t.shareButton}
            </button>

            <button type="button" className="result-retry" onClick={() => setAnswers([])}>
              {t.retry}
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
