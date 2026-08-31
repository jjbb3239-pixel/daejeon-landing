# 대전 랜딩페이지 — 진행 상황

최종 갱신 : **2026-08-31**
작업 대상 : `extracted/` (React 19 + Vite + TypeScript)
실행 : `cd extracted && npm run dev`

| 무엇 | 어디 |
|---|---|
| 라이브 | https://extracted-mu.vercel.app/ |
| 코드 | https://github.com/jjbb3239-pixel/daejeon-landing (private) |

`main` 에 push 하면 Vercel 이 자동 재배포한다.
**Figma 는 쓰지 않는다** (2026-08-31 팀 결정). 만들지도 갱신하지도 말 것.

---

## ⏭ 다음에 켰을 때 여기부터

### 1. 이 문서를 읽는 순서

```
0 ~ 0-7 절   지금 코드 상태.  ← 여기만 보면 된다
1 ~ 9 절     개편 전 기록.    참고용. 지금 코드와 다르다
```

2026-08-31 에 「최종 수정본.html」 디자인으로 **전면 개편**했다. 뷰 전환 라우팅을
버리고 한 페이지 앵커 스크롤이 됐다. 1절 이후의 설명(코스 페이지 4개, 승차권 찢기
전환, 손글씨 히어로 등)은 **지금 코드에 없다.**

### 2. 지금 페이지 구성

```
히어로 → #choose → #photo → #food → #cafe → #course → #proof → #festival
       → 최종 CTA → 푸터
       + 플로팅 「내 기분 알아보기」 + 기분 테스트 모달
```

### 3. 바로 채워야 하는 값 3가지

**① 인스타그램 주소** — `src/links.ts` 한 줄만 채우면 3곳에 반영된다.

```ts
export const INSTAGRAM = "";   // 비어 있으면 반투명·클릭불가로 그려진다
```

**② 팀 정보** — `src/sections/SiteFooter.tsx` 의 `TEAM` 상수.
팀 이름 / 팀원 / 문의 메일. 흐린 이탤릭으로 표시돼 있어 눈에 띈다.

**③ 장소 사진 16장 출처** — 같은 파일 `CREDITS` 의 「장소 사진」 항목이
「출처 확인 중」이다. 촬영자를 몰라서 임의로 적지 않았다.

### 4. 전반 점검에서 나왔지만 아직 안 한 것

| | 내용 | 근거 |
|---|---|---|
| 전환 | 섹션 중간 CTA 없음 | 히어로 612px → 최종 12,436px 사이 진입점이 플로팅뿐 |

~~모바일 30화면~~ → **14.3화면으로 줄임** (0-8 절, 되돌리기 스위치 있음)
~~터치 타겟 20곳~~ → **전부 44px 이상** (0-8 절)

자세한 측정값은 0-7 · 0-8 절.

### 5. 마지막 배포 확인 (2026-08-31)

```
robots        색인 허용
og:image      200 응답
파비콘        적용
jsdelivr      요청 0건 (폰트 자체 호스팅 886KB)
Pretendard    정상 적용
지연 로딩     30 / 31
인스타 링크   3곳 대기 상태
```

---

## 0. 전면 개편 (2026-08-31) — 여기부터 읽을 것

팀 회의 결과 **「최종 수정본.html」(Downloads) 디자인으로 전면 교체**했다.
그 전까지의 내용(1~7절)은 **개편 전 기록**이다. 지금 코드와 다르므로 참고용으로만 본다.

### 무엇이 바뀌었나

```
개편 전                              개편 후
────────────────────────────         ────────────────────────────
뷰 전환 라우팅 (view state)            한 페이지 앵커 스크롤
홈 + 별도 페이지 4개                   #choose #photo #food #cafe #course #festival
                                     전부 한 화면에 이어붙임
```

| | 개편 전 | 개편 후 |
|---|---|---|
| 히어로 | 손글씨 승차권 (아이보리) | 파란 배경 + 회전 승차권, `TODAY → DAEJEON` |
| 기분 카드 | 흰 카드 4장 | 사진 영역 220px + 카드별 회전·액센트 컬러 |
| 퀴즈 | 4문항 2지선다 | **그대로 유지.** 화면만 새 디자인(4지선다 그리드 아님) |
| 4번째 취향 | `solo` 혼자 감수성 | **`course` 아무 생각 하기 싫은 날** (카드·섹션과 이름 일치) |
| 결과 후 | 승차권 찢기 2초 → 페이지 전환 | 해당 섹션으로 스크롤 |
| 축제 섹션 | 없음 | **신규** (콘텐츠페어·빵축제·동구동락 + 유성온날 + 인스타 박스) |
| 최종 CTA | 없음 | **신규** |
| 플로팅 버튼 | 없음 | **신규** |

### 파일 구조

```
src/
  App.tsx              8개 섹션 조립 + 모달 상태
  index.css            최종 수정본.html 의 CSS 그대로 + ADDITIONS 구역
  MoodTest.tsx         기분 테스트 모달 (새 디자인 + 기존 퀴즈)
  quiz.ts              문항·판정 로직 그대로. solo → course 로만 개명
  quiz.check.ts        16조합 검증 + target 이 섹션 id 와 맞는지도 확인
  ticketTear.ts        **연결 안 함.** 보관용 (사용자 요청)
  sections/
    Hero · MoodSelect · PhotoSection · FoodSection
    CafeSection · CourseSection · ProofSection · FestivalSection
```

