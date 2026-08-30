# 대전 랜딩페이지 — 진행 상황

최종 갱신 : 2026-08-30
담당 범위 : **히어로 팝업 삽입 + 게임(취향 찾기 퀴즈) + 결과창 → 취향별 페이지 연결**
작업 대상 : `extracted/` (React + Vite) — 순수 HTML 버전은 만들지 않는다
확인 : `cd extracted && npm run dev` → http://localhost:8443

**현재 상태 : 담당 범위 기능 완성. 네 페이지 실사진·메뉴·주소 입력 완료.**

---

## ⏭ 다음에 켰을 때 여기부터

### 승차권 절취 전환 — **적용 완료 (2026-08-30)**

퀴즈 결과창의 `이 코스 보러가기` → 코스 페이지 전환에 붙였다. **2초.**

| 파일 | 역할 |
|---|---|
| `src/ticketTear.ts` | 전환 전체. 캔버스에 승차권을 그리고 매 프레임 렌더 |
| `src/QuizModal.tsx` | `goToCourse()` 에서 결과 티켓 위치를 재고 전환 실행 |
| `src/App.tsx` | `go(id, true)` 로 넘어오면 코스 페이지에 `.page-enter` 부여 |
| `src/index.css` | `.tear-layer` `.tear-canvas` `.page-enter` |

```
1) 결과창의 MOOD/DESTINATION 박스가 승차권으로 커짐   28%  (FLIP)
2) 잠깐 정지                                        10%
3) 반권이 오른쪽으로 빠지며 빛으로 부서짐             38%
4) 승차권 ↔ 코스 페이지 크로스페이드                  24%
```

> ⚠️ 4단계에서 **움직임을 섞으면 끊겨 보인다.** 승차권을 `translateY+scale` 로 물리고
> 페이지를 아래에서 띄우면 두 모션이 부딪힌다. 양쪽 다 **투명도만** 건드릴 것.

> ⚠️ 등장 애니메이션에 `animation-fill-mode: both` 를 쓰면, 애니메이션이 시작되지 못한
> 상황에서 **페이지가 투명도 0 인 채로 남는다.** fill-mode 는 기본값(none)으로 두고,
> `App.tsx` 에서 700ms 뒤 클래스를 떼서 이중으로 막는다.

> ⚠️ 선택자는 `.dj-page.page-enter` (같은 요소). `.dj-page .page-enter` (자손) 로 쓰면
> 한 번도 매칭되지 않는다 — 한동안 애니메이션이 아예 안 걸려 있었다.

- **승차권 그림은 히어로 티켓과 같은 결로 캔버스에 직접 그린다** —
  왼쪽 모서리 노치, 스텁 오른쪽 톱니, 종이 질감 2겹, 안쪽 실선 테두리,
  노란 라벨(-2° 기울임), 손글씨 제목 + 노란 형광펜 밑줄, FROM→TO,
  ARRIVED 도장, 기차 낙서, PASSENGER/PLAN/MOOD/DEPARTURE, 노란 블록, 바코드
- 절취선 : 15px 간격 퍼포레이션 구멍(반지름 2.7px)을 실제로 뚫고 그 단면을 따라 분리
- 빛 알갱이 190개, 스프라이트 한 장을 구워 `globalCompositeOperation:"lighter"` 로 합성
- 승차권은 **화면 폭을 꽉 채운다** — `width:min(100vw, calc(94vh * 22/9))`
- 원본을 `RES = 2.5` (2750×1125) 로 그려두고 줄여 쓴다.
  1100px 원본 그대로 화면 폭까지 키우면 글자가 뭉갠다

> ⚠️ 손글씨(Nanum Pen Script)를 쓰므로 그리기 전에 `await document.fonts.ready` 필수.
> 폰트가 로드되기 전에 그리면 다른 글꼴로 캔버스에 굳어버린다.
- `prefers-reduced-motion` 이면 연출 없이 바로 이동
- 전환 중 재호출은 무시(`running` 플래그), 남은 레이어는 시작할 때 정리

**기분 카드로 직접 들어갈 땐 전환이 없다.** 퀴즈 결과에서 넘어올 때만 재생한다.

프로토타입은 `prototypes/ticket-tear.html` 에 그대로 남겨뒀다 (속도·취향 바꿔가며 볼 수 있음).

### 그 외 남은 것

- 인스타 링크가 `https://instagram.com/` 루트로 비어 있음
- `Downloads/음식까지.html` (2026-08-30 01:02) — 팀이 올린 듯하나 아직 안 열어봄
- 퀴즈 Q3-B `안 움직인다. 앉을 데부터 찾는다` / Q4-B `역 근처에서 대충 집은 간식 봉지` 는
  🌌 감성 결과와 어울림이 약하다. 문구 변경은 보류 상태

---

## 1. 한눈에 보는 현재 동작

