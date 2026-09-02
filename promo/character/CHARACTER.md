# CHARACTER GUIDE — 가온 (릴스 등장인물)

출처 영상 : `0902(1)-1.mp4` (10.1s / 720×1280 / 30fps)
기준 프레임 : `ref/A1_face_master.jpg` (1.2초 지점) ← **모든 판단의 정답 파일**
레퍼런스 키트 : `ref/README.md` (캡쳐 14장 인덱스)
포맷 레퍼런스 : 꿈돌이 디자인 가이드라인 p1~p4 구조

---

## 0. 파이프라인

```
STEP 1  ref/A1_face_master.jpg  (+ A2, B1 보조)
             │  Nano Banana + 프롬프트 [N-0]
             ▼
STEP 2  MASTER 정면 얼굴 1장  ←── 여기서 얼굴이 결정된다. 마음에 들 때까지 재생성
             │  Nano Banana + 프롬프트 [N-1]~[N-7] (매번 이 1장을 레퍼런스로 첨부)
             ▼
STEP 3  각도 시트 7컷 (얼굴 3 + 전신 4)
             │
             ▼
STEP 4  CapCut / Dreamina : 시트 1컷 업로드 → 이미지→영상, 프롬프트는 [C-1]~[C-5]
             ▼
STEP 5  릴스 편집
```

> **일관성의 90%는 STEP 2 에서 결정된다.** 텍스트 프롬프트로 매번 얼굴을 설명하는 게 아니라,
> 확정된 이미지 1장을 매번 물리는 방식이다. STEP 2 를 서두르면 이후 전부 흔들린다.

---

## 1. PROFILE

```
┌─ 가온 ────────────────────────────────────────────┐
│  한국인 여성 · 24세 설정                            │
│  대전 여행을 검색하다 랜딩페이지를 만난 사용자 본인     │
│  밤에 침대에서 폰을 보다 꿈돌이를 발견하는 역할          │
│  톤 : 차분함, 과장 없음, 옅은 미소가 기본 표정          │
└──────────────────────────────────────────────────┘
```

## 2. 고정값 표 (하나라도 바뀌면 다른 사람이 된다)

| 부위 | 고정값 | 출처 |
|---|---|---|
| 얼굴형 | 계란형, 턱선 부드럽게 좁아짐, 턱끝 작고 살짝 뾰족 | 영상 |
| 피부 | 밝은 웜아이보리, 촉촉한 광(글래스 스킨), 잡티·주름·주근깨 없음 | 영상 |
| 눈 | 아몬드형, 눈꼬리 살짝 처짐, 갈색 홍채, 얕은 쌍꺼풀 | 영상 |
| 눈썹 | 직선형, 흑갈색, 자연 밀도, 눈썹꼬리만 살짝 아치 | 영상 |
| 코 | 콧대 가늘고 직선, 코끝 작고 둥글게 | 영상 |
| 입술 | 중간 볼륨, 뮤트 코랄핑크(MLBB), 큐피드 보우 선명, 옅은 윤기 | 영상 |
| 메이크업 | 브라운 톤 최소 메이크업. 아이라인·인조속눈썹 없음 | 영상 |
| 헤어 컬러 | 거의 검정에 가까운 흑갈색, 광택 있음 | 영상 |
| 헤어 스타일 | 가운데 가르마, 뿌리는 직선, 중간부터 굵은 S 웨이브 | 영상 |
| 헤어 길이 | 가슴 아래 (명치 부근) | **추정** — 영상에서 잘림 |
| 잔머리 | 관자놀이에 얇은 앞머리 몇 갈래, 오른쪽 귀 노출 | 영상 |
| 액세서리 | **전부 없음** — 귀걸이·목걸이·반지·시계 없음 | 확정값 |
| 상의 | 오버사이즈 아이보리크림 아란 케이블 니트 크루넥, 두꺼운 리브 넥, 넓은 리브 커프스 | 영상 |
| 하의 | 연회색 와이드 스웨트팬츠 | **추정** — 영상에 없음 |
| 발 | 크림색 무지 양말, 신발 없음 (실내) / 실외 컷은 흰 스니커즈 | **추정** |
| 체형 | 슬림, 작은 골격 | 영상 |
| 손·네일 | 짧은 자연 네일, 네일아트 없음 | 영상 |

**추정** 3개는 영상에 근거가 없어 임의로 정한 값이다. 바꾸려면 이 표만 고치고 4·5장의 프롬프트에서 해당 단어를 치환하면 된다.

