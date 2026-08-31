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

  const toggleMood = (id: MoodId) => setOpenMood((now) => (now === id ? null : id));

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
          대전에는<br />
          정해진 관광코스가 없습니다.
        </h2>

        <p>
          꼭 봐야 하는 것도, 꼭 해야 하는 것도 없으니까.
          <br />
          <br />
          혼자 온 오늘만큼은<br />
          먹고 싶으면 먹고,<br />
          걷고 싶으면 걷고,<br />
          마음에 들면 조금 더 머물러도 됩니다.
        </p>

        <button type="button" className="ticket-cta" onClick={openTest}>
          내 기분 다시 알아보기 →
        </button>
      </section>

      <SiteFooter />

      {/* FLOATING CTA */}
      <button type="button" className="floating-mood" onClick={openTest}>
        ✦ 내 기분 알아보기
      </button>

      <MoodTest
        open={testOpen}
        onClose={() => setTestOpen(false)}
        onGoToMood={revealMood}
      />
    </>
  );
}
