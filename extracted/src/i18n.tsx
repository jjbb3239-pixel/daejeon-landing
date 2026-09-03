import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { setTrackedLang, track } from "./analytics";

export type Lang = "ko" | "en";

/**
 * 섹션마다 이런 모양의 사전을 하나씩 둔다.
 * en 이 아직 없으면 ko 가 그대로 나온다 — 번역 중에도 페이지가 안 깨진다.
 */
export type Copy<T> = { ko: T; en?: T };

const STORAGE_KEY = "lang";

/**
 * 예전에는 localStorage 에 저장했다. 그러면 EN 을 한 번 누른 사람은
 * 그 브라우저에서 계속 영문을 보게 되고, 주소창에 붙은 ?lang=en 을
 * 복사해 공유하면 받는 사람까지 영문으로 열렸다.
 *
 * 이 페이지는 한국어가 원본이고 영문은 외국인 방문자를 위한 보조다.
 * 그래서 기억은 「지금 열어둔 탭」 안에서만 한다.
 * 탭을 새로 열면 언제나 한글로 시작한다.
 */

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
    return window.sessionStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ko";
  } catch {
    // 시크릿 창이나 저장을 막아둔 브라우저
    return "ko";
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    setTrackedLang(lang);
    document.documentElement.lang = lang;
    document.title = TITLE[lang];

    try {
      window.sessionStorage.setItem(STORAGE_KEY, lang);
      // 예전 방식으로 저장돼 계속 영문이 뜨던 사람을 풀어준다
      window.localStorage.removeItem(STORAGE_KEY);
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

  const setLang = useCallback((next: Lang) => {
    // 버튼을 눌러 바꾼 것만 남긴다. 첫 진입은 setTrackedLang 이 처리한다.
    track("lang_switch", { to: next });
    setLangState(next);
  }, []);
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
