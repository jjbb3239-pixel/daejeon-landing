import { useEffect, useState } from "react";
import kkumdori from "./imports/kkumdori.png";
import ssiPhoto from "./imports/kkumssi/photo.png";
import ssiFood from "./imports/kkumssi/food.png";
import ssiCafe from "./imports/kkumssi/cafe.png";
import ssiSolo from "./imports/kkumssi/solo.png";
import PhotoPage from "./PhotoPage";
import FoodPage from "./FoodPage";
import CafePage from "./CafePage";
import MoodCoursePage from "./MoodCoursePage";
import QuizModal from "./QuizModal";
import type { MoodId } from "./quiz";

export default function App() {
  const [view, setView] = useState<"home" | MoodId>("home");
  const [quizOpen, setQuizOpen] = useState(false);
  // 퀴즈 결과에서 넘어온 경우에만 코스 페이지를 애니메이션으로 들여보낸다
  const [entering, setEntering] = useState(false);

  // 등장 애니메이션이 끝나면 클래스를 뗀다.
  // 애니메이션이 어떤 이유로든 재생되지 못해도 페이지가 투명한 채로 남지 않게.
  useEffect(() => {
    if (!entering) return;
    const t = setTimeout(() => setEntering(false), 700);
    return () => clearTimeout(t);
  }, [entering]);

  function go(next: "home" | MoodId, animated = false) {
    setEntering(animated);
    setView(next);
    window.scrollTo(0, 0);
  }

  if (view !== "home") {
    const back = () => go("home");
    const Page = { photo: PhotoPage, food: FoodPage, cafe: CafePage, solo: MoodCoursePage }[view];

    return (
      <div className={entering ? "dj-page page-enter" : "dj-page"} translate="no">
        <Page onBack={back} />
      </div>
    );
  }

  return (
    <div className="dj-page" translate="no">
      {/* HERO — 전체전체.html 티켓 디자인 */}
      <section className="hero">
        <div className="ticket-wrap">
          <div className="ticket">
            <div className="ticket-main">
              <span className="ticket-label">★ 오늘의 대전행 티켓</span>

              <h1 className="hero-title">
                <strong>대전</strong>, 얼마나 재밌을지
                <br />
                감도 안 옴;;
              </h1>

              <p className="hero-copy">
                괜찮아요. 저희도 처음에는 성심당밖에 몰랐습니다.
                <br />
                <strong>그래서 직접 찾아봤어요.</strong>
              </p>

              <div className="route">
                <div>
                  <span className="route-label">FROM</span>
                  <div className="route-value">오늘 기분</div>
                </div>

                <div className="route-arrow">→</div>

                <div>
                  <span className="route-label">TO</span>
                  <div className="route-value">DAEJEON</div>
                </div>
              </div>

              <div className="train-doodle" />

              <div className="daejeon-stamp">
                <span>ARRIVED</span>
                <strong>DAEJEON</strong>
                <span>대 전 역</span>
                <span>SOLO TRIP</span>
              </div>

              {/* 꿈돌이는 회전·왜곡 없이 고정 (디자인 가이드라인) */}
              <div className="hero-kkumdori">
                <img src={kkumdori} alt="대전 마스코트 꿈돌이" />
              </div>
            </div>

            <aside className="ticket-stub">
              <div className="stub-top">
                <span className="stub-label">DESTINATION</span>

                <div className="destination">DAEJEON</div>

                <div className="ticket-info">
                  <div>
                    <span className="info-label">PASSENGER</span>
                    <span className="info-value">혼자</span>
                  </div>

                  <div>
                    <span className="info-label">PLAN</span>
                    <span className="info-value">미정</span>
                  </div>

                  <div>
                    <span className="info-label">MOOD</span>
                    <span className="info-value">오늘 기분대로</span>
                  </div>

                  <div>
                    <span className="info-label">DEPARTURE</span>
                    <span className="info-value">지금</span>
                  </div>
                </div>
              </div>

              {/* CTA 를 가리키는 클릭 유도 마크 */}
              <div className="click-mark" aria-hidden="true">
                <span className="click-cap">TAP HERE</span>
                <svg className="chev c1" viewBox="0 0 26 12"><polyline points="3,3 13,9 23,3" /></svg>
                <svg className="chev c2" viewBox="0 0 26 12"><polyline points="3,3 13,9 23,3" /></svg>
                <svg className="chev c3" viewBox="0 0 26 12"><polyline points="3,3 13,9 23,3" /></svg>
              </div>

              <button className="ticket-cta" onClick={() => setQuizOpen(true)}>
                <span>내 기분 따라 출발하기</span>
              </button>

              <div className="ticket-bottom">
                <div className="barcode" />

                <div className="ticket-number">
                  DAEJEON
                  <br />
                  SOLO TRIP
                  <br />
                  ONE WAY
                </div>
              </div>
            </aside>

            <div className="perforation" />
          </div>
        </div>
      </section>

      {/* CHOOSE */}
      <section id="choose">
        <div className="container">
          <h2>
            오늘의 기분을
            <br />
            골라주세요
          </h2>

          <div className="cards">
            {CARDS.map((card) => (
              <button key={card.id} className="card" onClick={() => go(card.id)}>
                <div className="card-figure">
                  <img src={card.art} alt={card.alt} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <span className="card-go">코스 보러가기 →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM CTA */}
      <section className="instagram">
        <div className="container">
          <h2>
            대전 이야기는
            <br />
            아직 좀 더 남았습니다.
          </h2>

          <p>
            홈페이지에 넣지 못한 장소와 저희가 직접 고른 대전 스팟은
            인스타그램에 계속 올려둘게요.
          </p>

          <a className="cta" href="https://instagram.com/" target="_blank" rel="noreferrer">
            꿈돌이 따라 인스타 구경가기 ↗
          </a>

          <p className="small">팔로우까지 하면 꿈돌이가 좋아합니다.</p>
        </div>
      </section>

      {quizOpen && (
        <QuizModal onClose={() => setQuizOpen(false)} onSelect={(id) => go(id, true)} />
      )}

      <footer>
        <p>Made with ☕ + 🍞 + 약간의 시행착오</p>
        <p className="small">대전을 잘 몰랐던 사람들이 대전을 소개합니다.</p>
      </footer>
    </div>
  );
}

/** #choose 섹션 카드 4개. 문구는 원본 그대로 두고 코스 페이지만 연결했다. */
const CARDS: { id: MoodId; art: string; alt: string; title: string; copy: string }[] = [
  {
    id: "photo",
    art: ssiPhoto,
    alt: "셀카봉을 든 꿈씨패밀리",
    title: "오늘 피드 좀 채워볼까?",
    copy: "찍는 곳마다 그림 되는 대전 인생샷 스팟들.",
  },
  {
    id: "food",
    art: ssiFood,
    alt: "빵 봉지를 안고 뛰는 꿈씨패밀리",
    title: "맛집 도장깨기",
    copy: "하나씩 찍어먹으며 도장 채우는 대전 느좋 블루리본 맛집 순례.",
  },
  {
    id: "cafe",
    art: ssiCafe,
    alt: "화분을 든 안경 쓴 꿈씨패밀리",
    title: "기분에 따라 고르는 카페",
    copy: "오늘 무드에 딱 맞는 대전 카페 추천.",
  },
  {
    id: "solo",
    art: ssiSolo,
    alt: "망원경으로 먼 곳을 보는 꿈씨패밀리",
    title: "혼자 감수성 터지는 날",
    copy: "혼자 걷고 사색하기 좋은 대전 감성 스팟.",
  },
];
