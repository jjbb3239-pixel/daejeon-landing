# UTM 링크 목록

기준 : `GA4와 UTM 셋팅하기.md` 의 **필수 3개**(`utm_source` · `utm_medium` · `utm_campaign`)만 사용
목적지 : https://daejeon-love.vercel.app/
캠페인명 : **`daejeon_visit`** — 전 채널·전 팀원 공통. 바꾸지 않는다.

---

## 채널별 링크

| 채널 | source | medium | 붙여넣을 주소 |
|---|---|---|---|
| 팀 인스타그램 프로필 링크 | `instagram` | `social` | `https://daejeon-love.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=daejeon_visit` |
| 카카오톡 (오픈채팅·단톡·1:1 공유) | `kakaotalk` | `messenger` | `https://daejeon-love.vercel.app/?utm_source=kakaotalk&utm_medium=messenger&utm_campaign=daejeon_visit` |
| 에브리타임 | `everytime` | `community` | `https://daejeon-love.vercel.app/?utm_source=everytime&utm_medium=community&utm_campaign=daejeon_visit` |
| 네이버 카페 | `naver_cafe` | `community` | `https://daejeon-love.vercel.app/?utm_source=naver_cafe&utm_medium=community&utm_campaign=daejeon_visit` |
| X (구 트위터) | `x` | `social` | `https://daejeon-love.vercel.app/?utm_source=x&utm_medium=social&utm_campaign=daejeon_visit` |
| 스레드 | `threads` | `social` | `https://daejeon-love.vercel.app/?utm_source=threads&utm_medium=social&utm_campaign=daejeon_visit` |

> 커뮤니티는 사이트가 정해지면 한 줄씩 추가한다. `source` 는 도메인 기준 소문자
> (`dcinside` · `fmkorea` · `theqoo` · `instiz` …), `medium` 은 `community` 로 고정.

---

## 규칙

```
https://daejeon-love.vercel.app/?utm_source=[플랫폼]&utm_medium=[매체]&utm_campaign=daejeon_visit
                                 └─ ? 로 시작, 나머지는 & 로 연결
```

- 영문 **소문자** + `_` 만 사용. 대문자·한글·띄어쓰기 쓰면 GA4 에서 다른 채널로 쪼개진다.
- `utm_campaign` 은 항상 `daejeon_visit`. 사람마다 다르게 쓰면 보고서가 갈라진다.
- 채널이 늘어나면 위 표에 한 줄 추가. `medium` 은 아래 4개 안에서만 고른다.

| medium | 언제 |
|---|---|
| `social` | 인스타·스레드·X 등 SNS 피드/프로필 |
| `messenger` | 카톡·DM 등 1:1·단체 대화 |
| `community` | 에브리타임·네이버 카페·디시 등 게시판 |
| `cpc` | 돈 낸 광고 |

---

## 팀원 구분 (4명 · 9/4~9/10 평가 기간)

같은 채널에 4명이 각자 올리면 `utm_source` 가 같아서 누가 유입을 만들었는지 안 보인다.
`utm_content` 로 사람을 나눈다. 9/7 중간 점검에서 잘 되는 계정에 힘을 싣기 위한 것.

| 팀원 | 붙일 값 | 예시 (스레드) |
|---|---|---|
| 1번 | `m1` | `...&utm_campaign=daejeon_visit&utm_content=m1` |
| 2번 | `m2` | `...&utm_campaign=daejeon_visit&utm_content=m2` |
| 3번 | `m3` | `...&utm_campaign=daejeon_visit&utm_content=m3` |
| 4번 | `m4` | `...&utm_campaign=daejeon_visit&utm_content=m4` |

```
https://daejeon-love.vercel.app/?utm_source=threads&utm_medium=social&utm_campaign=daejeon_visit&utm_content=m1
https://daejeon-love.vercel.app/?utm_source=x&utm_medium=social&utm_campaign=daejeon_visit&utm_content=m1
```

- **사람 기준만 쓴다.** 소재까지 나누면 4명 x 3소재 = 12줄이 되어 7일짜리 캠페인에서
  줄마다 표본이 모자란다. 소재 비교는 게시 날짜로 갈라 본다.
- 아이보스 · 오픈채팅은 한 명이 대표로 올리므로 `utm_content` 를 붙이지 않는다.

---

## 아직 안 붙인 것

`utm_content` (소재 구분 — 카드뉴스 A안 / B안 / 퀴즈 1안 / 릴스 A안 …) 는 **선택** 항목이라 지금은 뺐다.
지금 상태로는 인스타에서 들어온 유입이 **어느 소재 때문인지 구분되지 않는다.**
소재가 확정되면 인스타 링크 뒤에 `&utm_content=[소재명]` 만 덧붙이면 된다. 나머지 3개는 그대로 둔다.

```
https://daejeon-love.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=daejeon_visit&utm_content=cardnews_a
```