## 3. 컬러 — 꿈돌이 (임의 변경 금지)

가이드라인 원문 : *"캐릭터 컬러는 지정된 컬러로 사용하여야 하며, 임의로 변경 사용 할 수 없습니다."*

| 부위 | PANTONE | HEX | RGB |
|---|---|---|---|
| 얼굴·몸 | 1355U | `#ffcf83` | 255 / 207 / 131 |
| 눈 | BLACK 4U | `#695f55` | 105 / 95 / 85 |
| 별 (하늘) | 2717U | `#a7cef7` | 167 / 206 / 247 |
| 별 (핑크) | 226U | `#ff2192` | 255 / 33 / 146 |

꿈순이가 등장할 경우 : 얼굴·몸 670U `#ffdce3` / 리본 2717U `#c6d8ff` / 별 7499U (아이보리) / 포인트 373U `#d6f657`.

> 꿈돌이는 **원본 3D 에셋(`promo/kkumdori.png`)을 합성**하는 게 원칙이다. AI 로 다시 그리면 색과 형태가 지정값을 벗어난다.

---

## 4. LOCK 문구 (복붙용)

프롬프트에 외형을 텍스트로 넣어야 할 때 **이 블록을 통째로** 쓴다. 단어를 줄이거나 순서를 바꾸지 않는다.

```
LOCK — APPEARANCE
A Korean woman in her early twenties, slim oval face with a softly tapered jawline
and a small pointed chin, fair warm-ivory dewy skin with a subtle glass-skin sheen
and no blemishes, almond eyes with slightly downturned outer corners and dark brown
irises, shallow double eyelid crease, soft straight dark-brown eyebrows, a narrow
straight nose bridge with a small rounded tip, medium-full lips in a soft muted
coral-pink with a defined cupid's bow, minimal natural brown-toned makeup, very long
near-black dark brown hair parted in the centre, straight at the roots and falling in
soft loose S-waves from mid-length down to just below the chest, glossy, a few thin
face-framing strands at the temples, right ear exposed, no earrings, no necklace, no
rings, no watch, wearing an oversized ivory-cream chunky aran cable-knit crewneck
sweater with a thick ribbed collar and wide ribbed cuffs, slim petite build, short
bare natural nails, calm gentle expression with a faint closed-mouth smile.
```

```
NEGATIVE
different face, changed hairstyle, shorter hair, bangs, fringe, hair tied up, ponytail,
bun, dyed hair, different sweater, patterned top, coloured top, jacket, coat, jewellery,
earrings, necklace, heavy makeup, red lipstick, false eyelashes, freckles, moles,
tanned skin, older woman, teenager, western facial features, plastic doll skin,
overexposed skin, extra fingers, distorted hands, text, watermark, logo
```

---

## 5. 각도 시트 규격

꿈돌이 p4 를 사람으로 옮긴 대응 관계.

```
꿈돌이 p4                              가온 시트
┌──────────────────────────┐         ┌──────────────────────────────┐
│ 탑뷰        바텀뷰         │         │ SHEET A — 얼굴 3컷            │
│                          │   →     │  정면 / 3-4 / 측면 프로필      │
│ 정면 3/4 후면 후측면       │         ├──────────────────────────────┤
│ (동일 조명·동일 스케일)     │         │ SHEET B — 전신 4컷            │
│ 그리드 배경               │         │  정면 / 3-4 / 측면 / 후면      │
└──────────────────────────┘         │ (동일 조명·동일 스케일·그리드)   │
                                     └──────────────────────────────┘
```

공통 규격 — **7컷 전부 동일해야 하는 것**

| 항목 | 값 |
|---|---|
| 배경 | 흰 무지 + 아주 옅은 회색 그리드 (꿈돌이 시트와 동일) |
| 조명 | 부드러운 정면 스튜디오 조광, 그림자 최소, 색온도 중립(5500K) |
| 렌즈 | 85mm 상당, 왜곡 없음, 심도 깊게(배경까지 선명) |
| 스케일 | 얼굴 3컷은 머리 높이 동일 / 전신 4컷은 키 동일 |
| 표정 | 무표정에 가까운 옅은 미소, 정면 3컷은 카메라 응시 |
| 자세 | 팔은 자연스럽게 몸통 옆, 손 펴짐, 정면 직립 |
| 비율 | 얼굴 컷 1:1 / 전신 컷 2:3 |

