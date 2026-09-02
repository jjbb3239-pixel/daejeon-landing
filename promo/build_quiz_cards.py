"""미리캔버스 퀴즈형 템플릿을 바탕으로 카드뉴스 2안(각 7장)을 만든다.

방송 프로그램의 로고나 고유 문구는 사용하지 않고, 겹친 종이·클립·퀴즈 진행
구조만 가져와 대전 랜딩페이지의 옐로/코발트와 공식 캐릭터로 재구성한다.
"""
from pathlib import Path


HERE = Path(__file__).parent
OUT = HERE / "quiz_cards"
OUT.mkdir(exist_ok=True)

INK = "#172033"
IVORY = "#fff9ed"
YELLOW = "#ffd83d"
COBALT = "#2869d8"
SKY = "#ccefff"
LIME = "#b9ef48"
CORAL = "#ef6978"
BODY = "#4f4a43"
MUTED = "#777166"


def esc(text: str) -> str:
    return (text.replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace('"', "&quot;"))


def city():
    blocks = "".join(
        f'<span style="width:{w}px;height:{h}px"></span>'
        for w, h in [(86, 170), (66, 235), (112, 140), (74, 205), (94, 120),
                     (58, 260), (106, 180), (82, 225), (120, 145), (70, 200)]
    )
    return f'<div class="city">{blocks}</div>'


def clip():
    return '<div class="clip"><i></i><i></i></div>'


def base(content: str, page: str, plan: str, *, cover=False, theme="cream") -> str:
    cover_class = " cover" if cover else ""
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1080,initial-scale=1">
<style>
@font-face{{font-family:Pretendard;src:url('../../extracted/src/fonts/Pretendard-Regular.subset.woff2') format('woff2');font-weight:400}}
@font-face{{font-family:Pretendard;src:url('../../extracted/src/fonts/Pretendard-Bold.subset.woff2') format('woff2');font-weight:700}}
@font-face{{font-family:Pretendard;src:url('../../extracted/src/fonts/Pretendard-Black.subset.woff2') format('woff2');font-weight:900}}
*{{box-sizing:border-box}}
html,body{{margin:0;width:1080px;height:1080px;overflow:hidden}}
body{{font-family:Pretendard,'Malgun Gothic',sans-serif;color:{INK};word-break:keep-all}}
.canvas{{position:relative;width:1080px;height:1080px;overflow:hidden;background:{COBALT};
 background-image:linear-gradient(rgba(255,255,255,.055) 2px,transparent 2px),linear-gradient(90deg,rgba(255,255,255,.055) 2px,transparent 2px);background-size:44px 44px}}
