import ssiPhoto from "../imports/kkumssi/photo.png";
import { MOOD_SELECT } from "../copy/moodSelect";
import { MOOD_LABEL } from "../copy/moods";
import { useCopy } from "../i18n";
import type { MoodId } from "../quiz";
import ssiFood from "../imports/kkumssi/food.png";
import ssiCafe from "../imports/kkumssi/cafe.png";
import ssiLazy from "../imports/kkumssi/lazy.png";

/** 문구는 copy/ 로 나갔다. 여기 남는 건 언어와 상관없는 것뿐이다. */
type Card = {
  id: MoodId;
  href: string;
  art: string;
  tone: string;
};

/**
 * 02 MOOD SELECT
 *
 * 카드 사진 자리에는 꿈씨패밀리를 섹션에 맞는 동작으로 올린다.
 * 공식 가이드에 있는 응용 동작만 쓴다 — 없는 포즈는 만들지 않는다.
 */
const CARDS: Card[] = [
  { id: "photo", href: "#photo", art: ssiPhoto, tone: "photo-blue" },
  { id: "food", href: "#food", art: ssiFood, tone: "photo-orange" },
  { id: "cafe", href: "#cafe", art: ssiCafe, tone: "photo-brown" },
  { id: "course", href: "#course", art: ssiLazy, tone: "photo-course" },
];

export default function MoodSelect() {
  const t = useCopy(MOOD_SELECT);
  const moodLabel = useCopy(MOOD_LABEL);

  return (
    <section className="mood-section" id="choose">
      <div className="section-inner">
        <header className="mood-heading">
          <span className="mood-kicker">{t.kicker}</span>

          <h2>
            {t.headLead}<strong>{t.headStrong}</strong>{t.headTail}<br />
            {t.headLine2}
          </h2>
        </header>

        <div className="mood-grid">
          {CARDS.map((card) => {
            const c = t.cards[card.id];

            return (
            <a key={card.href} href={card.href} className="mood-card">
              <div className={`card-photo photo-frame is-character ${card.tone}`}>
                <img src={card.art} alt={c.alt}
                    loading="lazy"
                    decoding="async"
                  />
              </div>

              <div className="card-body">
                <span className="card-category">{c.category}</span>

                <h3>
                  {c.title[0]}<br />
                  {c.title[1]}
                </h3>

                <p>{c.copy}</p>

                <div className="card-bottom">
                  <span>{moodLabel[card.id]}</span>
                  <span className="card-arrow">→</span>
                </div>
              </div>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