```
                    ┌──────────────────────────────────┐
                    │  홈 (전체전체.html 티켓 히어로)     │
                    └──────────────────────────────────┘
                          │                    │
        ┌─────────────────┘                    └──────────────┐
        ↓                                                     ↓
[내 기분 따라 출발하기 →] (스텁 CTA)                  #choose 기분 카드 4개
        ↓                                                     │
 ┌──────────────────┐                                         │
 │ 팝업 (모달)        │                                         │
 │  ●○○○  1 / 4     │                                         │
 │  질문 + [A] [B]   │  ← 이지선다 4문항                          │
 │       ↓          │                                         │
 │  결과창            │                                         │
 │  🌌 혼자 걷는…     │                                         │
 │  [이 코스 보러가기]│                                         │
 └──────────────────┘                                         │
        ↓                                                     ↓
        └──────────────→  취향별 페이지 4개  ←──────────────────┘
                     📸 photo / 🍽️ food / ☕ cafe / 🌌 solo
                          ↑ 상·하단 「기분 다시 고르기」로 홈 복귀
```

- 원래는 **4번 카드만** 페이지로 연결됐음 → 지금은 **4개 전부** 연결됨
- 페이지 전환 방식 : 앵커 스크롤 아님. 화면이 통째로 교체됨 (`view` 상태)

---

## 2. 취향 4종 ↔ 페이지 대응표

| id | 아이콘 | #choose 카드 문구 | 결과창 표기 | 페이지 내용 |
|---|---|---|---|---|
| `photo` | 📸 | 오늘 피드 좀 채워볼까? | 셔터부터 누르는 사람 | 엑스포다리 · 이응노미술관 · 한빛탑 · 대전근현대사전시관 |
| `food` | 🍽️ | 맛집 도장깨기 | 일단 먹고 보는 사람 | 토미야 · 트리니트 비스트로 · 희락반점 |
| `cafe` | ☕ | 기분에 따라 고르는 카페 | 앉아있는 걸 잘하는 사람 | 궁동 소신 · 갈마동 톨드어스토리 · 대흥동 쌍리 |
| `solo` | 🌌 | 혼자 감수성 터지는 날 | 혼자 걷는 게 편한 사람 | 소제동 · 구모카페 · 대동 하늘공원 · 식장산 |

**카드 문구는 원본 그대로 유지했다.** 결과창 표기는 퀴즈용으로 따로 쓰는 문구.

---

## 3. 파일 구조

### 실제 작업 대상 — `extracted/` (React + Vite)

```
extracted/src/
├── App.tsx            홈 + 라우팅 + 팝업 연결          (원본 유지, 3곳만 수정)
├── quiz.ts            취향 4종 · 질문 4개 · 판정 로직   ★ 문구 수정은 여기
├── quiz.check.ts      판정 로직 검증 스크립트
├── QuizModal.tsx      팝업 (질문 화면 + 결과창)
├── PhotoPage.tsx      전체전체.html #photo 섹션 그대로
├── FoodPage.tsx       전체전체.html #food  섹션 그대로
├── CafePage.tsx       전체전체.html #cafe  섹션 그대로
├── MoodCoursePage.tsx 감성 코스 (원본 그대로, 사진 4장)
├── index.css          원본 + 상세섹션 CSS + 팝업 CSS
└── imports/
    ├── *.jpg          감성 코스 사진 4장 (Figma 내보내기 원본, 파일명 깨져 있음)
    ├── kkumdori.png   히어로 꿈돌이 (공식 가이드라인 원화에서 추출, 배경 투명)
    ├── kkumssi/       기분 카드 4장에 쓰는 꿈씨패밀리 (신규가이드에서 추출)
    ├── photo/         인생샷 코스 사진 4장
    ├── food/          맛집 코스 사진 3장 (팀 인포그래픽에서 크롭)
    ├── cafe/          카페 코스 사진 3장
    └── guideline/     꿈돌이 디자인 가이드라인 원본 PDF
```

`App.tsx`에서 원본 대비 바꾼 곳.

1. 히어로 섹션 전체를 `전체전체.html` 티켓 디자인으로 교체 (4-1 참조)
2. 메인 메시지를 손글씨로 교체하고 꿈돌이 배치
3. 스텁 CTA `내 기분 따라 출발하기` 에 팝업 연결 (`a` → `button`)
4. `#choose` 카드 4개를 `button` 으로 바꾸고 각각 페이지 연결
5. 팝업 렌더링 + `view` 라우팅 추가
6. 홈 섹션 5개 제거 (아래)

### 홈에서 제거한 섹션 (2026-08-30)

아래 4개 섹션을 통째로 들어냈다. 관련 CSS(`.place` `.course` `.timeline` `.time` `.arrow`
`.game` `.counter` `.find-button` `.student` `.student-copy`)와 게임 상태(`count` · `findDream`)도 같이 정리했다.
`.mission` 은 코스 페이지에서 계속 쓰므로 남겨뒀다.

- ❌ 「그럼 일단 여기부터 가봅시다」 (성심당 · 한밭수목원 · 엑스포)
- ❌ 「계획 세우기 귀찮죠?」 (11:00~20:00 타임라인)
- ❌ 「잠깐. 꿈돌이가 숨어있습니다」 (꿈돌이 찾기 게임)
- ❌ 「사실 이 홈페이지는 조금 서툽니다」 (팀 소개)
- ❌ 「대전 / 얼마나 재미있을 지 감도 안 옴;;」 (INTERRUPT) — **메시지는 히어로 제목으로 승격**

