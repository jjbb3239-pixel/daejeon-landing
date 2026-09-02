import { useCallback, useEffect, useState, type ReactNode } from "react";
import Hero from "./sections/Hero";
import MoodSelect from "./sections/MoodSelect";
import PhotoSection from "./sections/PhotoSection";
import FoodSection from "./sections/FoodSection";
import CafeSection from "./sections/CafeSection";
import CourseSection from "./sections/CourseSection";
import ProofSection from "./sections/ProofSection";
import FestivalSection from "./sections/FestivalSection";
import SiteFooter from "./sections/SiteFooter";
import MoodTest from "./MoodTest";
import MoodFold from "./MoodFold";
import { COLLAPSE_MOOD_SECTIONS_ON_MOBILE } from "./features";
import type { MoodId } from "./quiz";
import { LangProvider } from "./i18n";
import LangToggle from "./LangToggle";
import { APP } from "./copy/app";
import { useCopy } from "./i18n";

const MOOD_IDS: MoodId[] = ["photo", "food", "cafe", "course"];
const isMoodId = (v: string): v is MoodId => (MOOD_IDS as string[]).includes(v);

/**
 * 「최종 수정본.html」구조 그대로 한 페이지 앵커 스크롤.
 * 섹션 id 는 #choose #photo #food #cafe #course #proof #festival.
 * 마지막은 푸터(SiteFooter).
 *
 * 기분 섹션 4개는 모바일에서 접힌다. 끄려면 features.ts 참고.
 */
export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}

function Page() {
  const t = useCopy(APP);
  const [testOpen, setTestOpen] = useState(false);
  const openTest = () => setTestOpen(true);

  /** 지금 펼쳐진 기분 섹션. 모바일에서만 의미가 있다. */
  const [openMood, setOpenMood] = useState<MoodId | null>(null);

  /** 해당 섹션을 펼치고 그 자리로 데려간다. 접혀 있으면 먼저 펼쳐야 스크롤이 먹는다. */
  const revealMood = useCallback((id: MoodId) => {
    setOpenMood(id);

    // 펼쳐진 뒤에 위치를 재야 한다.
    // rAF 는 배경 탭에서 멈추므로 타이머를 쓴다.
    setTimeout(() => {
      const fold = document.querySelector(`[data-mood="${id}"]`);
      (fold ?? document.getElementById(id))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }, []);

  /**
   * 헤더를 눌러 펼칠 때는 스크롤까지 해줘야 한다.
   *
   * 위에 있던 섹션이 닫히면서 아래 내용이 그만큼 딸려 올라가는데,
   * 브라우저는 스크롤 위치를 그대로 두기 때문에 목적지를 지나쳐버린다.
   * (카페를 닫고 코스를 열면 3,159px 이 올라가 리뷰 섹션이 보였다)
   *
   * 접을 때는 헤더 위쪽이 안 변하므로 스크롤이 필요 없다.
   */
  const toggleMood = (id: MoodId) => {
    if (openMood === id) {
      setOpenMood(null);
      return;
    }
    revealMood(id);
  };

  // 기분 카드(#photo 같은 앵커)를 누르면 해당 섹션을 펼친다
  useEffect(() => {
    if (!COLLAPSE_MOOD_SECTIONS_ON_MOBILE) return;

    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      if (isMoodId(id)) revealMood(id);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [revealMood]);

  /** 접기를 쓸 때만 껍데기를 씌운다. 끄면 예전처럼 섹션이 그냥 이어진다. */
  const fold = (id: MoodId, node: ReactNode) =>
    COLLAPSE_MOOD_SECTIONS_ON_MOBILE ? (
      <MoodFold id={id} open={openMood === id} onToggle={toggleMood}>
        {node}
      </MoodFold>
    ) : (
      node
    );

  return (
    <>
      <span id="top" />

      <LangToggle />

      <Hero onOpenTest={openTest} />

      <MoodSelect />

      {fold("photo", <PhotoSection />)}

      {fold("food", <FoodSection />)}

      {fold("cafe", <CafeSection />)}

      {fold("course", <CourseSection />)}

      <ProofSection />

      <FestivalSection />

      {/* 08 FINAL CTA */}
      <section className="final-section">
        <h2>
          {t.finalHead1}<br />
          {t.finalHead2}
        </h2>

        <p>
          {t.finalLead}
          <br />
          <br />
          {t.finalLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < t.finalLines.length - 1 && <br />}
            </span>
          ))}
        </p>

        <button type="button" className="ticket-cta" onClick={openTest}>
          {t.finalCta}
        </button>
      </section>

      <SiteFooter />

      {/* FLOATING CTA */}
      <button type="button" className="floating-mood" onClick={openTest}>
        {t.floatingCta}
      </button>

      <MoodTest
        open={testOpen}
        onClose={() => setTestOpen(false)}
        onGoToMood={revealMood}
      />
    </>
  );
}
