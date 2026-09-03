import sojedong from "../imports/__________.jpg";
import gumo from "../imports/____.jpg";
import daedong from "../imports/_______.jpg";
import sikjangsan from "../imports/photo/sikjangsan-night.jpg";
import { COURSE } from "../copy/course";
import { COMMON } from "../copy/common";
import { useCopy } from "../i18n";
import { track } from "../analytics";
import {
  COURSE_MAP_QUERIES,
  googleMapsDirectionsUrl,
  googleMapsSearchUrl,
} from "../maps";

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

        <section className="course-map-panel" aria-labelledby="course-map-title">
          <div className="course-map-head">
            <div>
              <span>{t.mapEyebrow}</span>
              <h3 id="course-map-title">{t.mapTitle}</h3>
              <p>{t.mapLead}</p>
            </div>

            <a
              className="course-map-route"
              href={googleMapsDirectionsUrl(COURSE_MAP_QUERIES)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("map_open", { source: "course", place: "full_route" })}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 19V6.5A2.5 2.5 0 0 1 7.5 4h7A4.5 4.5 0 0 1 19 8.5V19" />
                <path d="m15 15 4 4 4-4M5 10h7m-3-3 3 3-3 3" />
              </svg>
              {t.mapRoute}
            </a>
          </div>

          <div className="course-map-canvas">
            <svg className="course-map-art" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true">
              <path className="map-river" d="M-20 315 C170 250 270 350 430 292 S730 205 1020 265" />
              <path className="map-road road-one" d="M-30 90 C220 145 350 45 520 105 S790 165 1030 75" />
              <path className="map-road road-two" d="M85 -20 C120 110 245 175 200 450" />
              <path className="map-road road-three" d="M590 -20 C535 100 645 180 610 450" />
              <path className="map-route-line" d="M170 210 C270 150 345 165 430 205 S610 218 690 242 S790 290 850 325" />
            </svg>

            {COURSE_MAP_QUERIES.map((query, i) => (
              <a
                key={query}
                className={`course-map-pin pin-${i + 1}`}
                href={googleMapsSearchUrl(query)}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.stops[i].name} · ${common.map}`}
                onClick={() => track("map_open", { source: "course", place: t.stops[i].name })}
              >
                <span className="pin-dot"><b>{i + 1}</b></span>
                <strong>{t.stops[i].name}</strong>
              </a>
            ))}
          </div>

          <p className="course-map-note">{t.mapNote}</p>
        </section>

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
