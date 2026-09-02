import sojedong from "../imports/__________.jpg";
import gumo from "../imports/____.jpg";
import daedong from "../imports/_______.jpg";
import sikjangsan from "../imports/photo/sikjangsan-night.jpg";
import { COURSE } from "../copy/course";
import { COMMON } from "../copy/common";
import { useCopy } from "../i18n";

const PHOTOS = [sojedong, gumo, daedong, sikjangsan];

/** 06 COURSE DETAIL */
export default function CourseSection() {
  const t = useCopy(COURSE);
  const common = useCopy(COMMON);

  return (
    <section className="detail-section course-detail" id="course">
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

        <div className="course-timeline">
          {PHOTOS.map((photo, i) => {
            const stop = t.stops[i];

            return (
            <div key={stop.name} className="course-stop">
              <div className="stop-number">{String(i + 1).padStart(2, "0")}</div>

              <article className="stop-card">
                <div className="stop-photo photo-frame">
                  <img src={photo} alt={stop.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="stop-content">
                  <span className="stop-kicker">{stop.kicker}</span>

                  <h3>{stop.name}</h3>

                  <p>{stop.copy}</p>

                  {stop.dual && (
                    <div className="dual-place">
                      {stop.dual.map((place) => (
                        <span key={place}>{place}</span>
                      ))}
                    </div>
                  )}

                  <span className="stop-action">{stop.action}</span>
                </div>
              </article>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
