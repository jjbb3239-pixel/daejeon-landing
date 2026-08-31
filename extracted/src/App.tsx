import { useState } from "react";
import Hero from "./sections/Hero";
import MoodSelect from "./sections/MoodSelect";
import PhotoSection from "./sections/PhotoSection";
import FoodSection from "./sections/FoodSection";
import CafeSection from "./sections/CafeSection";
import CourseSection from "./sections/CourseSection";
import FestivalSection from "./sections/FestivalSection";
import MoodTest from "./MoodTest";

/**
 * 「최종 수정본.html」구조 그대로 한 페이지 앵커 스크롤.
 * 섹션 id 는 #choose #photo #food #cafe #course #festival.
 */
export default function App() {
  const [testOpen, setTestOpen] = useState(false);
  const openTest = () => setTestOpen(true);

  return (
    <>
      <Hero onOpenTest={openTest} />

      <MoodSelect />

      <PhotoSection />

      <FoodSection />

      <CafeSection />

      <CourseSection />

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

      {/* FLOATING CTA */}
      <button type="button" className="floating-mood" onClick={openTest}>
        ✦ 내 기분 알아보기
      </button>

      <MoodTest open={testOpen} onClose={() => setTestOpen(false)} />
    </>
  );
}
