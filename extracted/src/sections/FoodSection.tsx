import tomiya from "../imports/food/tomiya.jpg";
import trinite from "../imports/food/trinite.jpg";
import huirak from "../imports/food/huirak.jpg";
import { FOOD } from "../copy/food";
import { COMMON } from "../copy/common";
import { useCopy } from "../i18n";
import MapLink from "../MapLink";
import { FOOD_MAP_QUERIES } from "../maps";

const PHOTOS = [tomiya, trinite, huirak];

/** 04 FOOD DETAIL */
export default function FoodSection() {
  const t = useCopy(FOOD);
  const common = useCopy(COMMON);

  return (
    <section className="detail-section food-detail" id="food">
      <div className="section-inner">
        <a href="#choose" className="section-back">
          {common.back}
        </a>

        <br />

        <span className="detail-eyebrow">{t.eyebrow}</span>

        <h2 className="detail-title">
          {t.titleLead}<strong>{t.titleStrong}</strong><br />
          {t.titleLine2}
        </h2>

        <p className="detail-lead">
          {t.leadLine1}<br />
          <strong>{t.leadLine2}</strong>
        </p>

        <div className="restaurant-grid">
          {PHOTOS.map((photo, i) => {
            const place = t.restaurants[i];

            return (
            <article key={place.name} className="restaurant-card">
              <div className="restaurant-image photo-frame">
                <img src={photo} alt={place.alt}
                    loading="lazy"
                    decoding="async"
                  />

                <div className="restaurant-badge">
                  <span className="badge-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="badge-type">{place.type}</span>
                </div>
              </div>

              <div className="restaurant-body">
                <div className="card-heading-row">
                  <h3>{place.name}</h3>
                  <MapLink
                    label={common.map}
                    place={place.name}
                    query={FOOD_MAP_QUERIES[i]}
                    source="food"
                  />
                </div>

                <p>{place.copy}</p>

                <div className="food-meta">
                  <p>
                    <strong>{t.menuLabel}</strong>
                  </p>

                  <ul className="food-menu">
                    {place.menu.map(([name, price]) => (
                      <li key={name}>
                        <b>{name}</b>
                        <span>{price}</span>
                      </li>
                    ))}
                  </ul>

                  <p>
                    <strong>{t.addressLabel}</strong>
                    {place.address}
                  </p>

                  <p>
                    <strong>{t.walkLabel}</strong>
                    {place.walk}
                  </p>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