삭제한 파일 : `PhotoPage` `FoodPage` `CafePage` `MoodCoursePage` `QuizModal`

### 내용을 어디서 가져왔나

**원칙 : 디자인은 새 HTML 을 그대로. 내용은 새 HTML 이 비었거나 빈약하면 기존 페이지 것.**

| 섹션 | 본문 출처 | 이유 |
|---|---|---|
| 사진 | **기존 페이지** | 새 HTML 설명이 요약본이라 기존이 더 충실 |
| 맛집 | **기존 페이지** | 새 HTML 은 `확인 후 입력` 상태였다 |
| 카페 | **기존 페이지** | 사용자 지시 |
| 코스 | 새 HTML | 이 디자인에 맞게 쓰였고 내용도 충분 |
| 히어로·축제·최종 | 새 HTML | 기존에 없던 내용 |

### 이미지

새 HTML 의 `images/*.jpg` 21곳은 전부 실제 파일이 없었다. 기존 자산으로 연결했다.

| 새 HTML | 실제 파일 |
|---|---|
| leeungno-museum | `photo/ungno-museum.jpg` |
| trinit-bistro / heerak | `food/trinite.jpg` / `food/huirak.jpg` |
| sosin / ssangri | `.jpeg` 확장자 |
| soje-dong / gumo-cloudbook / daedong-skypark / sikjangsan | `imports/` 의 한글명 4장 |
| mood-photo/food/cafe/course | **사진 대신 꿈씨패밀리 캐릭터** |

**아직 없는 것 — 축제 사진 3장.** 사용자가 직접 넣기로 했다.
넣는 곳은 `sections/FestivalSection.tsx` 의 `FESTIVAL` 배열에 `photo` 필드 추가:

```tsx
import contentFair from "../imports/festival/daejeon-content-fair.jpg";
// ...
{ href: "https://dcfair.co.kr/", photo: contentFair, ... }
```

`photo` 가 없으면 `.festival-image.is-empty` 로 어두운 그라데이션 + 이모지가 나온다.
넣는 순간 자동으로 사진으로 바뀐다.

### 꿈돌이 · 꿈씨패밀리 배치

| 자리 | 캐릭터 | |
|---|---|---|
| 히어로 스탬프 뒤 | 꿈돌이 (`.stub-kkumdori`) | 168px, 살짝 회전, 스탬프가 반투명하게 덮음 |
| 사진 카드 | 셀카봉 든 꿈누리 | 요청과 정확히 일치 |
| 맛집 카드 | 빵 봉지 안은 온솔 | 가장 근접 |
| 카페 카드 | 화분 든 캐릭터 | **커피 포즈가 가이드에 없음** |
| 귀찮아 카드 | **엎드려 누운 꿈동이** (`kkumssi/lazy.png`) | 가이드 p42 에서 새로 추출 |

> 공식 가이드(120쪽)에 있는 응용 동작은 셀카봉·빵·망원경·쇼핑백·현미경·돈자루·
> 태블릿·화분·훌라후프·원반·주사기·안전모, 그리고 엎드려 누운 포즈뿐이다.
> **커피 마시는 / 음식 먹는 포즈는 없다.** 없는 포즈를 합성하면 브랜드 가이드 위반이라
> 만들지 않았다.

### 주의할 점

- **Tailwind 를 불러오지 않는다.** `@import 'tailwindcss'` 를 뺐다.
  preflight 리셋이 원본 h1/h2/h3 기본값을 덮어써서 디자인이 달라지기 때문.
  Tailwind 유틸리티 클래스는 이 프로젝트에서 안 쓴다.
- `index.css` 의 **ADDITIONS 구역 위쪽은 원본 CSS 그대로**다. 원본을 다시 받으면
  그 구역만 교체하면 된다.
- 부드러운 스크롤은 **브라우저 도구 창에서 안 움직인다** (rAF 정지). 실제 브라우저에서는
  정상. 즉시 스크롤로 바꿔 확인한 결과 목적지 좌표는 정확했다.

## 0-1. Social Proof 섹션 (2026-08-31)

`daejeon_compact_proof_only.html` 을 옮긴 것. **코스와 축제 사이**에 들어간다.

```
⑥ 코스  →  ⑦ SOCIAL PROOF (#proof)  →  ⑧ 축제  →  ⑨ 최종 CTA
```

4개 그룹(PHOTO / EAT / CAFE / COURSE) × 카드 2장 = 8장.
그룹 라벨은 기분 카드 이름과 같은 문구를 쓴다.

### 리뷰는 고정 데이터다

별점·리뷰 수·인용문·작성자는 **첨부 HTML 에 적혀 있던 값을 그대로 옮긴 상수**다.
API 연동이 아니므로 수치가 바뀌면 `ProofSection.tsx` 의 `GROUPS` 에서 직접 고친다.
하단 주석(`* 별점·리뷰 수는 …`)도 원문 그대로 두었다.

### 이미지 — 외부 URL 을 전부 끊었다

