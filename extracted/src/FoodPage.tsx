import tomiya from "./imports/food/tomiya.jpg";
import trinite from "./imports/food/trinite.jpg";
import huirak from "./imports/food/huirak.jpg";

type FoodPageProps = {
  onBack: () => void;
};

/** 전체전체.html 의 #food 섹션을 그대로 옮긴 페이지 */
export default function FoodPage({ onBack }: FoodPageProps) {
  return (
    <section className="detail-section food-detail" id="food">

      <div className="section-inner">

        <button className="section-back" onClick={onBack}>
          ←
          <span>기분 다시 고르기</span>
        </button>

        <span className="detail-eyebrow">
          맛있는 거 다 뿌수고 싶은 기분이에요
        </span>

        <h2 className="detail-title">
          대전 <strong>맛집</strong><br />
          도장깨기
        </h2>

        <p className="detail-lead">
          오늘은 누구랑 메뉴를 맞출 필요 없이<br />
          <strong>내가 먹고 싶은 걸 골라보세요.</strong>
        </p>


        <div className="restaurant-grid">

          <article className="restaurant-card">

            <div className="restaurant-photo">
              <img src={tomiya} alt="토미야의 사누끼 우동과 새우튀김" />

              <div className="restaurant-badge">

                <span className="restaurant-number">01</span>

                <span className="restaurant-category">
                  일식
                </span>

              </div>

            </div>

            <div className="restaurant-body">

              <h3>토미야</h3>

              <p className="restaurant-description">
                오늘은 일식이 당기는 날이라면 첫 번째 후보.
                혼자 천천히 한 끼를 즐기고 싶을 때 골라보세요.
              </p>

              <div className="food-info">

                <div className="food-info-row">
                  <span className="food-info-label">CATEGORY</span>
                  <span className="food-info-value">일식</span>
                </div>

                <div className="food-info-row">
                  <span className="food-info-label">MENU</span>
                  <span className="food-info-value">
                    <span className="menu-line">
                      <b>토리텐붓카케</b>
                      <em>13,000원</em>
                    </span>
                    <span className="menu-line">
                      <b>니꾸우동</b>
                      <em>11,000원</em>
                    </span>
                    <span className="menu-line">
                      <b>붓카케우동</b>
                      <em>8,500원</em>
                    </span>
                  </span>
                </div>

                <div className="food-info-row">
                  <span className="food-info-label">LOCATION</span>
                  <span className="food-info-value">
                    대전 중구 대흥로529번길 18
                    <em className="food-walk">대전역 도보 10분</em>
                  </span>
                </div>

              </div>

            </div>

          </article>


          <article className="restaurant-card">

            <div className="restaurant-photo">
              <img src={trinite} alt="트리니트 비스트로의 채끝 스테이크 플레이팅" />

              <div className="restaurant-badge">

                <span className="restaurant-number">02</span>

                <span className="restaurant-category">
                  양식
                </span>

              </div>

            </div>

            <div className="restaurant-body">

              <h3>트리니트 비스트로</h3>

              <p className="restaurant-description">
                분위기까지 챙기고 싶은 오늘의 한 끼.
                혼자여도 천천히 즐기는 비스트로 무드.
              </p>

              <div className="food-info">

                <div className="food-info-row">
                  <span className="food-info-label">CATEGORY</span>
                  <span className="food-info-value">양식</span>
                </div>

                <div className="food-info-row">
                  <span className="food-info-label">MENU</span>
                  <span className="food-info-value">
                    <span className="menu-line">
                      <b>트러플 크림 뇨끼</b>
                      <em>19,000원</em>
                    </span>
                    <span className="menu-line">
                      <b>라구 파스타</b>
                      <em>18,000원</em>
                    </span>
                    <span className="menu-line">
                      <b>채끝 스테이크</b>
                      <em>32,000원</em>
                    </span>
                  </span>
                </div>

                <div className="food-info-row">
                  <span className="food-info-label">LOCATION</span>
                  <span className="food-info-value">
                    대전 유성구 계룡로123번길 45
                    <em className="food-walk">유성온천역 도보 5분</em>
                  </span>
                </div>

              </div>

            </div>

          </article>


          <article className="restaurant-card">

            <div className="restaurant-photo">
              <img src={huirak} alt="희락반점의 유니짜장" />

              <div className="restaurant-badge">

                <span className="restaurant-number">03</span>

                <span className="restaurant-category">
                  중식
                </span>

              </div>

            </div>

            <div className="restaurant-body">

              <h3>희락반점</h3>

              <p className="restaurant-description">
                든든하고 익숙한 중식이 생각나는 날.
                혼자서도 부담 없이 한 끼 채우기 좋은 선택.
              </p>

              <div className="food-info">

                <div className="food-info-row">
                  <span className="food-info-label">CATEGORY</span>
                  <span className="food-info-value">중식</span>
                </div>

                <div className="food-info-row">
                  <span className="food-info-label">MENU</span>
                  <span className="food-info-value">
                    <span className="menu-line">
                      <b>유니짜장</b>
                      <em>8,000원</em>
                    </span>
                    <span className="menu-line">
                      <b>탕수육</b>
                      <em>20,000원</em>
                    </span>
                    <span className="menu-line">
                      <b>짬뽕</b>
                      <em>9,000원</em>
                    </span>
                  </span>
                </div>

                <div className="food-info-row">
                  <span className="food-info-label">LOCATION</span>
                  <span className="food-info-value">
                    대전 동구 대전로 829
                    <em className="food-walk">대전역 도보 8분</em>
                  </span>
                </div>

              </div>

            </div>

          </article>

        </div>


        <div className="page-outro">
          <h2>
            오늘 메뉴는
            <br />
            내 입맛대로.
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
