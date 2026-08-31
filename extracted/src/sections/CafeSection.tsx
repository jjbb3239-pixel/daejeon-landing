import sosin from "../imports/cafe/sosin.jpeg";
import toldAStory from "../imports/cafe/told-a-story.jpg";
import ssangri from "../imports/cafe/ssangri.jpeg";

type Cafe = {
  id: string;
  photo: string;
  alt: string;
  label: string;
  name: string;
  headline: string;
  copy: string;
  mood: string;
  point: string;
  mission: string;
};

/** 카드 본문은 기존 카페 페이지의 설명을 그대로 쓴다. */
const CAFES: Cafe[] = [
  {
    id: "sosin",
    photo: sosin,
    alt: "궁동 소신의 꿈돌이 얼굴 케이크",
    label: "ONLY DAEJEON",
    name: "궁동 소신",
    headline: "꿈돌이 보러 갈래? 👽💛",
    copy: "대전의 상징이라고 할 수 있는 귀여운 캐릭터 꿈돌이. 너무 유명하고 붐비는 곳보다 조금 여유롭게 대전다운 귀여움을 만나고 싶은 혼자 여행자에게 궁동의 ‘소신’을 추천합니다.",
    mood: "대전에서만 할 수 있는 것을 찾아보고 싶은 날",
    point: "꿈돌이 · 대전 로컬 감성",
    mission: "📸 오늘의 미션 : 꿈돌이와 인증샷 남기기",
  },
  {
    id: "told",
    photo: toldAStory,
    alt: "갈마동 톨드어스토리 카페 외관",
    label: "COFFEE LOVER",
    name: "갈마동 톨드어스토리",
    headline: "커피 맛에 푹 빠지고 싶을 때 ☕",
    copy: "제공한 자료에 따르면 외관 창문에 블루리본 스티커가 10개 붙어 있는 곳. 2005년부터 시작해 2021년 갈마동으로 이전한 뒤에도 발길이 이어지고 있는 공간입니다.",
    mood: "오늘만큼은 커피 맛 자체에 집중하고 싶은 날",
    point: "커피 · 오랜 시간 이어온 공간",
    mission: "☕ 오늘의 미션 : 평소 안 마셔본 커피 한 잔 골라보기",
  },
  {
    id: "ssangri",
    photo: ssangri,
    alt: "대흥동 쌍리 카페 2층 갤러리 공간",
    label: "READ & WORK",
    name: "대흥동 쌍리",
    headline: "책 한 권 들고 가고 싶은 카페 📖",
    copy: "‘쌍리’라는 이름은 두 마리의 잉어를 뜻하고, 고전 문학에서는 멀리서 온 반가운 편지를 의미한다고 합니다. 2008년부터 한 자리를 지켜온 카페로, 1층은 레트로한 분위기, 2층은 밝고 모던한 갤러리 공간으로 소개되어 있습니다.",
    mood: "혼자라면 2층 갤러리형 공간에 자리를 잡고 책을 읽거나 작업하며 천천히 머물러보세요.",
    point: "핸드드립 · 갤러리 · 작업 · 독서",
    mission: "📖 오늘의 미션 : 휴대폰 내려놓고 20분 집중하기",
  },
];

const SHORTCUTS = [
  ["#sosin", "👽 대전에서만 할 수 있는 것 → 소신"],
  ["#told", "☕ 진짜 맛있는 커피 한 잔 → 톨드어스토리"],
  ["#ssangri", "📖 아무도 방해하지 않는 시간 → 쌍리"],
];

/** 05 CAFE DETAIL */
export default function CafeSection() {
  return (
    <section className="detail-section cafe-detail" id="cafe">
      <div className="section-inner">
        <a href="#choose" className="section-back">
          ← 기분 다시 고르기
        </a>

        <div className="cafe-top">
          <div>
            <span className="detail-eyebrow">☕ 느좋 카페 가고 싶은 기분이에요</span>

            <h2 className="detail-title">
              오늘은 어떤<br />
              <strong>카페 무드?</strong>
            </h2>

            <p className="detail-lead">
              같은 커피 한 잔이어도 오늘 원하는 시간은 조금씩 다르니까.<br />
              <strong>지금 하고 싶은 걸 골라 대전 카페로 가볼까요?</strong>
            </p>
          </div>

          <aside className="cafe-test">
            <h3>TODAY&apos;S CAFE MOOD</h3>

            {SHORTCUTS.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </aside>
        </div>

        <div className="cafe-grid">
          {CAFES.map((cafe) => (
            <article key={cafe.id} className="cafe-card" id={cafe.id}>
              <div className="cafe-image photo-frame">
                <img src={cafe.photo} alt={cafe.alt}
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
                  <strong>추천 기분</strong><br />
                  {cafe.mood}<br /><br />
                  <strong>POINT</strong><br />
                  {cafe.point}
                </div>

                <div className="cafe-mission">{cafe.mission}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
