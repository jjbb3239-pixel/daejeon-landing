import expoBridge from "../imports/photo/expo-bridge.jpg";
import ungnoMuseum from "../imports/photo/ungno-museum.jpg";
import hanbitTower from "../imports/photo/hanbit-tower.jpg";
import modernHistory from "../imports/photo/modern-history.jpg";

type Place = {
  photo: string;
  alt: string;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  tip: string;
};

/** 설명과 촬영 팁은 기존 페이지의 것을 그대로 쓴다. */
const PLACES: Place[] = [
  {
    photo: expoBridge,
    alt: "밤에 조명이 켜진 엑스포다리와 갑천 야경",
    category: "NIGHT VIEW",
    name: "엑스포다리",
    subtitle: "대전의 밤을 가장 아름답게 건너는 방법",
    description:
      "갑천 위를 가로지르는 엑스포다리는 한밭수목원과 엑스포과학공원을 이어주는 대전의 대표적인 야경 명소입니다. 해가 지면 다리를 따라 조명이 켜지고, 강물 위로 한빛탑과 도시의 불빛이 번져 낮과는 전혀 다른 풍경을 만듭니다. 천천히 다리를 건너거나 갑천변 산책로를 걸으며 바라보는 야경이 특히 매력적입니다.",
    tip: "엑스포다리와 한빛탑을 한 화면에 담아보세요. 일몰 직전에 도착해 노을부터 야경까지 이어서 감상해 보세요.",
  },
  {
    photo: ungnoMuseum,
    alt: "이응노미술관의 하얀 외벽과 대나무 정원",
    category: "ART & ARCHITECTURE",
    name: "이응노미술관",
    subtitle: "작품과 건축이 하나로 이어지는 공간",
    description:
      "한국 현대미술을 대표하는 고암 이응노의 삶과 작품 세계를 만날 수 있는 미술관입니다. 전통 수묵에서 문자추상과 군상에 이르기까지 끊임없이 새로운 표현을 탐구했던 작가의 예술 세계를 다양한 전시로 소개합니다. 프랑스 건축가 로랑 보두앵이 이응노의 작품 「수(壽)」에서 영감을 받아 설계한 건물도 놓치기 아까운 볼거리입니다.",
    tip: "미술관의 하얀 외벽과 대나무, 잔디광장이 어우러진 야외 공간도 둘러보세요. 인근 대전시립미술관과 한밭수목원을 함께 방문하면 여유로운 반나절 코스가 완성됩니다.",
  },
  {
    photo: hanbitTower,
    alt: "엑스포과학공원 한빛탑 전경",
    category: "LANDMARK",
    name: "엑스포과학공원 한빛탑",
    subtitle: "과학도시 대전을 밝히는 랜드마크",
    description:
      "한빛탑은 1993년 대전엑스포를 기념해 세워진 높이 93m의 상징탑입니다. 우주선을 떠올리게 하는 독특한 모습은 지금도 ‘과학도시 대전’을 대표하는 풍경으로 사랑받고 있습니다. 밤이 되면 탑과 광장에 화려한 조명이 더해지고, 운영 기간에는 음악분수와 미디어파사드가 어우러져 더욱 생동감 있는 야경을 선사합니다.",
    tip: "한빛탑 광장에서 엑스포다리 방향으로 걸어보세요. 탑의 불빛과 분수, 다리의 조명이 차례로 이어집니다. ※ 음악분수와 미디어파사드는 방문 전 운영 일정을 확인해 주세요.",
  },
  {
    photo: modernHistory,
    alt: "대전근현대사전시관 외관",
    category: "RETRO",
    name: "대전근현대사전시관",
    subtitle: "오래된 청사에서 만나는 대전의 시간",
    description:
      "1932년에 지어진 옛 충남도청사 본관을 활용한 전시관으로, 대전이 근대도시로 성장해 온 과정과 도시의 변화를 한눈에 살펴볼 수 있습니다. 당시의 모습을 간직한 복도와 계단, 창문 등 건물 자체도 하나의 전시물처럼 느껴집니다. 여러 영화와 드라마의 촬영지로 사용될 만큼 고풍스럽고 묵직한 분위기도 인상적입니다.",
    tip: "오래된 건물의 세부 장식과 공간 구성을 눈여겨보세요. 관람 후에는 중앙로와 선화동 일대를 걸으며 원도심의 오래된 풍경과 새로운 감성이 공존하는 모습을 만나보세요.",
  },
];

const MISSIONS = [
  "엑스포다리 + 한빛탑 한 프레임에 담기",
  "이응노미술관에서 건축 디테일 찾기",
  "한빛탑 불빛이 켜지는 순간 찍기",
  "근현대사전시관에서 나만의 레트로 컷 남기기",
];

/** 03 PHOTO DETAIL */
export default function PhotoSection() {
  return (
    <section className="detail-section photo-detail" id="photo">
      <div className="section-inner">
        <a href="#choose" className="section-back">
          ← 기분 다시 고르기
        </a>

        <br />

        <span className="detail-eyebrow">사진 왕창 찍고 싶은 기분이에요</span>

        <h2 className="detail-title">
          대전에서 놓치기 아까운<br />
          <strong>추천 명소 4곳</strong>
        </h2>

        <p className="detail-lead">
          랜드마크부터 미술관, 오래된 건축과 야경까지.<br />
          <strong>오늘 피드에 남기고 싶은 대전을 골라보세요.</strong>
        </p>

        <div className="place-grid">
          {PLACES.map((place, i) => (
            <article key={place.name} className="place-card">
              <div className="place-image photo-frame">
                <img src={place.photo} alt={place.alt} />
                <span className="place-number">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="place-content">
                <span className="place-category">{place.category}</span>

                <h3>{place.name}</h3>

                <p className="place-subtitle">{place.subtitle}</p>

                <p className="place-description">{place.description}</p>

                <div className="photo-tip">
                  📸 <strong>이렇게 찍어봐요</strong><br />
                  {place.tip}
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="photo-mission">
          <h3>TODAY&apos;S PHOTO MISSION</h3>

          <div className="mission-grid">
            {MISSIONS.map((mission) => (
              <div key={mission} className="mission">
                □ {mission}
              </div>
            ))}
          </div>

          <div className="mission-finish">4개 다 찍으면 오늘 피드 완성 ✦</div>
        </section>
      </div>
    </section>
  );
}
