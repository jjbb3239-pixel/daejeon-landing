import kkumdori from "../imports/kkumdori.png";

type HeroProps = {
  onOpenTest: () => void;
};

/** 01 HERO — 승차권 */
export default function Hero({ onOpenTest }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-bg-word">DAEJEON</div>

      <span className="hero-note note1">NEXT STOP · DAEJEON</span>
      <span className="hero-note note2">SOLO TRIP · 2026</span>
      <span className="hero-note note3">GO WHERE YOU FEEL</span>

      <div className="train-ticket">
        <div className="ticket-perforation" />
        <span className="ticket-notch-top" />
        <span className="ticket-notch-bottom" />

        {/* LEFT */}
        <div className="ticket-left">
          <div className="ticket-topline">
            <span className="ticket-oneway">● ONE WAY · SOLO TRIP</span>

            <div className="ticket-code">
              <small>TRAIN CODE</small>
              DJE 042
            </div>
          </div>

          {/* MAIN COPY */}
          <div className="ticket-copy">
            <h1>
              기분이 이끄는 대로,<br />
              일단 <em>대전행.</em>
            </h1>

            <p>
              대전에서 뭐 하지? 아직 몰라도 괜찮아요.<br />
              <strong>오늘 내 기분부터 알아보면 되니까.</strong>
            </p>
          </div>

          {/* TODAY -> DAEJEON */}
          <div className="ticket-route">
            <div className="route-place">
              <small>FROM</small>
              <strong>TODAY</strong>
            </div>

            <div className="ticket-route-line" />

            <div className="route-place destination">
              <small>TO</small>
              <strong>DAEJEON</strong>
            </div>
          </div>

          {/* CTA */}
          <div className="ticket-action">
            <div className="ticket-cta-wrap">
              <button type="button" className="ticket-cta" onClick={onOpenTest}>
                30초 만에 내 대전 여행 기분 찾기 →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT STUB */}
        <aside className="ticket-stub">
          <div className="stub-heading">
            <span className="boarding-label">BOARDING PASS</span>

            <div className="boarding-title">대전행</div>
          </div>

          <div className="stub-divider" />

          <div className="stub-info-grid">
            <div className="stub-info">
              <small>PASSENGER</small>
              <strong>SOLO</strong>
            </div>

            <div className="stub-info">
              <small>PLAN</small>
              <strong>OPEN</strong>
            </div>

            <div className="stub-info">
              <small>MOOD</small>
              <strong>YOURS</strong>
            </div>

            <div className="stub-info">
              <small>DEPARTURE</small>
              <strong>NOW</strong>
            </div>
          </div>

          {/* 스탬프 뒤에 꿈돌이 */}
          <div className="stub-stamp-wrap">
            <img
              className="stub-kkumdori"
              src={kkumdori}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
            />

            <div className="ticket-stamp">
              <span>MOOD CHECK</span>
              <strong>DAEJEON</strong>
              <span>READY TO GO</span>
            </div>
          </div>

          <div className="ticket-barcode" />

          <div className="ticket-barcode-text">DJE · 042 · ONE WAY · SOLO</div>
        </aside>
      </div>

      <a href="#choose" className="hero-scroll">
        <strong>아직 어디 갈지 모르겠다면</strong>

        <small>SCROLL TO FIND YOUR DAEJEON</small>

        <span className="scroll-arrow">↓</span>
      </a>
    </section>
  );
}