**현재 홈 구성 : 히어로 → 오늘의 기분 골라주세요 → 인스타 CTA → 풋터**

### 참고용 파일

| 파일 | 용도 |
|---|---|
| `reference-full.html` | 팀에서 받은 `전체전체.html` 원본. 상세 섹션 내용·CSS의 출처 |
| `LANDING_GUIDE.md` | 작업 기준 문서 (착수 전 이해 확인 규칙 포함) |
| `Finalize design.zip` | 최초 Figma Make 내보내기 원본 |

> ⚠️ 순수 HTML 버전은 만들지 않는다. 결과물은 `extracted/` (React) 하나뿐이다.

---

## 4. 퀴즈 사양

### 질문 4개 (전부 이지선다)

| # | 질문 | A | B |
|---|---|---|---|
| 1 | 대전역 개찰구를 막 나왔습니다. 머릿속에 먼저 뜨는 생각은? | 어디가 예쁠까? 분위기 좋은 데부터 | 어디서 뭘 먹지? 가까운 데부터 |
| 2 | 오늘 SNS에 딱 한 장만 올릴 수 있다면? | 방금 나온 음식 사진 | 창밖이 보이는 자리 사진 |
| 3 | 일정이 비어서 두 시간이 남았습니다. | 골목을 더 돌아본다 | 혼자 조용한 데를 찾아 걷는다 |
| 4 | 하루를 어떻게 마무리하고 싶어요? | 예쁜 카페에서 커피 한 잔 | 조용한 데서 혼자 저녁 먹고 노을 |

### 점수 배분 (주 취향 +2, 부 취향 +1)

```
Q1  A → photo 2, cafe  1     B → food  2, solo  1
Q2  A → food  2, photo 1     B → cafe  2, solo  1
Q3  A → photo 2, food  1     B → solo  2, cafe  1
Q4  A → cafe  2, photo 1     B → solo  2, food  1
```

각 취향이 **주 취향으로 2번, 부 취향으로 2번**씩 나오도록 맞춰서
네 가지 결과가 전부 나올 수 있게 설계했다.
동점이면 → 마지막 문항이 가장 크게 민 취향 → 그래도 동점이면 `photo > food > cafe > solo` 순.

배분을 건드리면 `node src/quiz.check.ts` 가 깨진 걸 잡아준다.

---

## 4-1. 히어로 섹션 (2026-08-30 교체)

`전체전체.html` 의 HERO 디자인을 그대로 이식했다. 이전의 노랑 블롭 티켓은 폐기.

```
┌─ .ticket-wrap  (rotate -1.5deg + drop-shadow, hover 시 살짝 뜸) ────────┐
│ ┌─ .ticket-main  73% ───────────────┊─ .ticket-stub  27% ──────────┐ │
│ │  ★ 오늘, 대전행 티켓              ┊  DESTINATION                │ │
│ │                                   ┊  DAEJEON →                  │ │
│ │  기분이 이끄는 대로,               ┊                             │ │
│ │  일단 대전행.        ← 파랑+노랑밑줄┊  PASSENGER   PLAN           │ │
│ │                        ┌────────┐ ┊  MOOD        DEPARTURE      │ │
│ │  계획은 도착해서…       │ 꿈돌이  │ ┊                             │ │
│ │                        └────────┘ ┊  [ 내 취향 찾기 → ]  ← 팝업  │ │
│ │  FROM → TO      🚂낙서  ⭕도장    ┊  ▊▊▊  DAEJEON/SOLO/ONE WAY  │ │
│ └───────────────────────────────────┊─────────────────────────────┘ │
└────────────────────── 절취선(구멍 + 점선) ───────────────────────────┘
```

원본 HTML에서 그대로 가져온 것 : 하늘색 그라데이션 배경, 종이 질감(4겹 그라데이션),
`clip-path` 티켓 모서리·스텁 톱니, 절취선 + 위아래 반원 구멍, ARRIVED DAEJEON 도장,
기차 낙서, 바코드, FROM/TO 라인, 파란 강조 + 노란 밑줄 제목.

**원본 HTML에서 바꾼 것**

1. 스텁 CTA `a` → `button` (팝업 트리거). 문구는 원본과 동일한 `내 기분 따라 출발하기`.
2. 원본에 없던 **꿈돌이**를 `.ticket-main` 오른쪽에 넣었다.
3. **메인 메시지 교체 + 손글씨 폰트** (아래 참조).

### 메인 메시지 — 손글씨

없앤 INTERRUPT 섹션의 문구를 히어로 제목으로 끌어올렸다.

| | 이전 | 현재 |
|---|---|---|
| 제목 | 기분이 이끄는 대로, / 일단 대전행. | **대전**, 얼마나 재밌을지 / 감도 안 옴;; |
| 카피 | 계획은 도착해서 생각해도 되니까. | 괜찮아요. 저희도 처음에는 성심당밖에 몰랐습니다. / 그래서 직접 찾아봤어요. |

