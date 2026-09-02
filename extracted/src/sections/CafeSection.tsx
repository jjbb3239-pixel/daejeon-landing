import sosin from "../imports/cafe/sosin.jpeg";
import toldAStory from "../imports/cafe/told-a-story.jpg";
import ssangri from "../imports/cafe/ssangri.jpeg";
import { CAFE } from "../copy/cafe";
import { COMMON } from "../copy/common";
import { useCopy } from "../i18n";

/** 문구는 copy/cafe.ts. 여기 남는 건 사진과 앵커 id 뿐이다. */
const CARDS = [
  { id: "sosin", photo: sosin },
  { id: "told", photo: toldAStory },
  { id: "ssangri", photo: ssangri },
];

const SHORTCUT_HREFS = ["#sosin", "#told", "#ssangri"];

/** 05 CAFE DETAIL */
export default function CafeSection() {
  const t = useCopy(CAFE);
  const common = useCopy(COMMON);

  return (
    <section className="detail-section cafe-detail" id="cafe">
      <div className="section-inner">
        <a href="#choose" className="section-back">
          {common.back}
        </a>

        <div className="cafe-top">
          <div>
            <span className="detail-eyebrow">{t.eyebrow}</span>

            <h2 className="detail-title">
              {t.titleLine1}<br />
              <strong>{t.titleStrong}</strong>
            </h2>

            <p className="detail-lead">
              {t.leadLine1}<br />
              <strong>{t.leadLine2}</strong>
            </p>
          </div>

          <aside className="cafe-test">
            <h3>{t.testTitle}</h3>

            {SHORTCUT_HREFS.map((href, i) => (
              <a key={href} href={href}>
                {t.shortcuts[i]}
              </a>
            ))}
          </aside>
        </div>

        <div className="cafe-grid">
          {CARDS.map((card, i) => {
            const cafe = t.cafes[i];

            return (
            <article key={card.id} className="cafe-card" id={card.id}>
              <div className="cafe-image photo-frame">
                <img src={card.photo} alt={cafe.alt}
                    loading="lazy"
                    decoding="async"
                  />
              </div>

              <div className="cafe-body">
                <span className="cafe-label">{cafe.label}</span>

                <h3>{cafe.name}</h3>

                <p className="cafe-headline">{cafe.headline}</p>

                <p className="cafe-copy">{cafe.copy}</p>

                <div className="cafe-point">
                  <strong>{t.moodLabel}</strong><br />
                  {cafe.mood}<br /><br />
                  <strong>POINT</strong><br />
                  {cafe.point}
                </div>

                <div className="cafe-mission">{cafe.mission}</div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
