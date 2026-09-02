import { useLang, type Lang } from "./i18n";

const OPTIONS: { code: Lang; label: string; aria: string }[] = [
  { code: "ko", label: "KO", aria: "한국어로 보기" },
  { code: "en", label: "EN", aria: "View in English" },
];

/** 우측 상단 고정. 스크롤해도 따라온다. */
export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-toggle" role="group" aria-label="Language / 언어">
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          className={option.code === lang ? "is-active" : undefined}
          aria-pressed={option.code === lang}
          aria-label={option.aria}
          onClick={() => setLang(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
