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

export async function share(data: { title: string; text: string }): Promise<ShareOutcome> {
  const url = shareUrl();

  if (navigator.share) {
    try {
      await navigator.share({ ...data, url });
      return "shared";
    } catch {
      // 사용자가 취소한 경우가 대부분이라 조용히 끝낸다
      return "cancelled";
    }
  }

  return (await copyToClipboard(`${data.text}\n${url}`)) ? "copied" : "failed";
}