```css
.dj-page .hero-title{
  font-family:"Nanum Pen Script","Gaegu","Pretendard",sans-serif;  /* 구글폰트 */
  font-size:clamp(56px,6.6vw,104px);   /* 이전 clamp(44px,4.7vw,66px) */
  font-weight:400;                      /* 손글씨는 굵기 하나뿐 */
  line-height:1.12;
  letter-spacing:.005em;                /* 손글씨는 조이면 뭉갠다 */
  transform:rotate(-1deg);              /* 자유분방하게 살짝 기울임 */
}
```

`<strong>대전</strong>` 에만 파란색 + 노란 형광펜 밑줄(`::after`, height 10px, 라운드).
620px 이하에서는 52px, 카피는 `max-width:52%` 로 줄여 꿈돌이 자리를 비운다.

> 폰트는 `index.css` 맨 위 `@import` 로 불러온다. Google Fonts 이므로 오프라인이면
> `Gaegu` → `Pretendard` 순으로 폴백된다.

### 꿈돌이 이미지 규칙

원본은 대전시 「꿈돌이 디자인 가이드라인」 PDF 1페이지의 벡터 원화다.
원본은 대전시 「꿈돌이 디자인 가이드라인」 PDF 1페이지의 벡터 원화이며,
400dpi 로 뽑아 흰 배경만 지우고 투명 PNG(1000×954)로 만들었다.

가이드라인 지정 색 (임의 변경 금지):

| 부위 | HEX |
|---|---|
| 몸 | `#ffcf83` |
| 눈·외곽선 | `#695f55` |
| 별 | `#a7cef7` |
| 볼 | `#ff2192` 계열 |

**이미지는 항상 고정이다.** 관련 CSS:

```css
.dj-page .hero-kkumdori{
  position:absolute;
  right:30px;
  bottom:145px;                    /* 도장(bottom:35+높이95) 위로 15px 여유 */
  width:clamp(150px,15vw,215px);
  z-index:2;                       /* 제목(z-index:3) 보다 아래 */
  pointer-events:none;
  user-select:none;
}

.dj-page .hero-kkumdori img{
  width:100%;
  height:auto;      /* 비율 유지 — 늘어나거나 잘리지 않음 */
  transform:none;   /* 회전·기울임 없음 */
}
```

배치 근거 (1440px 기준 실측, `.ticket-main` 861×470):

| 요소 | x | y |
|---|---|---|
| 제목 1행 텍스트 | 58 ~ 536 | 103 ~ 316 |
| 꿈돌이 | 616 ~ 831 | 179 ~ 384 |
| 기차 낙서 | 591 ~ 686 | 429 ~ 471 |
| ARRIVED 도장 | 701 ~ 796 | 399 ~ 494 |

꿈돌이는 제목 오른쪽 빈 공간에 세로로 세워 도장·낙서 **위**에 올렸다.
`.ticket-wrap` 이 `rotate(-1.5deg)` 라 `getBoundingClientRect` 값은 왜곡된다 —
겹침을 확인할 땐 `offsetLeft/Top` 으로 재야 한다.

모바일(≤620px)에서는 도장·낙서가 숨으므로 꿈돌이를 `bottom:120px` 로 올려
FROM/TO 라인 위에 세운다.

> 카페 페이지의 👽(궁동 소신)는 **그대로 이모지로 두었다.**

---

## 4-1-1. 클릭 유도 마크 (2026-08-30)

히어로 스텁의 노란 CTA 바로 위. **시안 6종을 뽑아 사용자가 D안을 골랐다.**

```
      T A P   H E R E      <- 11px / 900 / 자간 .14em / rgba(32,32,32,.55)
            v              <- c1
            v              <- c2  0.16s 지연
            v              <- c3  0.32s 지연
  [ 내 기분 따라 출발하기 ]    <- 기존 .ticket-cta
```

| 항목 | 값 |
|---|---|
| 마크업 | `.click-mark` > `.click-cap` + `svg.chev` x 3 (`polyline 3,3 13,9 23,3`) |
| 셰브런 | 26px 폭, `stroke:#202020` 3px, round cap |
| 모션 | `clickDrop` 1.5s 무한. opacity .25 -> 1 + translateY -3 -> 2px, 0.16s 씩 지연 |
| 위치 | `.click-mark{ margin:auto auto 9px }` — `margin-top:auto` 를 CTA 에서 여기로 옮겼다 |
| 접근성 | `aria-hidden="true"` (장식). `prefers-reduced-motion` 이면 애니메이션 끄고 opacity .75 고정 |

> **주의** : `.ticket-cta` 의 `margin-top:auto` 를 `0` 으로 바꿨다. 마크를 지우려면
> CTA 에 `margin-top:auto` 를 되돌려야 스텁 하단 정렬이 유지된다.

탈락한 시안은 `prototypes/click-hint.html` 에 전부 남아 있다.
A 손그림 말풍선 / B 손글씨 + 스윙 화살표 / C 꼬리 달린 태그 / E 손가락 + 탭 물결 / F 승차권 스탬프

## 4-1-2. 기분 카드의 꿈씨패밀리 (2026-08-30)

`#choose` 카드 4개의 이모지를 대전 공식 캐릭터 **꿈씨패밀리** 일러스트로 교체했다.
「꿈씨패밀리 신규가이드 20260527」 PNG 120장 중 취향과 맞는 4장을 골라
설명문 영역을 잘라내고 트림해서 썼다.

