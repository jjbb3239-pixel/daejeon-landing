# 기분이 이끄는 대로, 일단 대전행

오늘 기분에 맞는 대전 하루 코스를 찾아주는 랜딩페이지입니다.
히어로에서 「내 기분 따라 출발하기」를 누르면 4문항 퀴즈가 뜨고,
결과에 따라 네 개 코스 페이지 중 하나로 승차권이 찢어지며 넘어갑니다.

```
  히어로 승차권
      ↓  내 기분 따라 출발하기
  퀴즈 팝업 4문항
      ↓
  결과 승차권
      ↓  승차권 찢기 2초 (canvas)
  ┌─────────┬─────────┬─────────┬─────────┐
  │ 사진     │ 맛집     │ 카페     │ 혼자     │
  │ photo   │ food    │ cafe    │ solo    │
  └─────────┴─────────┴─────────┴─────────┘
```

## 실행

```bash
cd extracted
npm install
npm run dev
```

## 배포 (Vercel)

앱이 저장소 루트가 아니라 `extracted/` 안에 있습니다. **Root Directory 설정이 필수입니다.**

| 항목 | 값 |
|---|---|
| Framework Preset | Vite |
| **Root Directory** | **`extracted`** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | 22 |

## 폴더

| 경로 | 내용 |
|---|---|
| `extracted/` | 실제 앱 (React 19 + Vite + TypeScript) |
| `extracted/src/imports/` | 실사진 · 꿈돌이 · 꿈씨패밀리 이미지 |
| `prototypes/` | 실험용 데모. 앱 산출물이 아님 |
| `LANDING_GUIDE.md` | 제작 기준 문서 (카피 · 레이아웃 · 컬러 · 한국어 줄바꿈 규칙) |
| `PROGRESS.md` | 작업 이력과 결정 사항 |
| `Finalize design.zip` | Figma Make 원본. 되돌리기 기준점 |
| `reference-full.html` | 팀이 만든 원본 HTML |

## 저장소에 없는 것

`extracted/src/imports/guideline/` 의 브랜드 가이드 PDF 2종은 제외했습니다.
105MB 로 GitHub 파일 용량 제한을 넘고, 코드에서 참조하지 않습니다.
여기서 추출한 캐릭터 PNG 는 `src/imports/` 에 그대로 들어 있어 빌드에 문제 없습니다.

## 검증

```bash
cd extracted
npx tsc --noEmit     # 타입
node src/quiz.check.ts   # 퀴즈 16개 조합이 전부 코스로 이어지는지
npm run build
```