원본은 8장 중 **6장이 외부 핫링크**(위키미디어·네이버 블로그 썸네일·CloudFront·S3)였다.
언제든 깨지고 저작권도 불분명해서 기존 자산으로 바꿨다.

| 카드 | 원본 | 바꾼 것 |
|---|---|---|
| 엑스포다리 | 위키미디어 | `photo/expo-bridge.jpg` |
| 이응노미술관 | 네이버 블로그 | `photo/ungno-museum.jpg` |
| 톨드 어 스토리 | 네이버 블로그 | `cafe/told-a-story.jpg` |
| 쌍리 | CloudFront | `cafe/ssangri.jpeg` |
| 대동 하늘공원 | S3 | `imports/_______.jpg` |
| 식장산 | 위키미디어 | `imports/______.jpg` |
| 토미야 | base64 645KB | `imports/proof/tomiya.jpg` (90KB) |
| 희락반점 | base64 194KB | `imports/proof/heerak.jpg` (33KB) |

토미야·희락반점 두 장은 맛집 카드와 **다른 사진**(실제 방문 사진)이라 그대로 살렸다.
base64 로 두면 JSX 가 1.1MB 가 되므로 파일로 빼고 JPEG 으로 줄였다.
`.tomiya-photo` / `.heerak-photo` 의 `object-position` 미세조정도 같이 옮겼다.

### CSS 에서 뺀 것

첨부 HTML 의 전역 규칙은 **가져오지 않았다.** 기존 페이지를 깨뜨린다.

```css
img{height:100%;object-fit:cover}      /* 다른 섹션 이미지가 전부 늘어남 */
.section-inner{width:min(1400px,100%)} /* 컨테이너 폭이 달라짐 */
body{...}
```

`.proof-` 로 시작하는 규칙만 옮겼고, 삽입 스크립트에 이 두 가지가 섞여 들어오면
실패하도록 assert 를 걸어뒀다.

## 0-2. 히어로 스탬프 · 궁동 소신 크롭 (2026-08-31)

**히어로** : 스탬프가 꿈돌이 얼굴을 덮고 있었다. 스탬프를 아래로 내렸다.

```css
.stub-kkumdori{ top:0 }                        /* bottom -> top 기준으로 변경 */
.stub-stamp-wrap .ticket-stamp{ margin:105px 0 18px }   /* 28px -> 105px */
```

> 꿈돌이를 `bottom` 으로 잡아두면 스탬프 마진을 키울 때 같이 내려가서 간격이 그대로다.
> `top` 기준으로 바꿔야 스탬프만 내려간다.

측정 결과 : 꿈돌이 얼굴 끝 452px, 스탬프 윗변 460px → 얼굴이 완전히 드러난다.
바코드(626px)와 스텁 바닥(708px)은 그대로. `.ticket-barcode{margin-top:auto}` 가
남는 공간을 흡수한다.

**궁동 소신** : 원본 512×512, 카드 440×255(가로로 넓음). `object-fit:cover` 기본
중앙 크롭이면 **꿈돌이 케이크 얼굴(사진 세로 82% 지점)이 잘린다.**

```css
#sosin .cafe-image img{ object-position:50% 100% }
```

## 0-3. 축제 섹션 교체 (2026-08-31)

`전체전체_수정2index.html` 의 **07 WHAT'S ON IN DAEJEON** 으로 통째로 바꿨다.
클래스 이름이 `.festival-*` → `.festival-cph-*` 로 전부 달라졌다.

| | 이전 | 현재 |
|---|---|---|
| 배경 | 남색 `#202c49` | 크림 `#fff3d9` |
| 카드 | 사진 + 태그 + 버튼 | 그라데이션 + 이모지 + 핑크 월 배지 |
| 구성 | 콘텐츠페어 / 빵축제 / 동구동락 + 유성온날 별도 블록 | 유성온날 / 동구동락 / **10월 추천 PICK**(콘텐츠페어→빵축제 한 카드) |
| 하단 | 인스타 박스 | ALL EVENTS 링크(상단) + 인스타 버튼(하단) |

**축제 사진 3장 문제가 사라졌다.** 새 디자인은 사진 대신 이모지 비주얼(✨ / 🎤 / 🐱🍞)을
쓴다. `.festival-image.is-empty` 폴백 규칙도 같이 지웠다.

### 옛 CSS 를 반드시 걷어내야 했던 이유

`.festival-route` 가 양쪽에 다 있는데 **성격이 정반대**다.

```css
/* 옛것 */ .festival-route{ margin:0 0 55px; padding:30px 34px;
                            background:#ffdc3e; border:3px solid #101624; }
/* 새것 */ .festival-route{ margin-top:20px; padding-top:18px;
                            border-top:1px dashed #cfc3b0; }
```

새 규칙은 background/border/box-shadow/transform 을 되돌리지 않아서, 옛 규칙을 남겨두면
카드 안 코스 블록이 **노란 상자에 두꺼운 테두리**로 나온다. 옛 `07 FESTIVAL` 블록을
통째로 지우고, 공용 반응형 목록(`1050px` / `760px`)의 `.festival-grid` 와
`760px` 블록에 흩어져 있던 옛 축제 규칙도 같이 제거했다.