> **한 장에 7컷을 몰아넣지 말 것.** Nano Banana 는 컷당 얼굴 해상도가 떨어지면 얼굴을 새로 그린다.
> 1컷씩 7번 생성하고, 배치는 마지막에 이미지 편집으로 붙인다.

---

## 6. Nano Banana 프롬프트

**매 생성마다 레퍼런스 이미지를 첨부한다.** [N-0] 은 `ref/A1_face_master.jpg` + `A2` + `B1`, [N-1]~[N-7] 은 STEP 2 에서 확정한 MASTER 정면 얼굴 + 부위 레퍼런스를 첨부. 어느 컷에 무엇을 붙이는지는 `ref/README.md` 표에 있다.

### [N-0] MASTER 정면 얼굴 (가장 중요 — 여기서 얼굴 확정)

```
Using the woman in the attached photo, keep her identity exactly the same — the same
face, the same facial proportions, the same skin, the same hair colour and the same
hairstyle. Do not restyle her, do not beautify her, do not change her age.

Change only the pose and the lighting: she now faces the camera straight on, head
level, eyes looking directly into the lens, a calm gentle expression with a faint
closed-mouth smile. Soft even studio lighting from the front, neutral 5500K white
balance, minimal shadows. Plain white seamless background with a very faint light-grey
grid. 85mm lens look, sharp focus across the whole frame, no depth-of-field blur.

She wears the same oversized ivory-cream chunky cable-knit crewneck sweater with a
thick ribbed collar. No earrings, no necklace, no jewellery of any kind.

Photorealistic photograph, 1:1 square.
```

### [N-1] 얼굴 3/4

```
Same woman as in the attached image, identical face, skin, hair and sweater. Rotate her
head 45 degrees to her left so we see a three-quarter view, head level, eyes toward the
camera. Everything else unchanged: same soft even frontal studio lighting, same plain
white background with the faint light-grey grid, same framing and head size, same faint
closed-mouth smile. Photorealistic, 1:1 square.
```

### [N-2] 얼굴 측면 프로필

```
Same woman as in the attached image, identical face, skin, hair and sweater. Now a full
90-degree side profile facing to her left, head level. Her long wavy hair falls behind
her shoulder so the jawline and ear are clearly visible. Same soft even studio lighting,
same plain white background with the faint light-grey grid, same head size and framing.
Photorealistic, 1:1 square.
```

### [N-3] 전신 정면

```
Same woman as in the attached image — identical face, skin, hair colour, hairstyle and
hair length. Full-body standing shot from head to feet, facing the camera straight on,
arms relaxed at her sides with hands open, feet together, head level, eyes to camera,
calm gentle expression.

Outfit, unchanged and complete: an oversized ivory-cream chunky aran cable-knit crewneck
sweater with a thick ribbed collar and wide ribbed cuffs, light grey wide-leg sweatpants,
plain cream socks, no shoes. No jewellery.

Soft even studio lighting, neutral 5500K, plain white seamless background with a very
faint light-grey grid. 85mm lens look, sharp throughout, no blur. Photorealistic, 2:3.
```

### [N-4] 전신 3/4 · [N-5] 전신 측면 · [N-6] 전신 후면

[N-3] 을 붙여 쓰고 아래 한 줄만 교체한다.

| 컷 | 교체 문장 |
|---|---|
| [N-4] | `Rotate her body 45 degrees to her left, three-quarter view, head still turned toward the camera.` |
| [N-5] | `Full 90-degree side view facing to her left, arms at her sides, looking straight ahead — not at the camera.` |
| [N-6] | `Back view, facing directly away from the camera, showing the full length of her hair down her back.` |

> [N-6] 후면 컷은 영상에 근거가 없다. 뒷머리 형태는 여기서 **처음 결정되는 값**이니, 나온 결과를 고정값 표에 적어두고 이후 재사용한다.

### [N-7] 실내 씬 스틸 (영상 시드용)

```
Same woman as in the attached image, identical face, skin, hair and sweater. She sits on
a bed at night, leaning against a wooden headboard, greige bedding over her legs, holding
a phone in both hands and looking down at it with a soft smile. Warm 2700K bedside lamp
light from the left, beige wall behind, cinematic shallow depth of field, vertical 9:16
photograph. Do not change her face or her sweater.
```

---

## 7. CapCut / Dreamina 영상 프롬프트

**이미지→영상으로만 쓴다.** 텍스트→영상은 인물이 매번 바뀐다.

