import { useEffect, useState } from "react";
import { INSTAGRAM, isReady, notReadyProps } from "../links";
import { share } from "../share";

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
};

type Credit = {
  label: string;
  body?: string;
  /** 사진마다 출처가 다를 때. [장소, 출처, 원문 주소(선택)] */
  items?: [string, string, string?][];
  link?: { href: string; text: string };
};

const CREDITS: Credit[] = [
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
    body: "유성온날 · 동구동락 축제 · 대전콘텐츠페어 · 대전빵축제 각 주최 측 공식 홍보물. 유성온날 포스터는 뉴시스 보도 이미지를 사용했습니다.",
  },
  {
    label: "명소 사진",
    body: "엑스포다리 · 이응노미술관 · 엑스포과학공원 한빛탑 · 대전근현대사전시관 — 「대전 100선」에서 가져왔습니다.",
    link: { href: "https://spot100x100.kr/", text: "spot100x100.kr ↗" },
  },
  {
    label: "코스 사진",
    items: [
      ["소제동 철도관사촌", "스마트관광신문"],
      ["구모카페 · 구름책방", "K-books trends"],
      ["대동 하늘공원", "대전관광공사"],
      // 공공누리는 출처가 아니라 이용허락 표시다. 기관명을 앞에 둔다.
      // 유형(제1~4유형)이 확인되면 괄호 안에 함께 적을 것.
      ["식장산 해돋이전망대", "대전광역시 (공공누리)"],
    ],
  },
  {
    label: "카페 사진",
    items: [
      [
        "궁동 소신",
        "pan03184, 「대전 유성 궁동 충남대 유명한 파티세리소신 꿈돌이 디저트 카페」, 졍졍졍블로그 (2026.08.30)",
        "https://blog.naver.com/pan03184/224139136491",
      ],
      [
        "갈마동 톨드어스토리",
        "톨드어스토리 공식 홈페이지 「COFFEE LETTER — 하리오 V60 드리퍼 브루잉 가이드」",
        "https://www.toldastory.com/article/coffee-letter/13/857/",
      ],
      ["대흥동 쌍리", "출처 정리 중"],
    ],
  },
  {
    label: "맛집 사진",
    body: "토미야 · 트리니트 비스트로 · 희락반점의 메뉴 이미지는 AI 로 만든 것입니다. 실제 매장에서 찍은 사진이 아닙니다.",
  },
];

const SHARE = {
  title: "기분이 이끄는 대로, 일단 대전행.",
  text: "오늘 기분에 맞는 대전 하루 코스를 찾아보세요.",
};

export default function SiteFooter() {
  /** 공유 결과 안내. 잠깐 띄웠다가 지운다. */
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 2600);
    return () => clearTimeout(t);
  }, [notice]);

  async function onShare() {
    const result = await share(SHARE);
    if (result === "copied") setNotice("링크가 복사됐어요");
    if (result === "failed") setNotice("복사가 막혀 있어요. 주소창의 링크를 직접 복사해 주세요");
  }

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

            <div className="footer-actions">
              <a
                className={isReady(INSTAGRAM) ? "footer-sns" : "footer-sns is-pending"}
                {...(isReady(INSTAGRAM)
                  ? { href: INSTAGRAM, target: "_blank", rel: "noopener noreferrer" }
                  : notReadyProps)}
              >
                Instagram ↗
              </a>

              <button type="button" className="footer-share" onClick={onShare}>
                친구에게 공유
              </button>
            </div>

            <p className="footer-share-notice" role="status">
              {notice}
            </p>
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

                <dd>
                  {credit.body}

                  {credit.link && (
                    <>
                      {" "}
                      <a
                        className="credit-link"
                        href={credit.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {credit.link.text}
                      </a>
                    </>
                  )}

                  {credit.items && (
                    <ul className="credit-list">
                      {credit.items.map(([place, source, href]) => (
                        <li key={place}>
                          <b>{place}</b>

                          <span>
                            {href ? (
                              <a
                                className="credit-link"
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {source}
                              </a>
                            ) : (
                              source
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
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