.canvas:before{{content:'DAEJEON  •  ONE DAY  •  MOOD QUIZ';position:absolute;left:-36px;bottom:24px;color:rgba(255,255,255,.16);font-size:25px;font-weight:900;letter-spacing:.18em;transform:rotate(-90deg);transform-origin:left bottom}}
.paper{{position:absolute;inset:38px;background:{IVORY};border:5px solid {INK};border-radius:38px;box-shadow:15px 17px 0 {INK};overflow:hidden}}
.paper:before{{content:'';position:absolute;top:0;bottom:0;left:32px;border-left:3px dashed rgba(23,32,51,.16)}}
.paper:after{{content:'';position:absolute;width:170px;height:170px;right:-76px;top:-76px;background:{YELLOW};border:5px solid {INK};border-radius:50%}}
.content{{position:absolute;inset:68px 76px 70px 92px;z-index:3;display:flex;flex-direction:column;min-height:0}}
.topline{{display:flex;justify-content:space-between;align-items:center;font-size:19px;font-weight:900;letter-spacing:.08em}}
.plan{{padding:10px 19px;background:{YELLOW};border:3px solid {INK};border-radius:999px;box-shadow:4px 5px 0 {INK}}}
.page{{color:{COBALT}}}
.eyebrow{{align-self:flex-start;margin-top:34px;padding:11px 21px;background:{COBALT};color:white;border:3px solid {INK};border-radius:12px;font-size:22px;font-weight:900;letter-spacing:.02em;transform:rotate(-1.2deg);box-shadow:4px 5px 0 {INK}}}
h1{{margin:30px 0 0;font-size:76px;line-height:1.04;letter-spacing:-.06em;font-weight:900}}
h2{{margin:30px 0 0;font-size:60px;line-height:1.08;letter-spacing:-.055em;font-weight:900}}
.marker{{display:inline;background:linear-gradient(transparent 63%,{YELLOW} 63% 94%,transparent 94%)}}
.lead{{margin:26px 0 0;color:{BODY};font-size:29px;line-height:1.5;font-weight:700}}
.small{{color:{MUTED};font-size:21px;line-height:1.5}}
.spacer{{flex:1}}
.quizbox{{margin-top:34px;padding:32px 36px;background:white;border:4px solid {INK};border-radius:28px;box-shadow:9px 10px 0 {INK}}}
.question-no{{display:inline-block;color:{COBALT};font-size:25px;font-weight:900;letter-spacing:.08em}}
.question{{margin-top:11px;font-size:39px;line-height:1.3;font-weight:900;letter-spacing:-.04em}}
.ox{{display:grid;grid-template-columns:1fr 1fr;gap:34px;margin-top:40px}}
.ox div{{height:220px;display:grid;place-items:center;background:#f8fbff;border:5px solid {INK};border-radius:110px;font-size:132px;line-height:1;font-weight:900;box-shadow:10px 12px 0 {INK}}}
.ox .o{{color:{COBALT};background:#eaf3ff}}.ox .x{{color:{CORAL};background:#fff0f1}}
.hint{{margin-top:28px;padding:17px 22px;border:3px solid {INK};border-radius:15px;background:#fff;font-size:23px;font-weight:700}}
.answer{{margin-top:28px;display:flex;align-items:center;gap:28px}}
.stamp{{width:172px;height:172px;flex:0 0 auto;display:grid;place-items:center;border:7px solid {INK};border-radius:50%;background:{YELLOW};box-shadow:10px 12px 0 {INK};font-size:100px;font-weight:900;transform:rotate(-5deg)}}
.answer-copy strong{{display:block;font-size:48px;line-height:1.1}}.answer-copy p{{margin:12px 0 0;font-size:27px;line-height:1.45;color:{BODY};font-weight:700}}
.steps{{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:30px}}
.steps div{{padding:21px 10px;text-align:center;border:3px solid {INK};border-radius:15px;background:white;font-size:22px;font-weight:900}}
.steps b{{display:block;margin-bottom:7px;color:{COBALT};font-size:17px}}
.options{{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:28px}}
.option{{min-height:140px;padding:23px 25px;display:flex;align-items:center;gap:17px;background:white;border:3px solid {INK};border-radius:24px;font-size:26px;line-height:1.28;font-weight:800;box-shadow:5px 6px 0 {INK}}}
.option b{{width:42px;height:42px;flex:0 0 auto;display:grid;place-items:center;background:{YELLOW};border:3px solid {INK};border-radius:50%;font-size:20px}}
.moods{{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:25px}}
.mood{{height:158px;padding:16px;display:flex;align-items:center;gap:15px;background:white;border:3px solid {INK};border-radius:25px;box-shadow:6px 7px 0 {INK}}}
.mood img{{width:96px;height:96px;object-fit:contain}}.mood strong{{display:block;font-size:25px;line-height:1.2}}.mood span{{display:block;margin-top:7px;color:{COBALT};font-size:17px;font-weight:900;letter-spacing:.08em}}
.cta{{margin-top:auto;padding:28px 30px;display:flex;align-items:center;justify-content:center;gap:14px;background:{YELLOW};border:4px solid {INK};border-radius:999px;box-shadow:9px 10px 0 {INK};font-size:34px;font-weight:900}}
.char{{position:absolute;right:36px;bottom:42px;width:315px;height:315px;object-fit:contain;filter:drop-shadow(8px 10px 0 rgba(23,32,51,.14))}}
.cover h1{{font-size:80px;max-width:735px}}.cover .lead{{max-width:590px}}
.scribble{{display:inline-block;position:relative}}.scribble:after{{content:'';position:absolute;left:-4px;right:-8px;bottom:-9px;height:8px;background:{COBALT};transform:rotate(-1deg);border-radius:99px}}
.ticket-row{{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px;max-width:600px}}
.ticket-row span{{padding:13px 17px;background:white;border:3px solid {INK};box-shadow:4px 5px 0 {INK};font-size:21px;font-weight:800;transform:rotate(var(--r))}}
.result-card{{margin-top:30px;padding:27px 30px;background:white;border:4px solid {INK};border-radius:22px;box-shadow:8px 9px 0 {INK}}}
.result-card strong{{font-size:37px}}.result-card p{{margin:13px 0 0;color:{BODY};font-size:25px;line-height:1.45;font-weight:700}}
.theme-blue{{background:{YELLOW};background-image:radial-gradient(rgba(23,32,51,.16) 2px,transparent 2px);background-size:24px 24px}}
.theme-blue .paper{{background:{COBALT}}}.theme-blue .paper:before{{border-left-color:rgba(255,255,255,.24)}}.theme-blue .paper:after{{background:{IVORY}}}
.theme-blue .content{{color:{IVORY}}}.theme-blue .page{{color:{YELLOW}}}.theme-blue .plan{{background:{IVORY};color:{INK}}}
.theme-blue .eyebrow{{background:{YELLOW};color:{INK}}}.theme-blue .answer-copy p,.theme-blue .lead,.theme-blue .small{{color:#e5efff}}
.theme-blue .marker{{background:linear-gradient(transparent 62%,{CORAL} 62% 94%,transparent 94%)}}
.theme-blue .result-card,.theme-blue .steps div{{color:{INK};background:{IVORY}}}
.theme-yellow{{background:{COBALT}}}.theme-yellow .paper{{background:{YELLOW}}}.theme-yellow .paper:after{{background:{CORAL}}}
.theme-yellow .page{{color:{INK}}}.theme-yellow .eyebrow{{background:{IVORY};color:{INK}}}
.theme-yellow .mood{{background:{IVORY}}}.theme-yellow .hint{{background:{INK};color:{IVORY}}}
</style>
</head>
<body>
<main class="canvas theme-{theme}">
  <section class="paper{cover_class}"></section>
  <section class="content{cover_class}" data-content>
    <div class="topline"><span class="plan">{esc(plan)}</span><span class="page">{esc(page)} / 07</span></div>
    {content}
  </section>
</main>
</body>
</html>'''


def mood_grid():
    rows = [
        ("ssi-photo.png", "PHOTO", "사진 왕창 찍고 싶은 날"),
        ("ssi-food.png", "EAT", "맛집 다 뿌수고 싶은 날"),
        ("ssi-cafe.png", "CAFE", "느좋 카페 가고 싶은 날"),
        ("ssi-lazy.png", "COURSE", "아무 생각 하기 싫은 날"),
    ]
    return '<div class="moods">' + ''.join(
        f'<div class="mood"><img src="../{img}" alt=""><div><span>{en}</span><strong>{ko}</strong></div></div>'
        for img, en, ko in rows
    ) + '</div>'


def options(items):
    return '<div class="options">' + ''.join(
        f'<div class="option"><b>{chr(65+i)}</b><span>{item}</span></div>'
        for i, item in enumerate(items)
    ) + '</div>'


# ── 1안: 저장한 곳은 12개인데 ──────────────────────────────
cards = {}

cards["P1-01-cover.html"] = base('''
  <div class="eyebrow">여행 계획 공감 퀴즈</div>
  <h1>저장한 곳은<br><span class="marker">12개인데</span>,<br>대전 도착하면<br>또 검색함</h1>
  <p class="lead">맛집도 카페도 저장했는데<br>어디부터 갈지는 아직 모르는 사람</p>
  <div class="ticket-row"><span style="--r:-2deg">맛집 4</span><span style="--r:1deg">카페 3</span><span style="--r:-1deg">야경 2</span></div>
  <img class="char" src="../kkumdori.png" alt="생각하는 꿈돌이">
''', "01", "대전행 퀴즈", cover=True)

cards["P1-02-q1.html"] = base(f'''
  <div class="eyebrow">첫 번째 문제</div>
  <h2>저장 목록은<br><span class="scribble">하루 코스</span>다?</h2>
  <div class="quizbox">
    <span class="question-no">Q1 · OX QUIZ</span>
    <div class="question">좋은 장소를 많이 저장하면<br>여행 계획은 완성된다.</div>
  </div>
  <div class="ox"><div class="o">O</div><div class="x">X</div></div>
  <div class="hint">마음속으로 고른 뒤 다음 장에서 정답을 확인하세요 →</div>
''', "02", "대전행 퀴즈")

cards["P1-03-a1.html"] = base(f'''
  <div class="eyebrow">정답 공개</div>
  <div class="answer"><div class="stamp">X</div><div class="answer-copy"><strong>저장 목록은<br>코스가 아닙니다.</strong><p>장소만 모아두면 이동 순서와 체력,<br>오늘의 우선순위가 빠져 있습니다.</p></div></div>
  <div class="result-card"><strong>그래서 현지에서 다시 검색합니다.</strong><p>무엇을 먼저 볼지 정하지 못해 지도와 리뷰를 다시 열게 되는 거죠.</p></div>
  <div class="steps"><div><b>STEP 1</b>저장</div><div><b>STEP 2</b>지도 확인</div><div><b>STEP 3</b>고민</div><div><b>STEP 4</b>다시 검색</div></div>
  <div class="spacer"></div><p class="small">문제는 장소의 수가 아니라, 코스를 만드는 순서입니다.</p>
''', "03", "대전행 퀴즈", theme="blue")

cards["P1-04-q2.html"] = base(f'''
  <div class="eyebrow">두 번째 문제</div>
  <h2>좋은 하루 코스를 만들 때<br><span class="marker">가장 먼저</span> 고를 것은?</h2>
  {options(["검색 결과 상단의 장소", "리뷰가 가장 많은 장소", "오늘 내가 원하는 기분", "사진이 제일 많은 장소"])}
  <div class="hint">힌트 · 목적지는 같아도 좋은 하루는 사람마다 다릅니다.</div>
''', "04", "대전행 퀴즈")

cards["P1-05-a2.html"] = base(f'''
  <div class="eyebrow">정답 공개</div>
  <div class="answer"><div class="stamp">C</div><div class="answer-copy"><strong>오늘 내가<br>원하는 기분</strong><p>장소보다 기분과 체력을 먼저 정하면<br>동선에서 버릴 곳이 보입니다.</p></div></div>
  <div class="steps"><div><b>01</b>기분</div><div><b>02</b>체력</div><div><b>03</b>동선</div><div><b>04</b>장소</div></div>
  <div class="result-card"><strong>순서를 바꾸면 저장 목록이 코스가 됩니다.</strong><p>이제 오늘 가장 가까운 기분만 하나 골라보세요.</p></div>
  <div class="spacer"></div><p class="small">다음 장이 마지막 문제입니다.</p>
''', "05", "대전행 퀴즈", theme="blue")

cards["P1-06-final.html"] = base(f'''
  <div class="eyebrow">마지막 문제</div>
  <h2>오늘 가장 가까운 기분은<br>어느 쪽인가요?</h2>
  {mood_grid()}
  <div class="hint">하나를 골랐다면, 그 기분을 실제 대전 장소로 바꿀 차례입니다.</div>
''', "06", "대전행 퀴즈", theme="yellow")

cards["P1-07-cta.html"] = base('''
  <div class="eyebrow">QUIZ COMPLETE</div>
  <h1>저장 목록을<br><span class="marker">대전 하루 코스</span>로<br>바꿔보세요.</h1>
  <p class="lead">질문 4개 · 가입 없이 무료<br>오늘 기분에 맞는 결과를 바로 확인합니다.</p>
  <img class="char" style="width:260px;height:260px;right:70px;bottom:220px" src="../kkumdori.png" alt="꿈돌이">
  <div class="cta">30초 만에 내 대전 코스 찾기 →</div>
  <p class="small" style="text-align:center;margin:20px 0 0;font-weight:700">프로필 링크에서 바로 시작하세요.</p>
''', "07", "대전행 퀴즈", cover=True, theme="blue")


# ── 2안: 노잼은 도시 탓이 아닐 수도 ───────────────────────
cards["P2-01-cover.html"] = base('''
  <div class="eyebrow">살짝 불편한 대전 퀴즈</div>
  <h1>대전 여행이<br><span class="marker">노잼이 되는 건</span><br>도시 탓이<br>아닐 수도</h1>
  <p class="lead">좋다는 장소를 전부 넣었는데도<br>하루가 재미없었다면 풀어보세요.</p>
  <div class="ticket-row"><span style="--r:-2deg">유명 맛집</span><span style="--r:1deg">핫플</span><span style="--r:-1deg">필수 코스</span></div>
  <img class="char" src="../ssi-lazy.png" alt="쉬고 있는 꿈씨패밀리">
''', "01", "대전행 퀴즈", cover=True)

cards["P2-02-q1.html"] = base(f'''
  <div class="eyebrow">첫 번째 문제</div>
  <h2>남들이 좋다는 곳을<br>모두 넣으면 <span class="marker">재밌는 여행</span>이다?</h2>
  <div class="quizbox"><span class="question-no">Q1 · OX QUIZ</span><div class="question">유명한 장소를 많이 갈수록<br>내 여행 만족도도 올라간다.</div></div>
  <div class="ox"><div class="o">O</div><div class="x">X</div></div>
  <div class="hint">대전이 정말 노잼인지, 다음 장에서 확인해보세요 →</div>
''', "02", "대전행 퀴즈")

cards["P2-03-a1.html"] = base(f'''
  <div class="eyebrow">정답 공개</div>
  <div class="answer"><div class="stamp">X</div><div class="answer-copy"><strong>좋은 장소도<br>나와 안 맞으면 숙제입니다.</strong><p>사진 찍기 싫은 날의 포토 스폿,<br>지친 날의 긴 동선은 재미보다 피로가 큽니다.</p></div></div>
  <div class="result-card"><strong>도시보다 코스가 문제일 수 있습니다.</strong><p>남의 추천을 이어 붙이는 대신 오늘 원하는 감정부터 정해야 합니다.</p></div>
  <div class="steps"><div><b>남의 추천</b>핫플</div><div><b>남의 추천</b>맛집</div><div><b>남의 추천</b>카페</div><div><b>결과</b>피곤함</div></div>
  <div class="spacer"></div><p class="small">대전이 재미없는 게 아니라, 오늘의 나와 안 맞았던 겁니다.</p>
''', "03", "대전행 퀴즈", theme="blue")

cards["P2-04-q2.html"] = base(f'''
  <div class="eyebrow">두 번째 문제</div>
  <h2>혼자 대전에 간다면<br><span class="marker">가장 좋은 하루</span>는?</h2>
  {options(["야경과 미술관을 보는 하루", "혼밥 맛집을 깨는 하루", "동네 카페에서 쉬는 하루", "완성된 동선을 따라가는 하루"])}
  <div class="hint">한 개의 정답을 고른 뒤 다음 장을 넘겨보세요.</div>
''', "04", "대전행 퀴즈")

cards["P2-05-a2.html"] = base(f'''
  <div class="eyebrow">반전 정답</div>
  <div class="answer"><div class="stamp" style="font-size:62px">없음</div><div class="answer-copy"><strong>사람마다<br>정답이 다릅니다.</strong><p>오늘 원하는 감정이 다르면<br>같은 대전도 전혀 다른 여행이 됩니다.</p></div></div>
  <div class="steps" style="margin-top:38px"><div><b>PHOTO</b>남기고 싶다</div><div><b>EAT</b>제대로 먹고 싶다</div><div><b>CAFE</b>쉬고 싶다</div><div><b>COURSE</b>맡기고 싶다</div></div>
  <div class="result-card"><strong>좋은 코스의 기준은 유명세가 아닙니다.</strong><p>지금 원하는 감정을 먼저 고르면 같은 대전도 전혀 다른 하루가 됩니다.</p></div>
  <div class="spacer"></div><p class="small">다음 장에서 오늘의 정답을 하나 골라보세요.</p>
''', "05", "대전행 퀴즈", theme="blue")

cards["P2-06-final.html"] = base(f'''
  <div class="eyebrow">마지막 문제</div>
  <h2>그래서 오늘 당신에게<br>필요한 대전은?</h2>
  {mood_grid()}
  <div class="hint">마음속으로 하나 골랐다면, 실제 장소와 동선을 확인해보세요.</div>
''', "06", "대전행 퀴즈", theme="yellow")

cards["P2-07-cta.html"] = base('''
  <div class="eyebrow">QUIZ COMPLETE</div>
  <h1>도시를 바꾸기 전에<br><span class="marker">코스부터</span><br>바꿔보세요.</h1>
  <p class="lead">질문 4개만 답하면<br>오늘 기분에 맞는 대전 하루가 나옵니다.</p>
  <img class="char" style="width:270px;height:270px;right:68px;bottom:215px" src="../ssi-photo.png" alt="사진을 찍는 꿈씨패밀리">
  <div class="cta">내 기분에 맞는 대전 보기 →</div>
  <p class="small" style="text-align:center;margin:20px 0 0;font-weight:700">가입 없이 무료 · 프로필 링크에서 바로</p>
''', "07", "대전행 퀴즈", cover=True, theme="blue")


for filename, html in cards.items():
    (OUT / filename).write_text(html, encoding="utf-8")
    print(f"{filename:24s} {len(html) // 1024:2d} KB")
