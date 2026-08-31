import sojedong from "../imports/__________.jpg";
import gumo from "../imports/____.jpg";
import daedong from "../imports/_______.jpg";
import sikjangsan from "../imports/______.jpg";

type Stop = {
  photo: string;
  alt: string;
  kicker: string;
  name: string;
  copy: string;
  dual?: string[];
  action: string;
};

const STOPS: Stop[] = [
  {
    photo: sojedong,
    alt: "오래된 관사와 전봇대가 늘어선 소제동 골목",
    kicker: "START · OLD TOWN",
    name: "소제동 철도관사촌",
    copy: "오래된 대전에서 하루 시작. 처음부터 바쁘게 움직일 필요는 없어요. 소제동의 골목을 천천히 걸으며 오늘 여행을 시작해보세요.",
    action: "📸 마음에 드는 골목 하나 찍어두기",
  },
  {
    photo: gumo,
    alt: "저녁 불빛이 켜진 구모카페와 책방 외관",
    kicker: "COFFEE & BOOK",
    name: "구모카페 · 구름책방",
    copy: "걷다가 마음에 들면 잠깐 앉아 있기. 다음 목적지를 서두르지 말고 커피와 책 사이에서 잠깐 쉬어가세요.",
    dual: ["☕ 구모카페", "📚 구름책방"],
    action: "☕ 커피 한 잔 마시며 아무것도 안 하기",
  },
  {
    photo: daedong,
    alt: "풍차 너머로 노을 지는 대전 시내 전망",
    kicker: "SUNSET",
    name: "대동 하늘공원",
    copy: "슬슬 하늘이 예뻐질 시간. 잠깐 멈춰 대전의 풍경을 바라보세요.",
    action: "🌇 오늘 가장 마음에 드는 하늘 남기기",
  },
  {
    photo: sikjangsan,
    alt: "구름 위로 해가 떠오르는 식장산 정상 전망대",
    kicker: "FINISH · NIGHT VIEW",
    name: "식장산 해돋이 전망대",
    copy: "오늘 하루의 마지막 장면. 대전의 풍경을 바라보며 오늘 여행을 천천히 마무리해보세요.",
    action: "🌃 사진 한 장 찍고 잠깐 휴대폰 내려놓기",
  },
];

/** 06 COURSE DETAIL */
export default function CourseSection() {
  return (
    <section className="detail-section course-detail" id="course">
      <div className="section-inner">
        <a href="#choose" className="section-back">
          ← 기분 다시 고르기
        </a>

        <br />

        <span className="detail-eyebrow">😴 오늘은 코스 짜기도 귀찮은 기분이에요</span>

        <h2 className="detail-title">
          생각하지 마세요.<br />
          <strong>오늘 코스는 정해드릴게요.</strong>
        </h2>

        <p className="detail-lead">
          오래된 골목부터 카페와 책방, 대전의 풍경이 내려다보이는 곳까지.<br />
          <strong>그냥 이 순서대로 따라가면 되는 대전의 하루.</strong>
        </p>

        <div className="course-timeline">
          {STOPS.map((stop, i) => (
            <div key={stop.name} className="course-stop">
              <div className="stop-number">{String(i + 1).padStart(2, "0")}</div>

              <article className="stop-card">
                <div className="stop-photo photo-frame">
                  <img src={stop.photo} alt={stop.alt} />
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
          ))}
        </div>
      </div>
    </section>
  );
}