> 여기서는 LOCK 문구를 **넣지 않는다.** 외형은 업로드한 이미지가 책임진다.
> 프롬프트에 얼굴 묘사를 길게 넣으면 모델이 얼굴을 다시 해석해서 오히려 드리프트가 생긴다.
> **모션 + 카메라만 쓰고, 마지막에 고정 문장 한 줄을 붙인다.**

고정 꼬리 문장 (모든 컷 공통) :
```
Keep her face, hairstyle and clothing exactly as in the input image. No cuts, one continuous shot.
```

| # | 시드 이미지 | 프롬프트 (모션) |
|---|---|---|
| C-1 | [N-7] | `She scrolls the phone with her thumb, then her eyebrows lift slightly as she notices something. Camera slowly pushes in. Warm lamp light, gentle handheld feel.` |
| C-2 | [N-7] | `Close-up over her shoulder onto the phone screen, her thumb taps once. Camera drifts slowly to the right.` |
| C-3 | [N-0] | `She tilts her head slightly and breaks into a small laugh, shoulders relaxing. Static camera.` |
| C-4 | [N-3] | `She walks slowly toward the camera and stops, hands in her sleeves. Camera tracks backward at chest height.` |
| C-5 | [N-7] | `She lowers the phone to her lap, looks off to the left and smiles faintly. Camera holds still, slow fade of lamp glow.` |

씬 배치 (릴스 15초 기준) :
```
0-3s   C-1  밤 침실, 폰 스크롤 → 발견        │ 후킹
3-6s   C-2  폰 화면 클로즈업 (꿈돌이 합성)    │ 제품
6-9s   C-3  웃음 리액션                      │ 감정
9-12s  C-4  걷는 컷                          │ 전환
12-15s C-5  폰 내리고 미소 + CTA 자막          │ 전환 유도
```

꿈돌이가 나오는 폰 화면은 **AI 로 생성하지 말고** CapCut 에서 `promo/kkumdori.png` 를 화면 영역에 합성한다 (3장 지정색 유지).

---

## 8. 검수 체크리스트 (컷 뽑을 때마다)

- [ ] 가르마가 가운데인가 (한쪽 가르마로 바뀌는 사고가 가장 잦다)
- [ ] 머리 길이가 가슴 아래인가 (짧아지지 않았나)
- [ ] 앞머리가 생기지 않았나
- [ ] 니트가 아이보리크림 케이블 니트인가 (무지 니트·다른 색으로 안 바뀌었나)
- [ ] 리브 커프스가 두껍게 살아 있나
- [ ] 귀걸이·목걸이·반지가 생기지 않았나
- [ ] 입술색이 진해지지 않았나 (붉은 립으로 바뀌면 다른 사람으로 보인다)
- [ ] 나이가 올라가거나 내려가지 않았나
- [ ] 손가락 개수
- [ ] 꿈돌이 색이 `#ffcf83` / 눈 `#695f55` 인가

---

## 9. 파일

```
promo/character/
├─ CHARACTER.md              이 문서 (설정·프롬프트·검수)
└─ ref/
   ├─ README.md              캡쳐 14장 인덱스 + 타임라인 + 누락분 정리
   ├─ A1_face_master.jpg     1.2s · 얼굴 기준컷 ★ 매번 첨부
   ├─ A2_face_detail.jpg     3.2s · 피부·쌍꺼풀·입술색
   ├─ A3_face_profile.jpg    4.4s · 측면 코·턱선
   ├─ A4_eyes_brows.jpg      1.2s · 눈·눈썹 확대
   ├─ A5_lips_nose.jpg       3.2s · 입술·코 확대
   ├─ B1_hair_part.jpg       1.2s · 가운데 가르마·정수리
   ├─ B2_hair_length.jpg     1.6s · 머리 길이·웨이브
   ├─ C1_knit_torso.jpg      0.6s · 케이블 패턴·실루엣
   ├─ C2_knit_collar.jpg     1.2s · 리브 크루넥
   ├─ C3_knit_cuff.jpg       0.6s · 리브 커프스
   ├─ D1_hands_nails.jpg     6.5s · 손·네일·폰 그립
   ├─ E1_scene_wide.jpg      0.6s · 침실 구도·조광 방향
   ├─ F1_kkumdori_calm.jpg   6.5s · 폰 화면 합성 위치
   └─ F2_kkumdori_angry.jpg  9.9s · 꿈돌이 표정·재질
```
