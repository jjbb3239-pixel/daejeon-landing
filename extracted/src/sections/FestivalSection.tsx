type MetaLine = { date: string; place: string };

type RouteStop = {
  title: string;
  when: string;
  href: string;
  linkText: string;
};

type Festival = {
  tone: string;
  emoji: string;
  badge: string;
  /** 10월 추천 PICK 만 파란 글씨 */
  badgePick?: boolean;
  label: string;
  title: [string] | [string, string];
  meta: MetaLine;
  description: [string, string];
  tags?: string[];
  link?: { href: string; text: string };
  /** 카드 안에 코스가 들어가는 경우 (콘텐츠페어 → 물빛광장 → 빵축제) */
  route?: { from: RouteStop; middle: string; to: RouteStop };
};

const FESTIVALS: Festival[] = [
  {
    tone: "festival-blue",
    emoji: "✨",
    badge: "8–12월",
    label: "YUSEONG EVENT",
    title: ["유성온날 YUON"],
    meta: { date: "2026.08.14 —", place: "유성구" },
    description: [
      "8월 14일부터 시작되는 유성온날(YUON).",
      "자세한 행사 내용은 정리 페이지에서 확인해보세요.",
    ],
    link: {
      href: "https://app.notion.com/p/YUON-2026-08-14-3ccf917d03de80599f90d9004e25ce93?pvs=21",
      text: "자세히 보기 ↗",
    },
  },
  {
    tone: "festival-yellow",
    emoji: "🎤",
    badge: "10월",
    label: "CITY FESTIVAL",
    title: ["동구동락 축제"],
    meta: { date: "10.09 — 10.11", place: "소제동 · 대동천 일원" },
    description: ["선선한 가을, 공연과 체험을 즐기며", "대전 원도심을 천천히 걸어보세요."],
    tags: ["공연", "체험", "원도심", "상권 연계"],
    link: { href: "https://dgdr.kr/", text: "축제 자세히 보기 ↗" },
  },
  {
    tone: "festival-green",
    emoji: "🐱🍞",
    badge: "10월 추천 PICK",
    badgePick: true,
    label: "OCTOBER PICK",
    title: ["귀여움 챙기고,", "빵으로 마무리"],
    meta: { date: "2026.10.16 — 10.18", place: "DCC → 한빛탑 일원" },
    description: [
      "캐릭터·게임·굿즈로 놀고, 물빛광장을 산책한 뒤",
      "대전 빵축제로 마무리하는 10월 코스.",
    ],
    route: {
      from: {
        title: "🎰 대전콘텐츠페어",
        when: "10.16 — 10.18 · DCC 제2전시장",
        href: "https://dcfair.co.kr/",
        linkText: "공식 사이트 ↗",
      },
      middle: "↓ 물빛광장 산책 20~30분",
      to: {
        title: "🍞 2026 대전빵축제",
        when: "10.17 — 10.18 · 한빛탑 일원",
        href: "https://www.instagram.com/bakery_festival_daejeon/",
        linkText: "공식 인스타그램 ↗",
      },
    },
  },
];

function RouteItem({ stop }: { stop: RouteStop }) {
  return (
    <div className="festival-route-item">
      <strong>{stop.title}</strong>

      <span>{stop.when}</span>

      <a href={stop.href} target="_blank" rel="noopener noreferrer">
        {stop.linkText}
      </a>
    </div>
  );
}

/** 07 WHAT'S ON IN DAEJEON */
export default function FestivalSection() {
  return (
    <section className="festival-cph-section" id="festival">
      <div className="section-inner">
        <div className="festival-cph-top">
          <div className="festival-cph-heading">
            <span className="festival-cph-kicker">WHAT&apos;S ON IN DAEJEON</span>

            <h2>
              대전이 아직도 <span className="festival-yellow-text">NO잼</span> 같다면,<br />
              지금 열리는 <span className="festival-yellow-text">행사</span>를 아직 못 본
              거예요.
            </h2>

            <p>
              계획에 없던 축제나 행사를 만나는 것도 여행의 재미니까.<br />{" "}
              지금 대전에서 열리는 행사를 가볍게 둘러보세요.
            </p>
          </div>

          <a
            href="https://www.instagram.com/"
            className="festival-all-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            ALL EVENTS
            <span>↗</span>
          </a>
        </div>

        <div className="festival-cph-grid">
          {FESTIVALS.map((festival) => (
            <article
              key={festival.label}
              className={`festival-cph-card ${festival.tone}`}
            >
              <div className="festival-cph-visual">
                <div
                  className={
                    festival.badgePick
                      ? "festival-month-badge month-pick"
                      : "festival-month-badge"
                  }
                >
                  {festival.badge}
                </div>

                <span>{festival.emoji}</span>
              </div>

              <div className="festival-cph-body">
                <span className="festival-cph-label">{festival.label}</span>

                <h3>
                  {festival.title[0]}
                  {festival.title[1] && (
                    <>
                      <br />
                      {festival.title[1]}
                    </>
                  )}
                </h3>

                <div className="festival-cph-meta">
                  <span className="meta-date">{festival.meta.date}</span>

                  <span className="meta-divider">·</span>

                  <span className="meta-location">{festival.meta.place}</span>
                </div>

                <p className="festival-cph-description">
                  {festival.description[0]}<br />
                  {festival.description[1]}
                </p>

                {festival.tags && (
                  <div className="festival-tags">
                    {festival.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}

                {festival.route && (
                  <div className="festival-route">
                    <RouteItem stop={festival.route.from} />

                    <div className="festival-route-arrow">{festival.route.middle}</div>

                    <RouteItem stop={festival.route.to} />
                  </div>
                )}

                {festival.link && (
                  <a
                    href={festival.link.href}
                    className="festival-detail-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {festival.link.text}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="festival-cph-bottom">
          <a
            href="https://www.instagram.com/"
            className="festival-cph-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>또 다른 대전 행사 보러가기</span>

            <span>Instagram ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