| 카드 | 캐릭터 | 원본 |
|---|---|---|
| 📸 오늘 피드 좀 채워볼까? | 셀카봉 든 우주복 캐릭터 | 아트보드 71 |
| 🍽️ 맛집 도장깨기 | 빵 봉지 안고 뛰는 캐릭터 (영시축제) | 아트보드 64 |
| ☕ 기분에 따라 고르는 카페 | 화분 든 안경 쓴 캐릭터 | 아트보드 79 |
| 🌌 혼자 감수성 터지는 날 | 망원경으로 먼 곳 보는 캐릭터 | 아트보드 87 |

`.card-figure` 높이 150px, `object-fit:contain` 으로 비율 유지.
카드 hover 시 캐릭터만 살짝 떠오른다. 가이드 PDF 는 `imports/guideline/` 에 보관.

---

## 4-1-3. 상세 페이지 마무리 · 미션 섹션 (2026-08-30)

**포스트잇 제거** — photo · food · cafe 하단의 기울어진 노란 포스트잇(`.postit`)을 없애고,
감성 코스 페이지처럼 짧은 한 마디(`.page-outro`)로 바꿨다.

| 페이지 | 마무리 문구 |
|---|---|
| 인생샷 | 오늘 찍은 사진, / 생각보다 잘 나왔을 거예요. |
| 맛집 | 오늘 메뉴는 / 내 입맛대로. |
| 카페 | 머무는 시간도 / 내 기분대로. |

**TODAY'S PHOTO MISSION** — 파란 박스 + 하드섀도우를 걷어내고 위 장소 카드와 같은 결로 맞췄다.
흰 바탕 · 2px `#333` 테두리 · 라운드 18 · `6px 7px 0 rgba(0,0,0,.10)` · 2단 그리드 gap 30 —
`.place-card` 와 실측값이 완전히 같다. 항목마다 `.place-number` 를 닮은 원형 번호 배지를 달았다.

---

## 4-2. 한국어 가독성 규칙 (2026-08-30)

문구가 뚝뚝 끊겨 보이던 원인은 **문자열에 박아둔 `
` 강제 줄바꿈**이었다.
"오늘 SNS에 딱 한 장만 / 올릴 수 있다면?" 처럼 문장 중간에서 잘렸다.

`quiz.ts` 의 `
` 12곳을 전부 공백으로 바꾸고, 줄바꿈은 CSS 에 맡겼다. **문구 자체는 그대로다.**

```css
/* 한국어는 어절(띄어쓰기) 단위로 끊어야 읽힌다. */
word-break: keep-all;    /* 단어 중간에서 안 쪼개짐 */
text-wrap: balance;      /* 제목류 — 줄 길이를 고르게 */
text-wrap: pretty;       /* 본문류 — 외톨이 단어 방지 */
```

**선택자마다 붙이지 않는다.** 두 속성 모두 상속되므로 `.dj-page` 루트에 한 번만 건다.

```css
.dj-page{
  word-break: keep-all;
  overflow-wrap: break-word;   /* 띄어쓰기 없는 긴 문자열 안전장치 */
  text-wrap: pretty;
}

/* 제목류만 balance 로 덮어씀 */
.dj-page :is(h1,h2,h3),
.dj-page .quiz-question, .dj-page .result-title,
.dj-page .card h3, .dj-page .detail-title, .dj-page .hero-title{
  text-wrap: balance;
}
```

이 한 곳으로 **히어로 · 기분 카드 · 팝업 · 상세 4페이지 · 풋터까지 전 문장**에 적용된다.
`.quiz-question` `.choice-text` 의 `white-space:pre-line` 은 제거했다 (강제 줄바꿈이 없으니 불필요).
행간도 함께 넓혔다 — 질문 1.35→1.45, 선택지 1.45→1.55, 카드 본문 1.7.

> ⚠️ CSS 를 스크립트로 고칠 땐 **이미 `.dj-page` 가 붙어 있는지 확인할 것.**
> 한 번 `.dj-page .dj-page .choice-text` 가 되어 규칙이 통째로 죽었다.

---

## 4-3. 상세 페이지 공통 규칙

### CTA 통일 (2026-08-30)

네 페이지 모두 위·아래에 **똑같은 `.section-back` 하나**만 쓴다. 문구도 `← 기분 다시 고르기` 로 통일.

| | 이전 | 현재 |
|---|---|---|
| photo · food · cafe | `.section-back` (텍스트 + 노란 밑줄) | 그대로 |
| solo(감성) | 위: `.mood-back` 흰 박스 버튼 / 아래: `.cta` 노란 버튼 | **`.section-back` 으로 교체** |

`.mood-back` 규칙은 삭제했다.

**하단 CTA 는 버튼으로 승격했다.** 정중앙에 놓이는데 텍스트 링크로는 눈에 띄지 않아서,
사이트 공통 언어(노란 배경 + 3px 잉크 테두리 + 하드 섀도우)를 입혔다.

