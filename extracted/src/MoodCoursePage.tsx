import gumoPhoto from "./imports/____.jpg";
import daedongPhoto from "./imports/_______.jpg";
import sojedongPhoto from "./imports/__________.jpg";
import sikjangsanPhoto from "./imports/______.jpg";

type MoodCoursePageProps = {
  onBack: () => void;
};

const places = [
  {
    step: "STOP 01",
    emoji: "🚉",
    name: "소제동 철도관사촌",
    sub: "낡은 골목에서 시작하는 하루",
    photo: sojedongPhoto,
    alt: "오래된 관사와 전봇대가 늘어선 소제동 골목",
    copy: [
      "오래된 철도 관사들이 카페와 작업실로 바뀐 골목.",
      "천천히 걷다 보면 혼자여서 더 좋은 순간이 옵니다.",
    ],
    mission: "미션 : 마음에 드는 대문 하나 찍기",
  },
  {
    step: "STOP 02",
    emoji: "📖",
    name: "구모카페 · 구름책방",
    sub: "커피 한 잔이면 충분한 오후",
    photo: gumoPhoto,
    alt: "저녁 불빛이 켜진 구모카페와 책방 외관",
    copy: [
      "책장 사이에 앉아 아무 책이나 펼치기 좋은 곳.",
      "굳이 다 읽지 않아도, 그냥 있어도 되는 시간.",
    ],
    mission: "미션 : 오늘의 문장 한 줄 옮겨 적기",
  },
  {
    step: "STOP 03",
    emoji: "🌇",
    name: "대동 하늘공원",
    sub: "노을이 도시를 물들일 때",
    photo: daedongPhoto,
    alt: "풍차 너머로 노을 지는 대전 시내 전망",
    copy: [
      "골목을 따라 올라가면 대전 시내가 한눈에 펼쳐집니다.",
      "노을 지는 하늘 아래, 하루를 천천히 정리하기 좋아요.",
    ],
    mission: "미션 : 해 지는 방향으로 사진 한 장",
  },
  {
    step: "STOP 04",
    emoji: "🌄",
    name: "식장산 해돋이전망대",
    sub: "하루의 끝에서 내일을 보기",
    photo: sikjangsanPhoto,
    alt: "구름 위로 해가 떠오르는 식장산 정상 전망대",
    copy: [
      "대전에서 가장 높은 곳에서 도시의 불빛을 내려다보는 마무리.",
      "감성 터지는 날의 엔딩으로 이만한 곳이 없습니다.",
    ],
    mission: "미션 : 야경 보며 혼잣말 한마디 남기기",
  },
];

export default function MoodCoursePage({ onBack }: MoodCoursePageProps) {
  return (
    <section className="mood">
      <div className="container">
        <button className="section-back" onClick={onBack}>
          ←
          <span>기분 다시 고르기</span>
        </button>

        <div className="mood-hero">
          <div className="eyebrow">🌌 혼자 감수성 터지는 날</div>

          <h1>
            혼자여서
            <br />
            더 좋은 대전 코스
          </h1>

          <p className="mood-lead">
            말 안 해도 되는 하루가 필요할 때. 오래된 골목에서 시작해 노을과
            야경으로 마무리하는, 혼자 걷기 좋은 대전 감성 순례입니다.
          </p>

          <div className="note">순서대로 따라가면 하루가 딱 맞게 흘러갑니다.</div>
        </div>

        {places.map((place, i) => (
          <div key={place.name}>
            <div className="mood-place">
              <img className="mood-photo" src={place.photo} alt={place.alt} />

              <div className="mood-body">
                <div className="mood-step">{place.step}</div>

                <h2>
                  {place.emoji} {place.name}
                </h2>

                <h3>{place.sub}</h3>

                {place.copy.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}

                <span className="mission">{place.mission}</span>
              </div>
            </div>

            {i < places.length - 1 && <div className="mood-arrow">↓</div>}
          </div>
        ))}

        <div className="mood-hero" style={{ marginTop: 60 }}>
          <h2>
            오늘은
            <br />
            혼자여도 괜찮은 날.
          </h2>

          <button className="section-back section-back-bottom" onClick={onBack}>
            ←
            <span>기분 다시 고르기</span>
          </button>
        </div>
      </div>
    </section>
  );
}