### 원본 CSS 의 중괄호 오류 (고쳐서 넣었다)

첨부 HTML 의 `@media(max-width:620px)` 는 닫는 중괄호가 너무 일찍 나온다.

```css
@media(max-width:620px){
  .festival-month-badge{...}
}                                     /* <- 여기서 닫힘 */
.festival-month-badge strong{...}     /* 기본 규칙 (정상) */
  .festival-cph-section{padding:75px 18px 85px}   /* 모바일 값이 전체 폭에 적용 */
  .festival-cph-heading h2{font-size:44px}        /* 데스크톱 제목이 44px */
  ...
}                                     /* <- 짝 없는 } */
```

짝 없는 `}` 때문에 **Vite 빌드가 CssSyntaxError 로 실패**한다. 그대로 둘 수 없어서
괄호 위치를 바로잡았다. 들여쓰기를 보면 원저자 의도도 이쪽이 맞다.

바로잡은 결과 (측정값) :

| | 데스크톱 1440px | 모바일 375px |
|---|---|---|
| 섹션 패딩 | `120px 30px 115px` | `75px 18px 85px` |
| h2 | 77.76px | 44px |
| 비주얼 높이 | 230px | 210px |
| 그리드 | 3열 | 1열 |
| 카드 회전 | 있음 | 없음 |

> 고치지 않았다면 데스크톱 제목이 44px 로 나와 다른 섹션(72px)과 어긋났을 것이다.

### 모바일 문장 붙음 보정

리드 문단은 `.festival-cph-heading p br{display:none}` 으로 모바일에서 `<br>` 이
사라지는데, JSX 가 줄바꿈 공백을 지워 `재미니까.지금` 처럼 붙었다. `{" "}` 를 넣었다.

## 0-4. 축제 포스터 · 최종 CTA 축소 · 푸터 (2026-08-31)

### 축제 포스터 4장

`OneDrive/Pictures/대전 사진` 의 포스터를 `imports/festival/` 로 옮겼다.
전부 **세로형 포스터(비율 0.70~0.81)** 라 가로로 납작한 비주얼 영역에 넣으면
행사 이름이 잘린다. 그래서 비주얼을 **정사각형**으로 바꿨다.

```css
.festival-cph-visual{ aspect-ratio:1/1 }   /* 원래 height:230px */
```

포스터 세로의 약 70% 가 보인다. 크롭 위치는 이름 위치에 맞춰 카드마다 다르다.

| 카드 | 파일 | object-position | 이름 위치 |
|---|---|---|---|
| 유성온날 | `yuseong-yuon.jpg` (174×250) | `50% 0%` | 상단 |
| 동구동락 | `donggu-dongrak.jpg` | `50% 50%` | 중앙 |
| 콘텐츠페어 | `content-fair.jpg` | `50% 45%` | 중앙 |
| 빵축제 | `bread-festival.jpg` | `50% 20%` | 상단 |

**3번 카드는 행사가 둘**이라 비주얼을 좌우로 나눈다 (`.is-split`).
나뉜 칸은 비율 0.5 로 매우 좁아서 cover 로는 포스터 좌우가 크게 잘린다.
이름이 온전히 보이는 게 우선이라 **여기만 `object-fit:contain`** 을 쓴다.

> `유성온날` 은 처음에 174×250 짜리를 써서 뿌옇게 나왔다. 2026-08-31 에 뉴시스
> 보도 이미지(720×973)로 교체했다. 푸터 출처에도 뉴시스를 표기했다.

이모지 비주얼(✨ 🎤 🐱🍞)은 사진으로 대체되어 없어졌다.

### 최종 CTA 축소

문구는 한 글자도 바꾸지 않고 높이만 줄였다.

| | 이전 | 현재 |
|---|---|---|
| 섹션 높이 | 722px | **419px (−42%)** |
| 패딩 | `115px 25px 125px` | `32px 25px 38px` |
| h2 | `clamp(48px,6vw,82px)` | `clamp(30px,3.2vw,46px)` |
| p | 17px / 마진 25·35 | 15px / 마진 12·18 |

> 패딩만 줄이면 563px 까지밖에 안 내려간다. 본문이 6줄(중간 빈 줄 포함)이라
> 글자 크기를 같이 줄여야 절반 가까이 온다.

### 푸터 (`SiteFooter.tsx`)

```
┌ footer-top ──────────────────────────────────┐
│ 브랜드 + 인스타      바로가기 7개     만든 사람 │
├ footer-credits ──────────────────────────────┤
│ 캐릭터 / 리뷰 / 행사 포스터 / 장소 사진         │
├ footer-bottom ───────────────────────────────┤
│ 변동 고지            © 2026        맨 위로 ↑   │
└──────────────────────────────────────────────┘
```

데스크톱 695px, 모바일 1329px(1열).

### 아직 안 정해진 값 — 지어내지 않았다

`SiteFooter.tsx` 의 `TEAM` 상수와 `CREDITS` 의 「장소 사진」 항목은 **자리표시자**다.

```tsx
const TEAM = {
  name: "팀 이름 (확인 중)",
  members: "팀원 명단 (확인 중)",
  email: "문의 메일 (확인 중)",
  instagram: "https://instagram.com/",   // 실제 계정 주소로 교체 필요
};
```