```css
.dj-page .section-back-bottom{
  margin:72px auto 0;
  padding:17px 30px;
  background:#ffd94a;
  border:3px solid #292929;
  border-radius:12px;
  box-shadow:5px 6px 0 #292929;
  font-size:17px;
}
.dj-page .section-back-bottom span::after{ display:none; }  /* 노란 버튼 위 노란 밑줄은 안 보임 */
```

네 페이지 모두 `204×67px`, 배경 `#ffd94a`, 테두리 3px 로 동일하다. 상단 CTA 는 텍스트 링크 그대로 둔다.
히어로 스텁 CTA 도 `justify-content:center` 로 문구를 가운데 정렬했다.

### 히어로 중앙 정렬

승차권 스텁은 좁은 세로 칼럼이라 가운데 정렬이 실제 티켓처럼 읽힌다.

| 대상 | 처리 |
|---|---|
| `.ticket-stub` | `text-align:center` |
| `.ticket-info` (PASSENGER/PLAN/MOOD/DEPARTURE) | `justify-items:center` |
| `.ticket-bottom` (바코드 + 번호) | `justify-content:center` |
| `.route` (FROM → TO) | `text-align:center` |
| `.ticket-cta` | `justify-content:center` |

**메인 패널의 제목·카피는 왼쪽 정렬 그대로 둔다.** 오른쪽에 꿈돌이가 서 있어서
가운데로 옮기면 무게중심이 겹친다.

### 뒤로가기 ↔ eyebrow 간격

`.section-back` 이 `inline-flex` 라서 뒤따라오는 `.detail-eyebrow` 가 **같은 줄에 딱 붙어** 있었다
(photo · food 에서 가로 간격 0px). 블록으로 바꾸고 여백을 키웠다.

```css
.dj-page .section-back{
  display:flex;        /* inline-flex 였음 — 이게 원인 */
  width:fit-content;   /* 밑줄이 글자 폭에만 걸리게 */
  margin-bottom:58px;  /* 35px 였음 */
}
```

네 페이지 모두 세로 간격 **55~61px** 확보.

### 실사진 적용 현황

이모지 자리표시자를 실사진으로 교체했다.

**인생샷 코스** (🌉🎨✦🏛️ → 사진)

| 카드 | 파일 | 원본 |
|---|---|---|
| 01 엑스포다리 | `imports/photo/expo-bridge.jpg` | 엑스포 다리.jpg |
| 02 이응노미술관 | `imports/photo/ungno-museum.jpg` | 이응노 미술관.jpg |
| 03 엑스포과학공원 한빛탑 | `imports/photo/hanbit-tower.jpg` | 엑스포과학공원 한빛탑.jpg |
| 04 대전근현대사전시관 | `imports/photo/modern-history.jpg` | 대전근현대전시관.jpg |

**맛집 코스** (🍣🍝🥢 → 사진)

| 카드 | 파일 | 출처 |
|---|---|---|
| 01 토미야 | `imports/food/tomiya.jpg` | 인포그래픽 크롭 (30,296)-(412,620) |
| 02 트리니트 비스트로 | `imports/food/trinite.jpg` | 인포그래픽 크롭 (390,640)-(734,1020) |
| 03 희락반점 | `imports/food/huirak.jpg` | 인포그래픽 크롭 (30,1106)-(412,1402) |

> 팀에서 만든 「대전 맛집 도장깨기」 인포그래픽(1024×1536 PNG)에서 음식 사진만 잘라냈다.
> `BLUE RIBBON 01 일식` 배지가 사진 위에 겹쳐 있어 배지 아래부터 크롭했다.

**카페 코스** (👽☕📖 → 사진)

| 카드 | 파일 | 원본 |
|---|---|---|
| 궁동 소신 (`#sosin`) | `imports/cafe/sosin.jpeg` | 궁동 소신.jpeg |
| 갈마동 톨드어스토리 (`#told`) | `imports/cafe/told-a-story.jpg` | 톨드어스토리 카페.jpg |
| 대흥동 쌍리 (`#ssangri`) | `imports/cafe/ssangri.jpeg` | 대흥동 쌍리.jpeg |

> **소신 사진만 크롭 위치를 따로 잡았다.** 원본이 512×512 정사각이라 `object-position:center`
> 로 자르면 y 109~402 만 보여 꿈돌이 케이크 얼굴(눈 y≈430)이 잘렸다.
> `#sosin .cafe-photo img{ object-position:center 90% }` 로 아래쪽을 당겨
> 1440px 에서 y 198~490(눈·케이크 전체 포함), 375px 에서 y 93~502(별까지 전체) 가 보인다.

> **원본 폴더가 사라져도 계속 나온다.** `OneDrive/Pictures/대전 사진` 을 참조하지 않고
> `src/imports/photo/` 로 **복사해서 import** 했다. Vite 가 번들에 넣으므로
> 원본 경로가 바뀌거나 없어져도 영향이 없다.

`object-fit:cover` 로 320px 높이에 맞춰 채우고, 기존 그라데이션 배경은 로딩 전 바탕으로 남겨뒀다.
사진을 바꾸려면 `src/imports/photo/` 의 파일을 같은 이름으로 덮어쓰면 된다.

---

## 5. 검증 완료 항목

