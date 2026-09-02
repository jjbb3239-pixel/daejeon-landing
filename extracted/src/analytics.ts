/**
 * GA4 이벤트.
 *
 * 측정 ID 는 index.html 의 gtag 스니펫에 있다 (G-6Q0YJFLCC0).
 * 여기서는 이벤트만 보낸다.
 *
 * ★ 평가 지표
 *   GA4 → 관리 → 이벤트 에서 `mood_test_complete` 를 **전환으로 표시**한다.
 *   그러면 CVR = mood_test_complete / 세션 이 된다.
 *
 * 모든 이벤트에 현재 언어(`lang`)가 붙는다. 국내 유입과 영문 유입의
 * 전환율을 따로 볼 수 있어야 하기 때문이다.
 */
import { useEffect } from "react";

type Value = string | number | boolean;

declare global {
  interface Window {
    gtag?: (command: string, name: string, params?: Record<string, Value>) => void;
  }
}

/** 지금 보고 있는 언어. i18n 이 바뀔 때마다 갱신해준다. */
let currentLang = "ko";

export function setTrackedLang(lang: string) {
  currentLang = lang;
}

/**
 * gtag 이 없어도(차단기·오프라인) 페이지는 그대로 돌아가야 한다.
 * 그래서 옵셔널 호출만 하고 실패를 삼킨다.
 */
export function track(name: string, params: Record<string, Value> = {}) {
  try {
    window.gtag?.("event", name, { ...params, lang: currentLang });
  } catch {
    /* 측정 실패가 화면을 깨뜨리면 안 된다 */
  }
}

/**
 * 해당 id 의 요소가 화면에 처음 들어올 때 한 번만 보낸다.
 * 섹션 도달을 보조 전환으로 쓰기 위한 것.
 */
export function useViewOnce(elementId: string, event: string) {
  useEffect(() => {
    const el = document.getElementById(elementId);
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        track(event);
        io.disconnect();
      },
      /**
       * threshold 로 판단하면 안 된다 — 섹션이 뷰포트보다 길면 50% 가
       * 절대 안 채워져서 영원히 발화하지 않는다.
       * 대신 화면 가운데 절반을 관측창으로 좁힌다. 섹션 길이와 무관하게
       * "화면 중앙에 들어왔다"를 잡는다.
       */
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [elementId, event]);
}