`.footer-team dd.is-todo` 로 흐린 이탤릭 처리해서 **그대로 배포되면 눈에 띄게** 해뒀다.
값이 정해지면 이 상수만 고치면 된다.

확실히 아는 출처만 적었다.

- **캐릭터** : 대전광역시 공식 캐릭터, 가이드라인 PDF 기준 — 확실
- **리뷰** : Google(via Wanderlog) · 다이닝코드 · 폴레 — 데이터에 출처가 적혀 있음
- **행사 포스터** : 각 주최 측 공식 홍보물 — 포스터에 주최 표기가 있음
- **장소 사진 16장** : **출처 확인 중** ← 촬영자를 모른다. 임의로 적지 않았다

## 0-5. 축제 CTA · 푸터 겹침 (2026-08-31)

### 축제 하단 CTA — 시안 5종 중 D 채택

안 보이던 원인은 색이다.

```
섹션 배경  #fff3d9   크림
버튼      #ffd94a   노랑     <- 둘 다 노란 계열. 명도 차가 거의 없었다
```

이미 팔레트에 있는 **코발트(`#2869d8`)** 를 버튼 배경으로 올려 새 색을 들이지 않고
대비를 만들었다. 노란색은 그림자와 화살표 원에만 남겼다.

```css
.festival-cph-button{
  background:#2869d8;
  color:#fff;
  box-shadow:6px 7px 0 #ffd94a,     /* 노란 판 */
             6px 7px 0 3px #292929; /* 그 위에 잉크 테두리 */
}
```

시안 모음 : `prototypes/festival-cta.html`
(A 잉크 블록 / B 와이드 배너 / C 인스타 그라디언트 / **D 코발트** / E 승차권 스텁)

> 시안 D 에는 `Instagram` 글자가 화살표 원으로 대체돼 있었는데, 링크 목적지를 알려주는
> 정보라 **글자를 살리고 화살표를 덧붙이는** 형태로 넣었다.

### 푸터 「맨 위로」 가 플로팅 버튼에 가려지던 문제

`.floating-mood` 는 `position:fixed; right:24px; bottom:24px` 다. 페이지 맨 아래까지
내리면 푸터 오른쪽 아래에 있던 「맨 위로」가 **완전히 그 안에 들어가** 클릭도 안 됐다.

측정값 (1440×900) : 맨 위로 `1296~1371 × 830~866` / 플로팅 `1263~1401 × 825~876`

**맨 위로를 푸터 첫 줄 오른쪽으로 올렸다** (`.footer-jump`). 저작권 줄도 덮이지 않게
데스크톱은 `padding-right:190px`, 모바일은 대신 `padding-bottom:88px` 을 줬다.

고친 뒤 푸터에서 플로팅 버튼과 겹치는 요소 0개 (데스크톱·모바일 모두 확인).

> **푸터에 무언가를 추가할 때는 오른쪽 아래를 비워둘 것.** 그 자리는 플로팅 버튼 몫이다.

## 0-6. 코스 카드 · 공유 버튼 (2026-08-31)

### 코스 STOP 카드 — 사진이 76% 잘리던 문제

사진을 카드 위에 가로로 깔던 구성이 원인이었다.

```
카드 886 × 424
├ 사진 882 × 210   비율 4.2  <- 너무 납작
└ 글   882 × 210             정확히 세로 50:50
```

코스 사진 4장은 비율이 `1.0 · 1.0 · 1.23 · 1.5` 로 정사각에 가깝다.
납작한 칸에 `cover` 로 넣으니 **세로 24% 만 보였다.**

**PC 에서만 문제였던 이유** : 모바일은 폭이 좁아 칸 비율이 4.2 → 1.5 로 떨어져
67% 가 보인다. 사진이 아니라 칸 모양이 문제였다.

계산해본 선택지 (정사각 사진 기준)

| 안 | 배치 | 보이는 정도 |
|---|---|---|
| 그대로 | 위아래 5:5 | 24% |
| 위아래 4:6 | 사진 210 → 133px | **15% — 더 나빠짐** |
| 좌우 4:6 | 사진 353×210 | 59% |
| **좌우 4:6 + 사진 1:1** | 사진 353×353 | **100%** ← 채택 |

> **위아래 구성에서 사진 비율을 줄이면 역효과다.** 칸이 더 납작해져서 더 잘린다.

```css
.stop-card{ display:grid; grid-template-columns:4fr 6fr }
.stop-photo{ aspect-ratio:1/1; border-right:2px solid #292929 }
```

결과 : 카드 886×357 (이전 424 보다 오히려 낮아짐), 사진 353×353, 글 529×353.
**760px 이하에서는 원래대로 사진을 위로 되돌린다** — 좁은 화면에서 좌우로 나누면
사진 칸이 너무 좁아지고, 모바일은 지금도 잘 보인다.

### 푸터 공유 버튼

인스타그램 버튼 옆에 나란히. 환경에 따라 두 갈래로 동작한다.

| 환경 | 동작 |
|---|---|
| `navigator.share` 지원 (주로 모바일) | OS 공유 시트 |
| 미지원 (주로 PC) | 링크를 클립보드에 복사 + 「링크가 복사됐어요」 |

