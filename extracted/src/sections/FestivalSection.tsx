import yuseongYuon from "../imports/festival/yuseong-yuon.jpg";
import dongguDongrak from "../imports/festival/donggu-dongrak.jpg";
import contentFair from "../imports/festival/content-fair.jpg";
import breadFestival from "../imports/festival/bread-festival.jpg";

import { INSTAGRAM, isReady, notReadyProps } from "../links";
import { FESTIVAL } from "../copy/festival";
import { COMMON } from "../copy/common";
import { useCopy } from "../i18n";

/** 문구는 copy/festival.ts. 여기 남는 건 포스터·크롭 위치·바깥 링크뿐이다. */
type Card = {
  tone: string;
  posters: { src: string; position: string }[];
  /** 10월 추천 PICK 만 파란 글씨 */
  badgePick?: boolean;
  href?: string;
  routeHrefs?: [string, string];
};

const FESTIVALS: Card[] = [
  {
    tone: "festival-blue",
    posters: [{ src: yuseongYuon, position: "50% 0%" }],
    href: "https://yu-on.com/",
  },
  {
    tone: "festival-yellow",
    posters: [{ src: dongguDongrak, position: "50% 50%" }],
    href: "https://dgdr.kr/",
  },
  {
    tone: "festival-green",
    posters: [
      { src: contentFair, position: "50% 45%" },
      { src: breadFestival, position: "50% 20%" },
    ],
    badgePick: true,
    routeHrefs: [
      "https://dcfair.co.kr/",
      "https://www.instagram.com/bakery_festival_daejeon/",
    ],
  },
];

type RouteStopCopy = { title: string; when: string; linkText: string };

function RouteItem({ stop, href }: { stop: RouteStopCopy; href: string }) {
  return (
    <div className="festival-route-item">
      <strong>{stop.title}</strong>

      <span>{stop.when}</span>

      <a href={href} target="_blank" rel="noopener noreferrer">
        {stop.linkText}
      </a>
    </div>
  );
}

/** 07 WHAT'S ON IN DAEJEON */
export default function FestivalSection() {
  const t = useCopy(FESTIVAL);
  const common = useCopy(COMMON);

  return (
    <section className="festival-cph-section" id="festival">
      <div className="section-inner">
        <div className="festival-cph-top">
          <div className="festival-cph-heading">
            <span className="festival-cph-kicker">{t.kicker}</span>

            <h2>
              {t.headLead}
              <span className="festival-yellow-text">{t.headHighlight1}</span>
              {t.headMid}<br />
              {t.headLine2Lead}
              <span className="festival-yellow-text">{t.headHighlight2}</span>
              {t.headTail}
            </h2>

            <p>
              {t.leadLine1}<br />{" "}
              {t.leadLine2}
            </p>
          </div>
        </div>

        <div className="festival-cph-grid">
          {FESTIVALS.map((festival, fi) => {
            const c = t.cards[fi];

            return (
            <article
              key={c.label}
              className={`festival-cph-card ${festival.tone}`}
            >
              <div
                className={
                  festival.posters.length > 1
                    ? "festival-cph-visual is-split"
                    : "festival-cph-visual"
                }
              >
                <div
                  className={
                    festival.badgePick
                      ? "festival-month-badge month-pick"
                      : "festival-month-badge"
                  }
                >
                  {c.badge}
                </div>

                {festival.posters.map((poster, pi) => (
                  <img
                    key={poster.src}
                    src={poster.src}
                    alt={c.alts[pi]}
                    style={{ objectPosition: poster.position }}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

              <div className="festival-cph-body">
                <span className="festival-cph-label">{c.label}</span>

                <h3>
                  {c.title[0]}
                  {c.title[1] && (
                    <>
                      <br />
                      {c.title[1]}
                    </>
                  )}
                </h3>

                <div className="festival-cph-meta">
                  <span className="meta-date">{c.meta.date}</span>

                  <span className="meta-divider">·</span>

                  <span className="meta-location">{c.meta.place}</span>
                </div>

                <p className="festival-cph-description">
                  {c.description[0]}<br />
                  {c.description[1]}
                </p>

                {c.tags && (
                  <div className="festival-tags">
                    {c.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}

                {c.route && festival.routeHrefs && (
                  <div className="festival-route">
                    <RouteItem stop={c.route.from} href={festival.routeHrefs[0]} />

                    <div className="festival-route-arrow">{c.route.middle}</div>

                    <RouteItem stop={c.route.to} href={festival.routeHrefs[1]} />
                  </div>
                )}

                {c.linkText && festival.href && (
                  <a
                    href={festival.href}
                    className="festival-detail-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.linkText}
                  </a>
                )}
              </div>
            </article>
            );
          })}
        </div>

        <div className="festival-cph-bottom">
          <a
            className={isReady(INSTAGRAM) ? "festival-cph-button" : "festival-cph-button is-pending"}
            {...(isReady(INSTAGRAM)
              ? { href: INSTAGRAM, target: "_blank", rel: "noopener noreferrer" }
              : { ...notReadyProps, title: common.linkPending })}
          >
            <span>{t.bottomCta}</span>

            <span className="button-go">
              Instagram
              <span className="button-arrow" aria-hidden="true">↗</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
