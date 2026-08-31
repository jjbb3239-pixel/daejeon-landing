import tomiya from "../imports/food/tomiya.jpg";
import trinite from "../imports/food/trinite.jpg";
import huirak from "../imports/food/huirak.jpg";

type Restaurant = {
  photo: string;
  alt: string;
  type: string;
  name: string;
  copy: string;
  menu: [string, string][];
  address: string;
  walk: string;
};

/**
 * 새 HTML 의 메타 3줄은 「확인 후 입력」 상태였다.
 * 기존 페이지에 넣어둔 실제 메뉴와 주소로 채운다.
 */
const RESTAURANTS: Restaurant[] = [
  {
    photo: tomiya,
    alt: "토미야의 토리텐붓카케",
    type: "일식",
    name: "토미야",
    copy: "오늘은 깔끔한 일식이 당기는 날. 혼자 천천히 한 끼를 즐기고 싶을 때 체크해보세요.",
    menu: [
      ["토리텐붓카케", "13,000원"],
      ["니꾸우동", "11,000원"],
      ["붓카케우동", "8,500원"],
    ],
    address: "대전 중구 대흥로529번길 18",
    walk: "대전역 도보 10분",
  },
  {
    photo: trinite,
    alt: "트리니트 비스트로의 파스타",
    type: "양식",
    name: "트리니트 비스트로",
    copy: "음식뿐 아니라 분위기까지 챙기고 싶은 날. 오늘의 양식 한 끼 후보로 저장해두세요.",
    menu: [
      ["트러플 크림 뇨끼", "19,000원"],
      ["라구 파스타", "18,000원"],
      ["채끝 스테이크", "32,000원"],
    ],
    address: "대전 유성구 계룡로123번길 45",
    walk: "유성온천역 도보 5분",
  },
  {
    photo: huirak,
    alt: "희락반점의 유니짜장",
    type: "중식",
    name: "희락반점",
    copy: "든든한 중식 한 끼가 생각나는 날. 오늘 내 입맛이 중식을 가리킨다면 후보에 넣어보세요.",
    menu: [
      ["유니짜장", "8,000원"],
      ["탕수육", "20,000원"],
      ["짬뽕", "9,000원"],
    ],
    address: "대전 동구 대전로 829",
    walk: "대전역 도보 8분",
  },
];

/** 04 FOOD DETAIL */
export default function FoodSection() {
  return (
    <section className="detail-section food-detail" id="food">
      <div className="section-inner">
        <a href="#choose" className="section-back">
          ← 기분 다시 고르기
        </a>

        <br />

        <span className="detail-eyebrow">맛있는 거 다 뿌수고 싶은 기분이에요</span>

        <h2 className="detail-title">
          대전 <strong>맛집</strong><br />
          도장깨기
        </h2>

        <p className="detail-lead">
          혼밥 난이도는 낮게, 만족도는 높게.<br />
          <strong>혼자여도 제대로 즐길 수 있는 대전 맛집 3곳을 골랐어요.</strong>
        </p>

        <div className="restaurant-grid">
          {RESTAURANTS.map((place, i) => (
            <article key={place.name} className="restaurant-card">
              <div className="restaurant-image photo-frame">
                <img src={place.photo} alt={place.alt}
                    loading="lazy"
                    decoding="async"
                  />

                <div className="restaurant-badge">
                  <span className="badge-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="badge-type">{place.type}</span>
                </div>
              </div>

              <div className="restaurant-body">
                <h3>{place.name}</h3>

                <p>{place.copy}</p>

                <div className="food-meta">
                  <p>
                    <strong>추천 메뉴</strong>
                  </p>

                  <ul className="food-menu">
                    {place.menu.map(([name, price]) => (
                      <li key={name}>
                        <b>{name}</b>
                        <span>{price}</span>
                      </li>
                    ))}
                  </ul>

                  <p>
                    <strong>위치</strong>
                    {place.address}
                  </p>

                  <p>
                    <strong>가는 길</strong>
                    {place.walk}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