복사는 두 단계로 시도한다. `navigator.clipboard.writeText` 가 거부되면
`execCommand('copy')` 로 한 번 더. 둘 다 막히면 안내 문구를 띄운다.

> **확인 못 한 것** : 브라우저 도구 창이 스크립트에서의 클립보드 접근을 막아
> (`NotAllowedError`) **복사가 실제로 되는지는 확인하지 못했다.** 버튼이 눌리고
> 대체 경로까지 타서 안내가 뜨는 것까지만 확인했다. 실제 브라우저에서 눌러볼 것.

## 0-7. 전반 점검 반영 (2026-08-31)

마케팅·기술 관점 전반 점검에서 나온 항목을 처리했다.

### 검색·공유

| | 이전 | 현재 |
|---|---|---|
| robots | `noindex, nofollow` | 색인 허용 (`site.json` 의 `robots.index: true`) |
| og:image | 없음 | `public/og-image.jpg` 1200×630 (63KB) |
| 파비콘 | 없음 | `favicon-32.png` · `apple-touch-icon.png` (꿈돌이 얼굴) |
| canonical · og:url/type · twitter:card | 없음 | 추가 |

> **noindex 는 Figma Make 기본값이었다.** 랜딩페이지인데 검색에 안 잡히고 있었다.
> OG 이미지는 `tools-subset-font.py` 옆 스크립트가 아니라 스크래치패드의
> `make_og.py` 로 만들었다. 승차권 디자인을 그대로 재현한 것이라 다시 만들 일이
> 있으면 히어로 색·문구만 맞추면 된다.

### 인스타그램 링크 — 비워둔 상태

주소가 아직 없어서 `src/links.ts` 한 곳에 모아두고 **비워뒀다.**

```ts
export const INSTAGRAM = "";   // 주소가 정해지면 여기만 채우면 3곳에 반영
```

비어 있는 동안에는 `.is-pending` 이 붙어 **반투명 + 클릭 불가**로 그려진다.
인스타그램 홈으로 잘못 보내는 것보다 낫고, 안 채운 게 눈에 띈다.
적용된 곳 : 축제 `ALL EVENTS` · 축제 하단 CTA · 푸터 `Instagram ↗`

### 퀴즈

- **이전 질문** 버튼 추가 (`.test-back`). Q2 부터 나온다. 잘못 눌러도 처음부터
  다시 안 해도 된다.
- **결과 공유하기** 버튼 추가. 결과 화면이 가장 공유하고 싶은 순간이라 푸터보다
  여기가 낫다. 공유 문구에 판정된 기분 이름이 들어간다.
- 공유 로직은 `src/share.ts` 로 빼서 푸터와 같이 쓴다.

### 성능

| | 이전 | 현재 |
|---|---|---|
| 이미지 지연 로딩 | 0 / 31 | **30 / 31** (히어로 꿈돌이만 즉시 + `fetchPriority=high`) |
| 폰트 | jsdelivr 에서 5종 **3.9MB** | 자체 호스팅 서브셋 **885KB** (−78%) |

### ⚠️ 폰트도 Git LFS 에 걸린다 — 두 번째로 당했다

`extracted/.gitattributes` 는 `*.woff2` 도 LFS 로 잡는다. 그대로 push 하면
131바이트 포인터가 올라가고, **Vercel 은 LFS 를 안 받아와서 폰트가 통째로 폴백된다.**
이미지 때와 똑같은 함정이다. `git lfs untrack` 으로 풀고 재커밋했다.

```bash
git lfs ls-files    # 아무것도 안 나와야 정상
```

**새 바이너리(폰트·이미지·영상)를 추가할 때마다 이걸 확인할 것.**

### 폰트 서브셋 — 다시 만드는 법

```bash
python tools-subset-font.py
```

KS X 1001 상용 한글 2,350자 + 소스에 실제로 쓰인 글자 = 2,553자.
**상용 한글 밖의 희귀 글자를 쓰면 그 글자만 폴백된다.** 그럴 땐 스크립트를 다시 돌린다.
결과물은 `src/fonts/` 에 들어가고 `index.css` 가 `@import "./fonts/pretendard.css"` 로 부른다.

### 명도 대비 (WCAG AA 4.5:1)

미달 7곳을 고쳤다. 전부 통과.

| 항목 | 이전 | 현재 |
|---|---|---|
| 리뷰 출처 | 3.13 (9px) | **5.56** (10px) |
| 리뷰 수 | 3.34 | **5.56** |
| 푸터 저작권 · 자리표시자 · 라벨 · 고지 | 3.45~4.49 | **6.28** |

### 히어로

CTA 아래 `● 4개의 질문 · 바로 결과 확인` 문구를 제거했다.

### 아직 안 한 것 (점검에서 나왔지만 보류)

- 섹션 중간 CTA 추가 (히어로 612px → 최종 12,436px 사이에 진입점 없음)
- 모바일 길이 축소 (24,490px = 30화면)
- 터치 타겟 44px 미달 20곳
- 팀 정보 · 장소 사진 출처 자리표시자

---

