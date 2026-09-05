/**
 * 공유 · 링크 복사.
 *
 * 푸터와 기분 테스트 결과 화면이 같이 쓴다.
 * 모바일은 OS 공유 시트, PC 는 링크 복사로 갈린다.
 */

export type ShareOutcome = "shared" | "copied" | "cancelled" | "failed";

/**
 * Clipboard API 는 보안 컨텍스트가 아니거나 사용자 동작으로 인정받지 못하면 거부된다.
 * 그럴 때를 위해 예전 방식(execCommand)을 한 번 더 시도한다.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* 아래 방식으로 한 번 더 */
  }

  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  // 화면 밖에 두되 포커스는 잡히게 한다
  area.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
  document.body.appendChild(area);

  try {
    area.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    area.remove();
  }
}

/**
 * 공유용 주소.
 *
 * 영문으로 보고 있어도 내보내는 링크는 한글로 열리게 ?lang 을 뗀다.
 * 이 페이지는 한국어가 원본이라 처음 보는 사람은 한글부터 봐야 한다.
 * 영문 링크가 필요하면 주소창의 ?lang=en 을 직접 복사하면 된다.
 */
function shareUrl(): string {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete("lang");
    return url.toString();
  } catch {
    return window.location.href;
  }
}

/**
 * OS 공유 시트를 쓸 기기인지.
 *
 * 윈도우 크롬·엣지도 navigator.share 가 있어서 PC 에서도 시트가 떴는데,
 * 처음 본 사람은 대개 그냥 닫는다. 그러면 아무 일도 안 일어난 것처럼 보인다.
 * 손가락이 주 입력인 기기(휴대폰·태블릿)에서만 시트를 띄우고,
 * 마우스를 쓰는 PC 는 바로 링크를 복사한다.
 *
 * UA 문자열 대신 입력 방식으로 가른다. UA 는 사칭이 흔하고 기기가 바뀌면 틀린다.
 */
function prefersSystemShare(): boolean {
  try {
    return window.matchMedia("(pointer: coarse)").matches;
  } catch {
    return false;
  }
}

export async function share(data: { title: string; text: string }): Promise<ShareOutcome> {
  const url = shareUrl();

  if (navigator.share && prefersSystemShare()) {
    try {
      await navigator.share({ ...data, url });
      return "shared";
    } catch (error) {
      /*
       * 사용자가 공유 시트를 닫은 것만 「취소」다.
       *
       * 예전에는 모든 예외를 취소로 봤는데, 그러면 아래 경우에
       * 복사 대체 경로로 넘어가지 못하고 아무 일도 안 일어난 것처럼 끝났다.
       *   · 브라우저 정책으로 공유가 막힘 (NotAllowedError)
       *   · 공유할 대상 앱이 하나도 없음
       *   · 인앱 브라우저(카카오톡 등)에 share 가 껍데기만 있음
       */
      if ((error as { name?: string } | null)?.name === "AbortError") {
        return "cancelled";
      }
      // 진짜 실패다. 아래 복사로 넘어간다.
    }
  }

  return (await copyToClipboard(`${data.text}\n${url}`)) ? "copied" : "failed";
}