```bash
cd extracted
node src/quiz.check.ts     # 16개 조합 전부 통과 → { photo:3, food:3, cafe:5, solo:5 }
npx tsc --noEmit           # 통과
npm run build              # 통과
```

브라우저에서 실제 클릭으로 확인한 것:

- [x] 카드 4개 → 각자 맞는 페이지 (섹션 클래스·제목 대조)
- [x] 퀴즈 8개 경로 → 네 취향 전부 나오고 각각 맞는 페이지 도달
- [x] ESC 닫기 / 배경 클릭 닫기 / 이전 질문 / 다시 하기
- [x] 팝업 닫힐 때 body 스크롤 잠금 해제
- [x] 상·하단 「기분 다시 고르기」 복귀, 전환 시 스크롤 최상단
- [x] 카페 페이지 내부 앵커 3개 (`#sosin` `#told` `#ssangri`)
- [x] 데스크톱 1440px : photo 2단 / food 3단 / cafe 3단
- [x] 모바일 375px : 전부 1단, 가로 스크롤 없음, 터치 타겟 44px
- [x] 콘솔 에러 0건
- [x] 히어로 꿈돌이 : 회전 없음(`none`), 비율 유지, 도장·낙서·루트·제목과 겹침 0
- [x] 히어로 브레이크포인트(1440 / 375) 겹침 없음, 가로 스크롤 없음
- [x] 손글씨 폰트 로드 확인 (`document.fonts.check`)
- [x] 네 페이지 CTA 동일(`.section-back` × 2, 문구 동일), 뒤로가기↔문구 간격 55~61px
- [x] 인생샷 사진 4장 · 카페 사진 3장 로드 및 카드 매칭 확인 (1440 / 375 양쪽)
- [x] 소신 사진 크롭 — 눈·케이크 전체가 화면에 들어오는지 좌표로 검증
- [x] 맛집 사진 3장 매칭 및 번호 배지 정상, **전 페이지 이모지 자리표시자 잔여 0**
- [x] 팝업 4문항 · 선택지 8개 모두 어절 단위로 자연스럽게 줄바꿈 (강제 `
` 잔여 0)
- [x] 하단 CTA 네 페이지 동일 (204×67, `#ffd94a`, 3px, 17px), 모바일 터치 타겟 67px
- [x] 히어로 스텁 CTA 좌우 여백 26px 동일 → 정중앙
- [x] 한국어 줄바꿈 규칙이 루트 상속으로 전 문장에 적용 (히어로 카피까지 `keep-all`/`pretty` 확인)
- [x] 맛집 메뉴 9줄 가격 우측 끝 픽셀 일치 (1440 / 375 양쪽), 주소·도보 표기 정상
- [x] 히어로 스텁 중앙 정렬 (스텁·정보그리드·바코드행·FROM/TO)
- [x] 사진 영역 안 텍스트 전수검사 — `place-number` `restaurant-number` `restaurant-category` 넘침 0

---

## 6. 작업 중 잡은 버그 (재발 주의)

| 증상 | 원인 | 조치 |
|---|---|---|
| 결과창 버튼 눌러도 이동 안 됨 | `onClose()` 전에는 `body`가 `overflow:hidden` 상태 | 잠금 먼저 풀고 이동 |
| 모바일 스타일이 통째로 안 먹음 | 미디어쿼리 안 규칙에 `.dj-page` 스코프 누락 → 밖의 규칙에 짐 | 미디어쿼리 안에도 스코프 부여 |
| 닫기 버튼이 54×42로 찌그러짐 | 원본 `.dj-page button { padding:16px 26px }` 상속 | `padding:0` 으로 차단 |
| 맛집 카드 번호(01·02·03)가 원 밖으로 튀어나옴 | `.restaurant-number` 에 `font-size` 가 없어 부모 `.restaurant-photo` 의 **이모지용 75px** 를 상속 → 43px 원에 89px 글자 | `font-size:15px; line-height:1` 명시. **큰 `font-size` 를 쓰는 사진 영역 안에 텍스트를 넣을 땐 반드시 크기를 명시할 것** |
| 브라우저 패널 실측값이 뒤죽박죽 | 패널이 화면을 축소 렌더 → `vw`·미디어쿼리는 1440 기준인데 실제 폭은 더 좁음. 백그라운드 탭은 레이아웃 자체가 안 잡힘 | **활성 탭에서** 재고, 값이 이상하면 새로고침 후 재측정 |

---

## 7. 남은 일 / 팀원 대기

- [x] ~~사진~~ — 네 페이지 모두 실사진 적용 완료 (2026-08-30)
- [x] ~~맛집 3곳의 `MENU` · `LOCATION`~~ — 팀 인포그래픽 값으로 입력 완료 (2026-08-30)

      메뉴는 `.menu-line` 으로 이름/가격을 양끝 배치하고 가격에 `tabular-nums` 를 걸어
      세 줄의 가격 끝이 픽셀 단위로 맞는다. 주소 아래 도보 안내는 `.food-walk`.

      ⚠️ 인포그래픽 원문의 `채끝 스테이코` 는 오타로 보여 **`채끝 스테이크`** 로 넣었다. 확인 필요.

      입력한 값 ↓

