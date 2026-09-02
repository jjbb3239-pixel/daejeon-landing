import expoBridge from "../imports/photo/expo-bridge.jpg";
import ungnoMuseum from "../imports/photo/ungno-museum.jpg";
import hanbitTower from "../imports/photo/hanbit-tower.jpg";
import modernHistory from "../imports/photo/modern-history.jpg";
import { PHOTO } from "../copy/photo";
import { COMMON } from "../copy/common";
import { useCopy } from "../i18n";

const PHOTOS = [expoBridge, ungnoMuseum, hanbitTower, modernHistory];

/** 03 PHOTO DETAIL */
export default function PhotoSection() {
  const t = useCopy(PHOTO);
  const common = useCopy(COMMON);

  return (
    <section className="detail-section photo-detail" id="photo">
      <div className="section-inner">
        <a href="#choose" className="section-back">
          {common.back}
        </a>

        <br />

        <span className="detail-eyebrow">{t.eyebrow}</span>

        <h2 className="detail-title">
          {t.titleLine1}<br />
          <strong>{t.titleStrong}</strong>
        </h2>

        <p className="detail-lead">
          {t.leadLine1}<br />
          <strong>{t.leadLine2}</strong>
        </p>

        <div className="place-grid">
          {PHOTOS.map((photo, i) => {
            const place = t.places[i];

            return (
            <article key={place.name} className="place-card">
              <div className="place-image photo-frame">
                <img src={photo} alt={place.alt}
                    loading="lazy"
                    decoding="async"
                  />
                <span className="place-number">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="place-content">
                <span className="place-category">{place.category}</span>

                <h3>{place.name}</h3>

                <p className="place-subtitle">{place.subtitle}</p>

                <p className="place-description">{place.description}</p>

                <div className="photo-tip">
                  📸 <strong>{t.tipLabel}</strong><br />
                  {place.tip}
                </div>
              </div>
            </article>
            );
          })}
        </div>

        <section className="photo-mission">
          <h3>{t.missionTitle}</h3>

          <div className="mission-grid">
            {t.missions.map((mission) => (
              <div key={mission} className="mission">
                □ {mission}
              </div>
            ))}
          </div>

          <div className="mission-finish">{t.missionFinish}</div>
        </section>
      </div>
    </section>
  );
}
