import expoBridge from "../imports/photo/expo-bridge.jpg";
import ungnoMuseum from "../imports/photo/ungno-museum.jpg";
import tomiya from "../imports/proof/tomiya.jpg";
import heerak from "../imports/proof/heerak.jpg";
import toldAStory from "../imports/cafe/told-a-story.jpg";
import ssangri from "../imports/cafe/ssangri.jpeg";
import daedong from "../imports/_______.jpg";
import sikjangsan from "../imports/photo/sikjangsan-night.jpg";
import { PROOF } from "../copy/proof";
import { useCopy } from "../i18n";
import { PROOF_MARQUEE } from "../features";

/**
 * 문구는 copy/proof.ts. 여기 남는 건 사진과 수치다.
 * 별점·리뷰 수는 「daejeon_compact_proof_only.html」의 값을 그대로 옮긴 고정
 * 데이터이며 실시간 연동이 아니다. 수치가 바뀌면 여기서 고친다.
 */
type ReviewData = {
  photo: string;
  /** 사진 크롭을 따로 잡아야 하는 카드만 (.tomiya-photo / .heerak-photo) */
  photoClass?: string;
  stars: string;
  rating: string;
  count: string;
  user: string;
};

const GROUPS: { no: string; label: string; reviews: ReviewData[] }[] = [
  {
    no: "01",
    label: "PHOTO",
    reviews: [
      { photo: expoBridge, stars: "★★★★★", rating: "4.5", count: "1,282 reviews", user: "@H C" },
      { photo: ungnoMuseum, stars: "★★★★☆", rating: "4.3", count: "586 reviews", user: "@Leonar S" },
    ],
  },
  {
    no: "02",
    label: "EAT",
    reviews: [
      { photo: tomiya, photoClass: "tomiya-photo", stars: "★★★★★", rating: "4.5", count: "50 reviews", user: "@룡이보호자" },
      { photo: heerak, photoClass: "heerak-photo", stars: "★★★★★", rating: "4.5", count: "20 reviews", user: "@플레인리스" },
    ],
  },
  {
    no: "03",
    label: "CAFE",
    reviews: [
      { photo: toldAStory, stars: "★★★★★", rating: "5.0", count: "Polle review", user: "@fascinoya" },
      { photo: ssangri, stars: "★★★★☆", rating: "4.2", count: "23 reviews", user: "@dungeon" },
    ],
  },
  {
    no: "04",
    label: "COURSE",
    reviews: [
      { photo: daedong, stars: "★★★★☆", rating: "4.1", count: "1,544 reviews", user: "@안승현" },
      { photo: sikjangsan, stars: "★★★★★", rating: "4.6", count: "3,037 reviews", user: "@Mi M" },
    ],
  },
];

/** 4묶음을 한 줄로 펴둔 것. 흐르는 배치에서 쓴다. */
const FLAT = GROUPS.flatMap((group, gi) =>
  group.reviews.map((review, ri) => ({ review, gi, ri })),
);

type ReviewCopy = { alt: string; place: string; quote: string; source: string };

function ReviewCard({
  review,
  copy,
  eager,
}: {
  review: ReviewData;
  copy: ReviewCopy;
  /** 흐르는 배치에서는 화면 밖 카드도 미리 받아둔다. 흐르다 툭 나타나면 어색하다. */
  eager?: boolean;
}) {
  return (
    <article className="proof-card">
      <div className={review.photoClass ? `proof-photo ${review.photoClass}` : "proof-photo"}>
        <img
          src={review.photo}
          alt={copy.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>

      <div className="proof-body">
        <div className="proof-place">{copy.place}</div>

        <div className="proof-score">
          <span className="proof-stars">{review.stars}</span>
          <span className="proof-rating">{review.rating}</span>
          <span className="proof-count">{review.count}</span>
        </div>

        <div className="proof-user">{review.user}</div>

        <p className="proof-quote">{copy.quote}</p>

        <div className="proof-source">{copy.source}</div>
      </div>
    </article>
  );
}

/** 07 COMPACT PROOF */
export default function ProofSection() {
  const t = useCopy(PROOF);

  return (
    <section className="proof-section" id="proof">
      <div className="section-inner">
        <header className="proof-head">
          <div>
            <span className="proof-kicker">{t.kicker}</span>

            <h2>
              {t.headLine1}<br />
              <strong>{t.headStrong}</strong>
            </h2>
          </div>

          <p>
            {t.lead}
            {t.translatedNotice && (
              <>
                {" "}
                <span className="proof-translated">{t.translatedNotice}</span>
              </>
            )}
          </p>
        </header>

        {PROOF_MARQUEE ? (
          /* 한 줄로 흐르는 배치. 이음매가 안 보이도록 같은 8장을 두 벌 놓고
             절반만큼 밀어준다. 뒤쪽 한 벌은 눈속임이므로 읽기 도구에서 숨긴다. */
          <div className="proof-marquee">
            <div className="proof-marquee-track">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="proof-marquee-set"
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {FLAT.map(({ review, gi, ri }) => (
                    <ReviewCard
                      key={`${copy}-${gi}-${ri}`}
                      review={review}
                      copy={t.groups[gi].reviews[ri]}
                      eager
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="proof-groups">
            {GROUPS.map((group, gi) => {
              const g = t.groups[gi];

              return (
                <section key={group.no} className="proof-group">
                  <div className="proof-group-label">
                    <span>
                      {group.no} · {group.label}
                    </span>

                    <h3>
                      {g.title[0]}<br />
                      {g.title[1]}
                    </h3>
                  </div>

                  <div className="proof-row">
                    {group.reviews.map((review, ri) => (
                      <ReviewCard
                        key={`${gi}-${ri}`}
                        review={review}
                        copy={g.reviews[ri]}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <p className="proof-note">{t.note}</p>
      </div>
    </section>
  );
}
