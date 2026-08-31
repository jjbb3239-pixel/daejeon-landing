type NavLink = { href: string; label: string };

const NAV: NavLink[] = [
  { href: "#choose", label: "오늘의 기분 고르기" },
  { href: "#photo", label: "사진 왕창 찍고 싶은 날" },
  { href: "#food", label: "맛집 다 뿌수고 싶은 날" },
  { href: "#cafe", label: "느좋 카페 가고 싶은 날" },
  { href: "#course", label: "아무 생각 하기 싫은 날" },
  { href: "#proof", label: "실제 방문객 리뷰" },
  { href: "#festival", label: "지금 열리는 행사" },
];

/**
 * 아직 확인되지 않은 값은 지어내지 않고 자리표시자로 둔다.
 * 값이 정해지면 이 상수만 바꾸면 된다.
 */
const TEAM = {
  name: "팀 이름 (확인 중)",
  members: "팀원 명단 (확인 중)",
  email: "문의 메일 (확인 중)",
  instagram: "https://instagram.com/",
};

const CREDITS = [
  {
    label: "캐릭터",
    body: "꿈돌이 · 꿈씨패밀리 — 대전광역시 공식 캐릭터. 「꿈씨패밀리 캐릭터 디자인 및 활용 가이드라인」의 기본형·응용 동작을 그대로 사용했습니다.",
  },
  {
    label: "리뷰",
    body: "Google 리뷰(via Wanderlog) · 다이닝코드 · 폴레. 별점과 리뷰 수는 각 플랫폼에 공개된 표시값이며, 집계 기준은 서로 다를 수 있습니다.",
  },
  {
    label: "행사 포스터",
    body: "유성온날 · 동구동락 축제 · 대전콘텐츠페어 · 대전빵축제 각 주최 측 공식 홍보물.",
  },
  {
    label: "장소 사진",
    body: "출처 확인 중 — 명소 · 카페 · 맛집 · 코스 사진 16장의 촬영·이용 정보를 정리하고 있습니다.",
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-inner">
        {/* 페이지 맨 아래에서는 플로팅 「내 기분 알아보기」 버튼과 겹치므로
            푸터 맨 위 오른쪽에 둔다 */}
        <div className="footer-jump">
          <a className="footer-top-link" href="#top">
            맨 위로 ↑
          </a>
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <strong>
              기분이 이끄는 대로,<br />
              일단 대전행.
            </strong>

            <p>
              오늘 내 기분에 맞는 대전 하루를 찾아주는 페이지입니다. 계획은 도착해서
              세워도 괜찮으니까요.
            </p>

            <a
              className="footer-sns"
              href={TEAM.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          </div>

          <nav className="footer-nav" aria-label="섹션 바로가기">
            <h2>바로가기</h2>

            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-team">
            <h2>만든 사람</h2>

            <dl>
              <dt>팀</dt>
              <dd className="is-todo">{TEAM.name}</dd>

              <dt>팀원</dt>
              <dd className="is-todo">{TEAM.members}</dd>

              <dt>문의</dt>
              <dd className="is-todo">{TEAM.email}</dd>
            </dl>
          </div>
        </div>

        <section className="footer-credits" aria-label="출처">
          <h2>사진 · 콘텐츠 출처</h2>

          <dl>
            {CREDITS.map((credit) => (
              <div key={credit.label}>
                <dt>{credit.label}</dt>
                <dd>{credit.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="footer-bottom">
          <p className="footer-notice">
            행사 일정과 메뉴·가격은 바뀔 수 있습니다. 방문 전에 각 공식 채널에서 한 번 더
            확인해 주세요.
          </p>

          <div className="footer-meta">
            <small>© 2026 대전 여행 랜딩페이지 · 비상업 학습용 프로젝트</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
