import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ko" | "en";

/**
 * 섹션마다 이런 모양의 사전을 하나씩 둔다.
 * en 이 아직 없으면 ko 가 그대로 나온다 — 번역 중에도 페이지가 안 깨진다.
 */
export type Copy<T> = { ko: T; en?: T };

const STORAGE_KEY = "lang";

const TITLE: Record<Lang, string> = {
  ko: "기분이 이끄는 대로, 일단 대전행.",
  en: "Follow your mood. Just go to Daejeon.",
};

type LangValue = { lang: Lang; setLang: (next: Lang) => void };

const LangContext = createContext<LangValue>({ lang: "ko", setLang: () => {} });

/** 주소의 ?lang= 이 1순위, 그다음이 지난번 선택. 둘 다 없으면 한국어. */
function readInitialLang(): Lang {
  if (typeof window === "undefined") return "ko";

  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl === "en" || fromUrl === "ko") return fromUrl;

  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ko";
  } catch {
    // 시크릿 창이나 저장을 막아둔 브라우저
    return "ko";
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = TITLE[lang];

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // 저장 못 해도 이번 방문 동안은 동작한다
    }

    // 영문 페이지를 그대로 복사해 보낼 수 있게 주소에 남긴다.
    // pushState 가 아니라 replaceState — 뒤로가기가 언어 전환 기록으로 채워지면 곤란하다.
    const url = new URL(window.location.href);
    if (lang === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** 섹션에서 쓰는 것. 사전을 주면 지금 언어에 맞는 쪽을 돌려준다. */
export function useCopy<T>(dict: Copy<T>): T {
  const { lang } = useLang();
  return dict[lang] ?? dict.ko;
}