# ⚠️ 여기부터는 개편 전(2026-08-30) 기록입니다

아래 1~9 절은 **뷰 전환 라우팅 시절**의 설명입니다. 지금 코드와 다릅니다.
승차권 찢기 전환, 코스 페이지 4개, 손글씨 히어로 등은 현재 페이지에 없습니다.
당시 겪은 함정과 판단 근거를 남겨두려고 지우지 않았습니다.

---

## 0-8. 모바일 접기 · 터치 타겟 (2026-08-31)

### 기분 섹션 접기 — **되돌리려면 스위치 하나**

```ts
// src/features.ts
export const COLLAPSE_MOOD_SECTIONS_ON_MOBILE = true;   // ← false 로 바꾸면 원복
```

**`false` 하나면 예전처럼 네 섹션이 전부 펼쳐진 상태로 돌아간다.**
컴포넌트나 CSS 를 지울 필요 없다. `App.tsx` 의 `fold()` 가 껍데기를 안 씌우고
그냥 섹션을 그대로 내보낸다.

| | 이전 | 현재 |
|---|---|---|
| 모바일 전체 | 24,490px = **30.2화면** | 11,611px = **14.3화면** |
| PC | 13,282px = 14.8화면 | **그대로** (토글 숨김) |

왜 했나 : 기분 섹션 4개가 모바일에서 16.3화면(전체의 54%)인데, 방문자는
**넷 중 하나만 필요하다.** 퀴즈가 하나를 골라주는데 그 아래에 나머지 셋이
쌓여 있어서 페이지가 자기 컨셉과 반대로 동작하고 있었다.

동작 :

```
기분 카드 클릭  →  hashchange  →  해당 섹션 펼치고 스크롤
퀴즈 결과 CTA   →  onGoToMood  →  같은 처리
토글 직접 클릭  →  같은 걸 누르면 접힘, 다른 걸 누르면 그쪽만 펼침
```

- 한 번에 하나만 펼쳐진다.
- 섹션의 `id` 는 안쪽에 그대로 있어서 앵커가 그대로 동작한다.
- 접혀도 DOM 에는 있다 (`display:none`). 검색 노출에 영향 없다.
- PC(760px 초과)는 CSS 가 토글을 숨기고 본문을 항상 보여준다. 상태값과 무관.

> **접힌 섹션은 `scrollIntoView` 가 안 먹는다.** 펼친 다음에 위치를 재야 한다.
> `App.tsx` 의 `revealMood()` 가 `setOpenMood` → `setTimeout(0)` → 스크롤 순서로 처리한다.
> `requestAnimationFrame` 은 배경 탭에서 멈춰서 타이머를 쓴다.

### 터치 타겟 20곳 — 보이는 건 안 바뀜

`::after` 로 투명한 판을 깔아 손가락 영역만 넓혔다. 화면상 변화 없음.

| 대상 | 이전 | 방법 |
|---|---|---|
| `← 기분 다시 고르기` ×4 | 107×22 | `::after{inset:-12px -10px}` |
| `자세히 보기 ↗` ×2 | 68×22 | 〃 |
| 축제 코스 안 링크 ×2 | 57×16 | `::after{inset:-14px -12px}` |
| `ALL EVENTS` | 107×34 | `::after{inset:-8px -10px}` |
| 푸터 버튼 2 · `맨 위로` · 모달 닫기 | 3~10px 부족 | padding / width 만 조정 |
| **푸터 바로가기 ×7** | 117×16 | **실제로 여백 확대** (`padding:13px 0`) |

푸터 목록만 실제로 넓혔다. 16px 간격으로 붙어 있어서 넓히는 쪽이 보기도 좋다.

검증 : 클릭 가능 요소 34개 전부 44×44 통과. `elementFromPoint` 로 원래 영역
바깥 8~11px 지점도 링크가 받는 것 확인.

> `← 기분 다시 고르기` 의 노란 밑줄은 **자식 span 의 `::after`** 라서
> 부모에 `::after` 를 새로 써도 부딪히지 않는다.

## 1. 한눈에 보는 현재 동작 (개편 전)

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

## 8-1. 저장소 · 배포 (2026-08-30)

| 항목 | 값 |
|---|---|
| 저장소 | `jjbb3239-pixel/daejeon-landing` (**private**) |
| 브랜치 | `main` |
| 커밋 작성자 | `loco1497 <loco1497@naver.com>` (저장소 로컬 설정) |
| 크기 | 62개 파일 · 3.4MB |

### Vercel 설정 (이것만 틀리면 빌드 실패)

```
Framework Preset   Vite
Root Directory     extracted     <- 앱이 저장소 루트가 아니다
Build Command      npm run build
Output Directory   dist
Node.js Version    22            <- .mise.toml 기준
```

### 저장소에서 뺀 것

`extracted/src/imports/guideline/` — 브랜드 가이드 PDF 2종.
`꿈씨패밀리가이드.pdf` 가 105MB 라 GitHub 100MB 제한을 넘는다.
코드에서 참조하지 않으며, 여기서 추출한 캐릭터 PNG 는 `src/imports/kkumssi/` 에 커밋돼 있다.

### Git LFS 함정 (다시 걸리지 말 것)

