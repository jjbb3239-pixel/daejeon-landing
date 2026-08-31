import ssiPhoto from "../imports/kkumssi/photo.png";
import ssiFood from "../imports/kkumssi/food.png";
import ssiCafe from "../imports/kkumssi/cafe.png";
import ssiLazy from "../imports/kkumssi/lazy.png";

type Card = {
  href: string;
  art: string;
  alt: string;
  tone: string;
  category: string;
  title: [string, string];
  copy: string;
  mood: string;
};

/**
 * 02 MOOD SELECT
 *
 * 카드 사진 자리에는 꿈씨패밀리를 섹션에 맞는 동작으로 올린다.
 * 공식 가이드에 있는 응용 동작만 쓴다 — 없는 포즈는 만들지 않는다.
 */
const CARDS: Card[] = [
  {
    href: "#photo",
    art: ssiPhoto,
    alt: "셀카봉을 들고 사진을 찍는 꿈누리",
    tone: "photo-blue",
    category: "PHOTO SPOT",
    title: ["오늘 피드 좀", "채워볼까?"],
    copy: "찍는 곳마다 그림 되는 대전의 인생샷 스팟들.",
    mood: "사진 왕창 찍고 싶은 날",
  },
  {
    href: "#food",
    art: ssiFood,
    alt: "빵 봉지를 안고 뛰어가는 온솔",
    tone: "photo-orange",
    category: "EAT",
    title: ["맛집", "도장깨기"],
    copy: "하나씩 찍어 먹다 보면 어느새 대전 맛집 투어 완성.",
    mood: "맛집 다 뿌수고 싶은 날",
  },
  {
    href: "#cafe",
    art: ssiCafe,
    alt: "화분을 들고 서 있는 안경 쓴 꿈씨패밀리",
    tone: "photo-brown",
    category: "CAFE",
    title: ["기분 따라", "고르는 카페"],
    copy: "오늘 무드에 딱 맞는 대전 카페를 골라볼까요?",
    mood: "느좋 카페 가고 싶은 날",
  },
  {
    href: "#course",
    art: ssiLazy,
    alt: "엎드려 누워 쉬고 있는 꿈동이",
    tone: "photo-course",
    category: "EASY COURSE",
    title: ["오늘은", "다 귀찮아"],
    copy: "맛집, 카페, 산책까지. 최소 고민 코스로 알아서 짜드려요.",
    mood: "아무 생각 하기 싫은 날",
  },
];

export default function MoodSelect() {
  return (
    <section className="mood-section" id="choose">
      <div className="section-inner">
        <header className="mood-heading">
          <span className="mood-kicker">TODAY&apos;S MOOD</span>

          <h2>
            오늘은 어떤 <strong>기분</strong>으로<br />
            대전을 돌아볼까요?
          </h2>
        </header>

        <div className="mood-grid">
          {CARDS.map((card) => (
            <a key={card.href} href={card.href} className="mood-card">
              <div className={`card-photo photo-frame is-character ${card.tone}`}>
                <img src={card.art} alt={card.alt}
                    loading="lazy"
                    decoding="async"
                  />
              </div>

              <div className="card-body">
                <span className="card-category">{card.category}</span>

                <h3>
                  {card.title[0]}<br />
                  {card.title[1]}
                </h3>

                <p>{card.copy}</p>

                <div className="card-bottom">
                  <span>{card.mood}</span>
                  <span className="card-arrow">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
