import { useEffect, useState } from "react";
import { INSTAGRAM, isReady, notReadyProps } from "../links";
import { share } from "../share";
import { track } from "../analytics";
import { FOOTER } from "../copy/footer";
import { COMMON } from "../copy/common";
import { useCopy } from "../i18n";

/** 문구는 copy/footer.ts. 여기 남는 건 주소뿐이다. */
const NAV_HREFS = [
  "#choose",
  "#photo",
  "#food",
  "#cafe",
  "#course",
  "#proof",
  "#festival",
];

const TEAM = {
  name: "마술사",
  email: "loco1497@naver.com",
};

/** 출처 항목의 원문 주소. copy/footer.ts 의 credits 순서와 맞춘다. */
const CREDIT_HREFS: Record<string, string> = {
  "spot100x100": "https://spot100x100.kr/",
  "sikjangsan": "https://commons.wikimedia.org/wiki/File:%EC%8B%9D%EC%9E%A5%EC%82%B0_%EC%A0%95%EC%83%81%EC%97%90_%EC%A1%B0%EC%84%B1%ED%95%9C_%EC%A0%84%EB%A7%9D%EB%8C%80_%EC%95%BC%EA%B2%BD.jpg",
  "sosin": "https://blog.naver.com/pan03184/224139136491",
  "told": "https://www.toldastory.com/article/coffee-letter/13/857/",
};

/** 항목 링크는 [출처 그룹 index][항목 index] 로 찾는다. */
const CREDIT_ITEM_HREFS: Record<number, Record<number, string>> = {
  4: { 3: CREDIT_HREFS.sikjangsan },
  5: { 0: CREDIT_HREFS.sosin, 1: CREDIT_HREFS.told },
};

export default function SiteFooter() {
  const t = useCopy(FOOTER);
  const common = useCopy(COMMON);

  /** 공유 결과 안내. 잠깐 띄웠다가 지운다. */
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 2600);
    return () => clearTimeout(t);
  }, [notice]);

  async function onShare() {
    track("share_click", { where: "footer" });

    const result = await share({ title: t.shareTitle, text: t.shareText });
    track("share_result", { where: "footer", outcome: result });
    if (result === "copied") setNotice(t.copied);
    if (result === "failed") setNotice(t.copyFailed);
  }

  return (
    <footer className="site-footer">
      <div className="section-inner">
        {/* 페이지 맨 아래에서는 플로팅 「내 기분 알아보기」 버튼과 겹치므로
            푸터 맨 위 오른쪽에 둔다 */}
        <div className="footer-jump">
          <a className="footer-top-link" href="#top">
            {t.toTop}
          </a>
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <strong>
              {t.brandLine1}<br />
              {t.brandLine2}
            </strong>

            <p>{t.brandCopy}</p>

            <div className="footer-actions">
              <a
                className={isReady(INSTAGRAM) ? "footer-sns" : "footer-sns is-pending"}
                {...(isReady(INSTAGRAM)
                  ? { href: INSTAGRAM, target: "_blank", rel: "noopener noreferrer" }
                  : { ...notReadyProps, title: common.linkPending })}
              >
                {t.instagram}
              </a>

              <button type="button" className="footer-share" onClick={onShare}>
                {t.shareButton}
              </button>
            </div>

            <p className="footer-share-notice" role="status">
              {notice}
            </p>
          </div>

          <nav className="footer-nav" aria-label={t.navTitle}>
            <h2>{t.navTitle}</h2>

            <ul>
              {NAV_HREFS.map((href, i) => (
                <li key={href}>
                  <a href={href}>{t.nav[i]}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-team">
            <h2>{t.teamTitle}</h2>

            <dl>
              <dt>{t.teamLabel}</dt>
              <dd>{TEAM.name}</dd>

              <dt>{t.contactLabel}</dt>
              <dd>
                <a href={`mailto:${TEAM.email}`}>{TEAM.email}</a>
              </dd>
            </dl>
          </div>
        </div>

        <details className="footer-credits">
          <summary>
            <span className="footer-credits-title">{t.creditsTitle}</span>
            <span className="footer-credits-toggle" aria-hidden="true">
              +
            </span>
          </summary>

          <div className="footer-credits-content">
            <dl>
              {t.credits.map((credit, ci) => (
                <div key={credit.label}>
                  <dt>{credit.label}</dt>

                  <dd>
                    {Array.isArray(credit.body)
                      ? credit.body.map((line) => (
                          <span className="footer-credit-line" key={line}>
                            {line}
                          </span>
                        ))
                      : credit.body}

                    {credit.linkText && (
                      <>
                        {" "}
                        <a
                          className="credit-link"
                          href={CREDIT_HREFS.spot100x100}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {credit.linkText}
                        </a>
                      </>
                    )}

                    {credit.items && (
                      <ul className="credit-list">
                        {credit.items.map(([place, source], ii) => {
                          const href = CREDIT_ITEM_HREFS[ci]?.[ii];

                          return (
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
                          );
                        })}
                      </ul>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </details>

        <div className="footer-bottom">
          <p className="footer-notice">{t.notice}</p>

          <div className="footer-meta">
            <small>{t.meta}</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