```
토미야       대전 중구 대흥로529번길 18 (대전역 도보 10분)
             토리텐붓카케 13,000 / 니꾸우동 11,000 / 붓카케우동 8,500
트리니트     대전 유성구 계룡로123번길 45 (유성온천역 도보 5분)
             트러플 크림 뇨끼 19,000 / 라구 파스타 18,000 / 채끝 스테이코 32,000
희락반점     대전 동구 대전로 829 (대전역 도보 8분)
             유니짜장 8,000 / 탕수육 20,000 / 짬뽕 9,000
```
- [ ] **인스타 링크** — `https://instagram.com/` 루트로 비어 있음
- [ ] `Downloads/음식까지.html` (2026-08-30 01:02) — 팀이 새로 올린 것으로 보이나 아직 열지 않았다.
      다음 작업 전에 내용 확인 필요

---

## 8. 실행 방법

```bash
cd extracted
npm run dev
```

→ http://localhost:8443

---

## 9. 다음 작업 시작 전에

`LANDING_GUIDE.md` 0장 규칙대로 **관련 파일을 먼저 읽고 → 이해한 내용을 확인받은 뒤 → 수정**한다.
특히 첨부 파일이 새로 오면 하던 작업을 멈추고 다시 확인한다.
(이번 세션에서 `전체전체.html` 이 뒤늦게 들어와 만들던 것을 두 번 버렸다.)

---

## 10. 작업 이력 (2026-08-30)

시간순으로 이번 세션에서 한 일. 되돌릴 때 참고.

| # | 작업 | 건드린 파일 |
|---|---|---|
| 1 | 팝업 + 퀴즈 + 결과창 구현, 카드 4개 전부 페이지 연결 | `quiz.ts` `quiz.check.ts` `QuizModal.tsx` `App.tsx` `index.css` |
| 2 | photo · food · cafe 페이지를 `전체전체.html` 섹션 그대로 이식 | `PhotoPage.tsx` `FoodPage.tsx` `CafePage.tsx` `index.css` |
| 3 | 히어로 👽 이모지 → 공식 꿈돌이 이미지 (가이드라인 PDF에서 추출) | `imports/kkumdori.png` `App.tsx` `index.css` |
| 4 | 홈에서 장소·타임라인·게임·팀소개 4개 섹션 제거 | `App.tsx` `index.css` |
| 5 | 히어로를 `전체전체.html` 티켓 디자인으로 교체 + 꿈돌이 재배치 | `App.tsx` `index.css` |
| 6 | CTA 문구 복구, INTERRUPT 섹션 제거, 메인 메시지 손글씨 교체 | `App.tsx` `index.css` |
| 7 | 뒤로가기↔문구 간격 수정, 인생샷 실사진 4장 | `index.css` `PhotoPage.tsx` `imports/photo/` |
| 8 | 네 페이지 CTA 디자인 통일 (`.section-back`) | `MoodCoursePage.tsx` `index.css` |
| 9 | 맛집 번호 배지 글자 넘침 수정 | `index.css` |
| 10 | 카페 실사진 3장 + 소신 크롭 조정 | `CafePage.tsx` `index.css` `imports/cafe/` |
| 11 | 맛집 실사진 3장 (인포그래픽 크롭) | `FoodPage.tsx` `index.css` `imports/food/` |
| 12 | 한국어 줄바꿈 규칙을 루트에 적용 + 팝업 강제 줄바꿈 12곳 제거 | `quiz.ts` `index.css` `LANDING_GUIDE.md` |
| 13 | 히어로 문구 정리 (`오늘의 대전행 티켓`, `DAEJEON`, CTA 화살표 제거) + 스텁 중앙 정렬 | `App.tsx` `index.css` |
| 14 | 맛집 메뉴·주소 실제 값 입력 | `FoodPage.tsx` `index.css` |
| 15 | 팝업 보조 CTA 를 텍스트 링크로 (버튼 그림자 상속 제거) | `index.css` |
| 16 | 승차권 절취 전환 프로토타입 제작 **(앱 미적용)** | `prototypes/ticket-tear.html` |
| 17 | 히어로 CTA 위 클릭 유도 마크 (시안 6종 중 D안 채택) | `App.tsx` `index.css` `prototypes/click-hint.html` |

### 프로토타입 폴더

`prototypes/` 는 **랜딩페이지 산출물이 아니라 실험용**이다. 앱은 여전히 `extracted/` 하나뿐.
아티팩트로 게시한 데모의 원본이 세션과 함께 사라지지 않게 여기 복사해 둔 것이다.

**되돌리기 기준점** : Figma Make 원본은 `Finalize design.zip` 에 그대로 있다.
팀이 준 최신 HTML 은 `reference-full.html`.

### 버린 접근 (다시 하지 말 것)

- `courses.ts` + 공용 `CoursePage.tsx` 로 네 코스를 한 데이터 구조에 묶으려 했으나,
  페이지마다 레이아웃이 완전히 달라서 폐기했다. 각 페이지는 각자 컴포넌트로 둔다.
- React 를 순수 HTML 한 벌로 뽑아보기도 했으나 **사용하지 않기로 했다.**
