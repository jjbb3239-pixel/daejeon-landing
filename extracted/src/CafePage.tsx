import sosin from "./imports/cafe/sosin.jpeg";
import toldAStory from "./imports/cafe/told-a-story.jpg";
import ssangri from "./imports/cafe/ssangri.jpeg";

type CafePageProps = {
  onBack: () => void;
};

/** 전체전체.html 의 #cafe 섹션을 그대로 옮긴 페이지 */
export default function CafePage({ onBack }: CafePageProps) {
  return (
    <section className="detail-section cafe-detail" id="cafe">

      <div className="section-inner">

        <button className="section-back" onClick={onBack}>
          ←
          <span>기분 다시 고르기</span>
        </button>


        <div className="cafe-intro">

          <div>

            <span className="detail-eyebrow">
              느좋 카페 가고 싶은 기분이에요
            </span>

            <h2 className="detail-title">
              오늘은 어떤<br />
              <strong>카페 무드?</strong>
            </h2>

            <p className="detail-lead">
              같은 커피 한 잔이어도<br />
              오늘 원하는 시간은 조금씩 다르니까.<br />
              <strong>지금 하고 싶은 걸 골라 대전 카페로 가볼까요?</strong>
            </p>

          </div>


          <aside className="cafe-mood-test">

            <h3>TODAY'S CAFE MOOD</h3>

            <a href="#sosin" className="mood-test-item">
              👽 대전에서만 할 수 있는 것 → 소신
            </a>

            <a href="#told" className="mood-test-item">
              ☕ 커피 맛에 제대로 빠지고 싶다 → 톨드어스토리
            </a>

            <a href="#ssangri" className="mood-test-item">
              📖 책과 작업에 몰입하고 싶다 → 쌍리
            </a>

          </aside>

        </div>


        <div className="cafe-grid">

          <article className="cafe-card" id="sosin">

            <div className="cafe-photo">
              <img src={sosin} alt="꿈돌이 굿즈가 놓인 궁동 소신 카페 내부" />
            </div>

            <div className="cafe-body">

              <span className="cafe-category">
                ONLY DAEJEON
              </span>

              <h3>궁동 소신</h3>

              <p className="cafe-headline">
                대전에서만 만날 수 있는 귀여움
              </p>

              <p className="cafe-description">
                대전의 상징이라고 할 수 있는 귀여운 캐릭터 꿈돌이.
                너무 유명하고 붐비는 곳보다 조금 여유롭게
                대전다운 귀여움을 만나고 싶은 혼자 여행자에게
                궁동의 ‘소신’을 추천합니다.
              </p>

              <div className="cafe-point">
                <strong>추천 기분</strong><br />
                대전에서만 할 수 있는 것을 찾아보고 싶은 날
                <br /><br />
                <strong>POINT</strong><br />
                꿈돌이 · 대전 로컬 감성
              </div>

              <div className="cafe-mission">
                📸 오늘의 미션 : 꿈돌이와 인증샷 남기기
              </div>

            </div>

          </article>


          <article className="cafe-card" id="told">

            <div className="cafe-photo">
              <img src={toldAStory} alt="블루리본 스티커가 붙은 갈마동 톨드어스토리 외관" />
            </div>

            <div className="cafe-body">

              <span className="cafe-category">
                COFFEE LOVER
              </span>

              <h3>갈마동 톨드어스토리</h3>

              <p className="cafe-headline">
                오늘은 커피에 진심이고 싶어서
              </p>

              <p className="cafe-description">
                제공한 자료에 따르면 외관 창문에
                블루리본 스티커가 10개 붙어 있는 곳.
                2005년부터 시작해 2021년 갈마동으로 이전한 뒤에도
                발길이 이어지고 있는 공간입니다.
              </p>

              <div className="cafe-point">
                <strong>추천 기분</strong><br />
                오늘만큼은 커피 맛 자체에 집중하고 싶은 날
                <br /><br />
                <strong>POINT</strong><br />
                커피 · 오랜 시간 이어온 공간
              </div>

              <div className="cafe-mission">
                ☕ 오늘의 미션 : 평소 안 마셔본 커피 한 잔 골라보기
              </div>

            </div>

          </article>


          <article className="cafe-card" id="ssangri">

            <div className="cafe-photo">
              <img src={ssangri} alt="레트로한 분위기의 대흥동 쌍리 카페" />
            </div>

            <div className="cafe-body">

              <span className="cafe-category">
                READ & WORK
              </span>

              <h3>대흥동 쌍리</h3>

              <p className="cafe-headline">
                아무 방해 없이 내 시간에 몰입하기
              </p>

              <p className="cafe-description">
                ‘쌍리’라는 이름은 두 마리의 잉어를 뜻하고,
                고전 문학에서는 멀리서 온 반가운 편지를 의미한다고 합니다.
                2008년부터 한 자리를 지켜온 카페로,
                1층은 레트로한 분위기,
                2층은 밝고 모던한 갤러리 공간으로 소개되어 있습니다.
              </p>

              <div className="cafe-point">
                <strong>혼자라면 2층</strong><br />
                갤러리형 공간에 자리를 잡고
                책을 읽거나 작업하며 천천히 머물러보세요.
              </div>

              <div className="cafe-mission">
                📖 오늘의 미션 : 휴대폰 내려놓고 20분 집중하기
              </div>

            </div>

          </article>

        </div>


        <div className="page-outro">
          <h2>
            머무는 시간도
            <br />
            내 기분대로.
          </h2>
        </div>


        <button className="section-back section-back-bottom" onClick={onBack}>
          ←
          <span>기분 다시 고르기</span>
        </button>
      </div>
    </section>
  );
}
