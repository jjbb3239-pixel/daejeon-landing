/** Google Maps URL은 API 키 없이 앱과 웹에서 같은 주소를 쓸 수 있다. */
export function googleMapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function googleMapsDirectionsUrl(stops: string[]) {
  const [origin, ...rest] = stops;
  const destination = rest.at(-1);
  const waypoints = rest.slice(0, -1);

  if (!origin || !destination) return "https://www.google.com/maps/dir/?api=1";

  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  });

  if (waypoints.length) params.set("waypoints", waypoints.join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export const PHOTO_MAP_QUERIES = [
  "엑스포다리 대전",
  "이응노미술관 대전",
  "엑스포과학공원 한빛탑",
  "대전근현대사전시관",
];

export const FOOD_MAP_QUERIES = [
  "토미야 대전 중구 대흥로529번길 18",
  "트리니트 비스트로 대전 유성구 계룡로123번길 45",
  "희락반점 대전 동구 대전로 829",
];

export const CAFE_MAP_QUERIES = [
  "궁동 소신 카페 대전",
  "톨드어스토리 갈마동 대전",
  "카페 쌍리 대흥동 대전",
];

export const COURSE_MAP_QUERIES = [
  "소제동 철도관사촌 대전",
  "구모카페 대전",
  "대동 하늘공원 대전",
  "식장산 해돋이 전망대 대전",
];


