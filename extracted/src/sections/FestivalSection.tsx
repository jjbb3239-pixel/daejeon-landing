type Festival = {
  href: string;
  /** 사진이 준비되면 여기에 import 한 이미지를 넣는다. 넣기 전까지는 이모지로 대신한다. */
  photo?: string;
  alt: string;
  placeholder: string;
  month: string;
  label: string;
  name: string;
  hook: string;
  date: string;
  place: string;
  tags: string[];
  button: string;
  buttonTone?: string;
};

const FESTIVALS: Festival[] = [
  {
    href: "https://dcfair.co.kr/",
    alt: "대전콘텐츠페어",
    placeholder: "🎮",
    month: "OCT",
    label: "CHARACTER · GAME · CONTENT",
    name: "대전콘텐츠페어",
    hook: "캐릭터·일러스트·게임 등 다양한 콘텐츠를 한자리에서 만나는 전시회.",
    date: "2026.10.16(금) — 10.18(일)",
    place: "대전컨벤션센터(DCC) 제2전시장",
    tags: ["#꿈씨패밀리", "#굿즈", "#게임", "#코스프레"],
    button: "공식 사이트 둘러보기 →",
  },
  {
    href: "https://www.instagram.com/bakery_festival_daejeon/",
    alt: "2026 대전빵축제",
    placeholder: "🍞",
    month: "OCT",
    label: "BREAD · LOCAL BAKERY",
    name: "2026 대전빵축제",
    hook: "성심당만 알고 있었다면, 이번엔 대전의 로컬 베이커리를 더 넓게 만나볼 차례.",
    date: "2026.10.17(토) — 10.18(일)",
    place: "엑스포과학공원 한빛탑 일원",
    tags: ["#대전빵축제", "#로컬베이커리", "#빵지순례", "#한빛탑"],
    button: "공식 인스타그램 보기 →",
    buttonTone: "yellow-button",
  },
  {
    href: "https://dgdr.kr/",
    alt: "동구동락 축제",
    placeholder: "🎪",
    month: "OCT",
    label: "MUSIC · LOCAL · NIGHT",
    name: "동구동락 축제",
    hook: "선선한 가을밤, 대전 원도심에서 공연과 축제를 즐기고 싶다면.",
    date: "10.9(금) — 10.11(일)",
    place: "소제동 동광장로 · 대동천 일원",
    tags: ["#소제동", "#공연", "#원도심", "#가을축제"],
    button: "축제 사이트 둘러보기 →",
    buttonTone: "green-button",
  },
];

/** 07 FESTIVAL */
export default function FestivalSection() {
  return (
    <section className="festival-section" id="festival">
      <div className="section-inner">
        <header className="festival-top">
          <span className="festival-kicker">WHAT&apos;S ON IN DAEJEON</span>

          <h2>
            대전이 아직도 <span className="yellow">NO잼</span> 같다면,<br />
            지금 열리는 <span className="yellow">행사</span>를 아직 못 본 거예요.
          </h2>

          <p>
            캐릭터부터 게임, 빵, 공연까지.<br />
            여행 날짜와 딱 맞는 행사를 발견했다면{" "}
            <strong>그날의 대전 여행 코스는 이미 절반 완성.</strong>
          </p>
        </header>

        <div className="festival-route">
          <div className="festival-route-label">🐱 10월에 혼자 대전 간다면?</div>

          <h3>
            귀여움 챙기고,<br />
            빵으로 든든하게 마무리하기.
          </h3>

          <p>콘텐츠와 굿즈를 즐기고, 물빛광장을 산책한 뒤 빵으로 하루를 마무리해보세요.</p>

          <div className="festival-route-flow">
            <div className="route-chip">
              🎮
              <strong>대전콘텐츠페어</strong>
              <span>2~3시간</span>
            </div>

            <span className="route-arrow">→</span>

            <div className="route-chip">
              🌊
              <strong>물빛광장</strong>
              <span>산책 20~30분</span>
            </div>

            <span className="route-arrow">→</span>

            <div className="route-chip">
              🍞
              <strong>대전빵축제</strong>
              <span>맛있는 마무리</span>
            </div>
          </div>
        </div>

        <div className="festival-grid">
          {FESTIVALS.map((festival) => (
            <article key={festival.name} className="festival-card">
              <a
                href={festival.href}
                target="_blank"
                rel="noopener noreferrer"
                className={festival.photo ? "festival-image" : "festival-image is-empty"}
              >
                {festival.photo ? (
                  <img src={festival.photo} alt={festival.alt} />
                ) : (
                  <span aria-hidden="true">{festival.placeholder}</span>
                )}

                <span className="festival-month">{festival.month}</span>
              </a>

              <div className="festival-body">
                <span className="festival-label">{festival.label}</span>

                <h3>{festival.name}</h3>

                <p className="festival-hook">{festival.hook}</p>

                <div className="festival-info">
                  <div>
                    <span>DATE</span>
                    <strong>{festival.date}</strong>
                  </div>

                  <div>
                    <span>PLACE</span>
                    <strong>{festival.place}</strong>
                  </div>
                </div>

                <div className="festival-tags">
                  {festival.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <a
                  href={festival.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    festival.buttonTone
                      ? `festival-detail-button ${festival.buttonTone}`
                      : "festival-detail-button"
                  }
                >
                  {festival.button}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="festival-more-event">
          <div className="more-event-icon">✦</div>

          <div className="more-event-copy">
            <span>AND MORE · YUSEONG</span>

            <h3>유성온날(YUON)</h3>

            <p>
              2026.08.14부터 12월까지.<br />
              유성에서 이어지는 행사도 체크해보세요.
            </p>
          </div>

          <div className="more-event-date">
            <small>2026</small>
            <strong>08.14 — 12월</strong>
          </div>
        </div>

        <div className="instagram-box">
          <h3>👀 또 다른 대전 행사가 궁금하다면?</h3>

          <p>
            축제부터 전시, 팝업, 주말 행사까지.<br />
            여행 오기 전 인스타그램에서 <strong>지금 대전에서 뭐 하는지</strong> 확인해보세요.
          </p>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
          >
            📱 인스타그램 둘러보기 →
          </a>
        </div>
      </div>
    </section>
  );
}
