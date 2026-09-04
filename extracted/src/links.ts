/**
 * 외부 링크 한 곳에 모아둔다.
 *
 * 팀 인스타그램 주소가 정해지면 `INSTAGRAM` 만 채우면 된다.
 * 히어로·축제 상단·축제 하단·푸터 네 곳에 한 번에 반영된다.
 *
 * 비어 있는 동안에는 링크가 인스타그램 홈으로 잘못 가지 않도록
 * 눌리지 않는 상태로 그려진다. (`isReady` 로 판별)
 */
export const INSTAGRAM =
  "https://www.instagram.com/daejeon_mg?igsi=MTMxYXZjNHU1ZTdidQ%3D%3D&utm_source=qr";

export const isReady = (url: string) => url.trim().length > 0;

/** 링크가 준비되지 않았을 때 요소에 얹는 속성. 툴팁 문구는 copy/common.ts */
export const notReadyProps = {
  "aria-disabled": true as const,
  tabIndex: -1,
};
