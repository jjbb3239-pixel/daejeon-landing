import expoBridge from "../imports/photo/expo-bridge.jpg";
import ungnoMuseum from "../imports/photo/ungno-museum.jpg";
import tomiya from "../imports/proof/tomiya.jpg";
import heerak from "../imports/proof/heerak.jpg";
import toldAStory from "../imports/cafe/told-a-story.jpg";
import ssangri from "../imports/cafe/ssangri.jpeg";
import daedong from "../imports/_______.jpg";
import sikjangsan from "../imports/______.jpg";

type Review = {
  photo: string;
  alt: string;
  /** 사진 크롭을 따로 잡아야 하는 카드만 (.tomiya-photo / .heerak-photo) */
  photoClass?: string;
  place: string;
  stars: string;
  rating: string;
  count: string;
  user: string;
  quote: string;
  source: string;
};

type Group = {
  no: string;
  label: string;
  title: [string, string];
  reviews: [Review, Review];
};

/**
 * 별점·리뷰 수·인용문은 「daejeon_compact_proof_only.html」에 적혀 있던 값을
 * 그대로 옮긴 고정 데이터다. 실시간 연동이 아니므로 수치가 바뀌면 여기서 고친다.
 */
const GROUPS: Group[] = [
  {
    no: "01",
    label: "PHOTO",
    title: ["사진 왕창", "찍고 싶은 날"],
    reviews: [
      {
        photo: expoBridge,
        alt: "엑스포다리 방문 사진",
        place: "엑스포다리",
        stars: "★★★★★",
        rating: "4.5",
        count: "1,282 reviews",
        user: "@H C",
        quote: "“야경이 아름답고, 차가 다니지 않아 산책하기 좋아요.”",
        source: "Google review · via Wanderlog",
      },
      {
        photo: ungnoMuseum,
        alt: "이응노미술관 방문 사진",
        place: "이응노미술관",
        stars: "★★★★☆",
        rating: "4.3",
        count: "586 reviews",
        user: "@Leonar S",
        quote: "“미술관 건물이 예뻤어요. 그림도 괜찮고 공간 자체가 좋았어요.”",
        source: "Google review · via Wanderlog",
      },
    ],
  },
  {
    no: "02",
    label: "EAT",
    title: ["맛집 다", "뿌수고 싶은 날"],
    reviews: [
      {
        photo: tomiya,
        alt: "토미야 우동과 튀김 메뉴 사진",
        photoClass: "tomiya-photo",
        place: "토미야",
        stars: "★★★★★",
        rating: "4.5",
        count: "50 reviews",
        user: "@룡이보호자",
        quote: "“면발이 쫄깃하고 냉우동 육수와 튀김까지 정말 훌륭했어요.”",
        source: "DiningCode visitor review",
      },
      {
        photo: heerak,
        alt: "희락반점 짜장면과 탕수육이 함께 놓인 음식 사진",
        photoClass: "heerak-photo",
        place: "희락반점",
        stars: "★★★★★",
        rating: "4.5",
        count: "20 reviews",
        user: "@플레인리스",
        quote: "“유니짜장은 확실히 다르고, 탕수육도 쫄깃해서 맛있어요.”",
        source: "DiningCode visitor review",
      },
    ],
  },
  {
    no: "03",
    label: "CAFE",
    title: ["느좋 카페", "가고 싶은 날"],
    reviews: [
      {
        photo: toldAStory,
        alt: "톨드 어 스토리 카페 내부 분위기 사진",
        place: "톨드 어 스토리",
        stars: "★★★★★",
        rating: "5.0",
        count: "Polle review",
        user: "@fascinoya",
        quote: "“깔끔함의 극치. 대전에서 근본 있는 곳이라 불리는 이유를 알겠던 곳.”",
        source: "Polle visitor review",
      },
      {
        photo: ssangri,
        alt: "쌍리 갤러리형 카페 내부 사진",
        place: "쌍리",
        stars: "★★★★☆",
        rating: "4.2",
        count: "23 reviews",
        user: "@dungeon",
        quote: "“커피도 맛있고 공간과 인테리어가 너무 좋았어요. 가까우면 자주 갈 듯.”",
        source: "Polle visitor review",
      },
    ],
  },
  {
    no: "04",
    label: "COURSE",
    title: ["아무 생각", "하기 싫은 날"],
    reviews: [
      {
        photo: daedong,
        alt: "대동 하늘공원 방문 사진",
        place: "대동 하늘공원",
        stars: "★★★★☆",
        rating: "4.1",
        count: "1,544 reviews",
        user: "@안승현",
        quote: "“일몰 시간에 맞춰 오면 좋아요.”",
        source: "Google review · via Wanderlog",
      },
      {
        photo: sikjangsan,
        alt: "식장산 해돋이전망대 야경",
        place: "식장산 해돋이전망대",
        stars: "★★★★★",
        rating: "4.6",
        count: "3,037 reviews",
        user: "@Mi M",
        quote: "“주차도 무료고 올라가는 길도 재미있고, 야경이 정말 너무 예뻐요.”",
        source: "Google review · via Wanderlog",
      },
    ],
  },
];

/** 07 COMPACT PROOF */
export default function ProofSection() {
  return (
    <section className="proof-section" id="proof">
      <div className="section-inner">
        <header className="proof-head">
          <div>
            <span className="proof-kicker">REAL REVIEWS</span>

            <h2>
              대전, 우리만 좋다고<br />
              <strong>하는 거 아닙니다.</strong>
            </h2>
          </div>

          <p>
            앞에서 추천한 곳들, 실제로 다녀온 사람들은 어떻게 느꼈을까요? 긴 설명 대신 사진 한
            장과 솔직한 한 줄만 모았습니다.
          </p>
        </header>

        <div className="proof-groups">
          {GROUPS.map((group) => (
            <section key={group.no} className="proof-group">
              <div className="proof-group-label">
                <span>
                  {group.no} · {group.label}
                </span>

                <h3>
                  {group.title[0]}<br />
                  {group.title[1]}
                </h3>
              </div>

              <div className="proof-row">
                {group.reviews.map((review) => (
                  <article key={review.place} className="proof-card">
                    <div
                      className={
                        review.photoClass
                          ? `proof-photo ${review.photoClass}`
                          : "proof-photo"
                      }
                    >
                      <img src={review.photo} alt={review.alt}
                    loading="lazy"
                    decoding="async"
                  />
                    </div>

                    <div className="proof-body">
                      <div className="proof-place">{review.place}</div>

                      <div className="proof-score">
                        <span className="proof-stars">{review.stars}</span>
                        <span className="proof-rating">{review.rating}</span>
                        <span className="proof-count">{review.count}</span>
                      </div>

                      <div className="proof-user">{review.user}</div>

                      <p className="proof-quote">{review.quote}</p>

                      <div className="proof-source">{review.source}</div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="proof-note">
          * 별점·리뷰 수는 확인 가능한 공개 플랫폼의 현재 표시값을 사용했으며, 플랫폼별 집계
          기준은 서로 다를 수 있습니다.
        </p>
      </div>
    </section>
  );
}