`extracted/.gitattributes` 는 Figma Make 가 자동 생성한 것으로 **모든 이미지 확장자를
LFS 로 잡고 있었다.** Vercel 은 빌드 시 LFS 오브젝트를 받아오지 않아서, 그대로 두면
사진 대신 131바이트 포인터 파일이 번들에 들어가 전부 깨진다.

이미지 계열 확장자를 `git lfs untrack` 하고 `git rm --cached` 후 재커밋해서 일반 blob 으로
되돌렸다. **이미지를 새로 추가할 때 `.gitattributes` 가 되살아나지 않았는지 확인할 것.**

```bash
git lfs ls-files    # 이미지가 잡히면 안 된다
```

## 8-2. 공유 채널

| 무엇 | 어디 | 용도 |
|---|---|---|
| 라이브 | https://extracted-mu.vercel.app/ | 팀 공유용. main 에 push 하면 자동 재배포 |
| 코드 | https://github.com/jjbb3239-pixel/daejeon-landing | private. 팀원은 Collaborator 초대 필요 |

> **Figma 는 쓰지 않기로 했다 (2026-08-31).**
> 2026-08-30 에 시안 파일(`je1rN5ppbHZ63rEvECk2d7`)을 만들었지만 전면 개편 전
> 디자인이고, 팀에서 안 쓰기로 정했다. **다시 만들거나 갱신하지 말 것.**
> 아래는 그때 겪은 함정만 남겨둔다 — 나중에 Figma 를 다시 쓸 일이 생기면 참고.

### 되풀이하지 말 것 — auto-layout 프레임의 resize()

`resize()` 는 sizing mode 를 FIXED 로 되돌린다. 자식을 붙인 뒤 `resize(w, h)` 를
호출하면 세로가 그 높이에 고정되어 **프레임이 납작하게 접힌다.** 퀴즈 팝업과
기분 카드에서 두 번 겪었다.

```js
frame.resize(640, frame.height)          // <- 세로가 FIXED 로 굳는다
frame.primaryAxisSizingMode = 'AUTO'     // <- 반드시 뒤에서 되돌릴 것
frame.counterAxisSizingMode = 'FIXED'
```

카드 높이를 나란히 맞출 때는 자식을 `FILL` 로 두기 전에
**행 높이를 (가장 큰 카드 + 패딩)으로 먼저 키운다.** 안 그러면 내용이 잘린다.

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
| 18 | GitHub 저장소 생성 + 최초 커밋, 이미지 LFS 해제 | `.gitignore` `README.md` `extracted/.gitattributes` |
| 19 | Vercel 배포 + Figma 디자인 시안 10화면 제작 (**폐기 — 팀에서 미사용 결정**) | (코드 변경 없음) |
| 20 | **전면 개편** — 「최종 수정본.html」 디자인으로 한 페이지 재작성 | `App.tsx` `index.css` `sections/*` `MoodTest.tsx` `quiz.ts` |
| 21 | Social Proof 섹션 추가 + 히어로 스탬프·소신 크롭 조정 | `sections/ProofSection.tsx` `App.tsx` `index.css` `imports/proof/` |
| 22 | 축제 섹션을 「전체전체_수정2index.html」 디자인으로 교체 | `sections/FestivalSection.tsx` `index.css` |
| 23 | 축제 포스터 4장 · 최종 CTA 축소 · 푸터 신설 | `sections/SiteFooter.tsx` `FestivalSection.tsx` `App.tsx` `index.css` `imports/festival/` |
| 24 | 축제 CTA 재구성(코발트) + 푸터 「맨 위로」 겹침 해결 | `index.css` `FestivalSection.tsx` `SiteFooter.tsx` |
| 25 | 코스 카드 좌우 4:6 전환 + 푸터 공유 버튼 | `index.css` `SiteFooter.tsx` |
| 26 | 전반 점검 반영 — SEO/OG·인스타 링크 비움·퀴즈 이전/공유·lazy·명도대비·폰트 자체호스팅 | `index.html` `site.json` `links.ts` `share.ts` `MoodTest.tsx` `sections/*` `index.css` `public/` `src/fonts/` |
| 27 | 모바일 기분 섹션 접기 + 터치 타겟 20곳 확대 | `features.ts` `MoodFold.tsx` `App.tsx` `MoodTest.tsx` `index.css` |

### 프로토타입 폴더

`prototypes/` 는 **랜딩페이지 산출물이 아니라 실험용**이다. 앱은 여전히 `extracted/` 하나뿐.
아티팩트로 게시한 데모의 원본이 세션과 함께 사라지지 않게 여기 복사해 둔 것이다.

**되돌리기 기준점** : Figma Make 원본은 `Finalize design.zip` 에 그대로 있다.
팀이 준 최신 HTML 은 `reference-full.html`.

### 버린 접근 (다시 하지 말 것)

- `courses.ts` + 공용 `CoursePage.tsx` 로 네 코스를 한 데이터 구조에 묶으려 했으나,
  페이지마다 레이아웃이 완전히 달라서 폐기했다. 각 페이지는 각자 컴포넌트로 둔다.
- React 를 순수 HTML 한 벌로 뽑아보기도 했으나 **사용하지 않기로 했다.**
