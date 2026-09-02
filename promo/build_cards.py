"""카드뉴스 아트보드 9장을 생성한다.

에어메일 스타일 — 봉투 테두리 + 굵은 외곽선 손글씨 제목(Jua) + 사진/무지 배경.
9장이 같은 껍데기를 쓰므로 껍데기는 여기 한 번만 쓰고 내용만 카드별로 적는다.

  python build_cards.py     -> *.dc.html 재생성
  python render.py          -> jpg/*.jpg
"""
import io
import pathlib

HERE = pathlib.Path(__file__).parent

# ── 색 (랜딩페이지에서 그대로) ────────────────────────────────
INK = "#172033"        # 승차권 잉크
IVORY = "#fff9ed"
YELLOW = "#ffd83d"
COBALT = "#2869d8"
CORAL = "#ef6978"
PINK = "#ffc5cb"
BODY = "#595249"
MUTED = "#7b7568"
RULE = "#ddd1bd"

FONTS = ("https://fonts.googleapis.com/css2?"
         "family=Jua&family=Noto+Sans+KR:wght@400;500;700;900&display=swap")

# 테두리는 단색 한 줄. 배경과 반대되는 색 하나만 쓴다.
# (에어메일 사선은 너무 화려하다는 피드백으로 걷어냄)
FRAME_INSET = 30      # 카드 가장자리에서 테두리까지
FRAME_WIDTH = 8       # 테두리 굵기

DOTS = ("radial-gradient(rgba(95,75,48,.05) 1px, transparent 1.2px)", "14px 14px")
DOTS_DARK = ("radial-gradient(rgba(255,249,237,.07) 1px, transparent 1.2px)", "16px 16px")


def sparkle(size, fill=YELLOW):
    """제목 옆 반짝 스티커."""
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="{fill}" '
            f'stroke="{INK}" stroke-width="1.6" aria-hidden="true">'
            '<path d="M12 2l2.2 6.4L21 10.6l-5.4 3.9L17 21l-5-3.4L7 21l1.4-6.5L3 10.6l6.8-2.2z">'
            '</path></svg>')


def arrow(size, color=INK, down=False):
    d = ('<path d="M12 5v14"></path><path d="M5 12l7 7 7-7"></path>' if down
         else '<path d="M5 12h14"></path><path d="M13 5l7 7-7 7"></path>')
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" '
            f'stroke="{color}" stroke-width="2.5" stroke-linecap="round" '
            f'stroke-linejoin="round" aria-hidden="true">{d}</svg>')


def bookmark(size, color=INK):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" '
            f'stroke="{color}" stroke-width="2.2" stroke-linecap="round" '
            f'stroke-linejoin="round" aria-hidden="true">'
            '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z"></path></svg>')


def title(lines, size, fill=YELLOW, stroke=INK, sw=None, extra=""):
    """굵은 외곽선 손글씨 제목. paint-order 로 외곽선을 글자 뒤에 깐다."""
    sw = sw if sw else max(6, round(size * 0.095))
    shadow = f"{round(size*0.06)}px {round(size*0.075)}px 0 rgba(23,32,51,.42)"
    rows = "".join(
        f'<div style="font-size: {size}px; color: {fill}; '
        f'-webkit-text-stroke: {sw}px {stroke}; paint-order: stroke fill; '
        f'text-shadow: {shadow};">{ln}</div>'
        for ln in lines
    )
    return (f'<div style="font-family: \'Jua\', \'Noto Sans KR\', sans-serif; '
            f'line-height: 1.06; letter-spacing: -.02em; {extra}">{rows}</div>')


def badge(text, bg=YELLOW, color=INK, size=26, spaced=True):
    ls = ".1em" if spaced else "-.02em"
    return (f'<span style="display: inline-block; padding: 13px 24px; background: {bg}; '
            f'border: 3px solid {INK}; border-radius: 999px; color: {color}; '
            f'font-size: {size}px; font-weight: 900; letter-spacing: {ls}; '
            f'transform: rotate(-2deg);">{text}</span>')


def pill(inner, pad="24px 30px", radius=26, bg=None, translucent=False):
    """반투명 알약 박스. 사진 위에서도 글이 읽히게 한다."""
    bg = bg or (f"rgba(255,249,237,.94)" if translucent else "#fff")
    shadow = "7px 8px 0 rgba(23,32,51,.55)" if translucent else f"7px 8px 0 {INK}"
    return (f'<div style="padding: {pad}; background: {bg}; border: 3px solid {INK}; '
            f'border-radius: {radius}px; box-shadow: {shadow};">{inner}</div>')


def tag(text, color=IVORY):
    """하단 안내 알약 (사진 위 어두운 배경용)."""
    return (f'<div style="display: flex; align-items: center; gap: 12px; padding: 13px 26px; '
            f'align-self: flex-start; background: rgba(23,32,51,.84); border: 3px solid {color}; '
            f'border-radius: 999px; color: {color}; font-size: 25px; font-weight: 900;">{text}</div>')


# ── 껍데기 ────────────────────────────────────────────────
def shell(content, *, photo=None, alt="", ground="ivory", overlay=None):
    """카드 한 장. photo 를 주면 사진 풀블리드, 아니면 무지 배경."""
    if photo:
        base = f"background: #252525;"
        layers = (
            f'<img src="{photo}" alt="{alt}" style="position: absolute; inset: 0; '
            'width: 100%; height: 100%; object-fit: cover;">'
            f'<div style="position: absolute; inset: 0; background: {overlay};"></div>'
        )
        frame = IVORY          # 사진 위에는 아이보리 - 인화 테두리처럼
    elif ground == "ink":
        img, size = DOTS_DARK
        base = f"background-color: {INK}; background-image: {img}; background-size: {size};"
        layers = ""
        frame = IVORY
    else:
        img, size = DOTS
        base = f"background-color: {IVORY}; background-image: {img}; background-size: {size};"
        layers = ""
        frame = INK            # 아이보리 바탕에는 잉크 - 랜딩페이지와 같은 테두리

    return f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="{FONTS}">
  <style>
    body {{ margin: 0; }}
    * {{ box-sizing: border-box; }}
    a {{ color: {COBALT}; }} a:hover {{ color: #1b4fa8; }}
  </style>
</helmet>
<div style="position: relative; width: 1080px; height: 1350px; overflow: hidden; {base} font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif; color: #252525; word-break: keep-all; text-wrap: pretty;">
{layers}
  <div style="position: absolute; inset: 0; padding: {FRAME_INSET}px;">
    <div style="width: 100%; height: 100%; border: {FRAME_WIDTH}px solid {frame};"></div>
  </div>

  <div style="position: absolute; inset: 0; padding: 96px 84px; display: flex; flex-direction: column;">
{content}
  </div>
</div>
</x-dc>
<script data-dc-script data-props='{{"$preview":{{"width":1080,"height":1350}}}}'>
class Component extends DCLogic {{}}
</script>
</body>
</html>
"""


SPACER = '    <div style="flex-grow: 1;"></div>'
DARK_OV = ("linear-gradient(180deg, rgba(20,24,32,.55) 0%, rgba(20,24,32,.15) 38%,"
           " rgba(20,24,32,.72) 100%)")
LIGHT_OV = ("linear-gradient(180deg, rgba(20,24,32,.46) 0%, rgba(20,24,32,.12) 34%,"
            " rgba(20,24,32,.10) 62%, rgba(20,24,32,.42) 100%)")


def sub_on_photo(text, size=34):
    return (f'    <p style="margin: 30px 0 0; max-width: 740px; color: {IVORY}; '
            f'font-size: {size}px; font-weight: 700; line-height: 1.55; '
            f'text-shadow: 0 2px 10px rgba(0,0,0,.65);">{text}</p>')


def sub_plain(text, size=34, color="#50483f", top=30):
    return (f'    <p style="margin: {top}px 0 0; color: {color}; font-size: {size}px; '
            f'font-weight: 500; line-height: 1.6;">{text}</p>')


def cta_button(text):
    return (f'''    <div style="display: flex; flex-direction: column; align-items: stretch; gap: 16px;">
      <div style="padding: 32px 40px; display: flex; align-items: center; justify-content: center; gap: 16px; background: {YELLOW}; border: 3px solid {INK}; border-radius: 999px; box-shadow: 8px 9px 0 {INK}; color: {INK}; font-size: 42px; font-weight: 900; letter-spacing: -.03em;">
        <span>{text}</span>
        {arrow(40)}
      </div>''')


def cta_micro(text):
    return (f'      <p style="margin: 0; text-align: center; color: {MUTED}; font-size: 26px; '
            f'font-weight: 900; letter-spacing: .02em;">{text}</p>\n    </div>')


# ══════════════════════════════════════════════════════════
# B안 · 기분별 대전 하루
# ══════════════════════════════════════════════════════════

B1 = shell(photo="bg-expo.jpg", overlay=DARK_OV,
           alt="밤에 조명이 켜진 엑스포다리와 갑천 야경",
           content=f"""    <div style="display: flex; align-items: center; gap: 14px;">
      {badge("혼자 가는 대전", size=25, spaced=False)}
      <span style="color: {IVORY}; font-size: 24px; font-weight: 900; letter-spacing: .06em; text-shadow: 0 2px 8px rgba(0,0,0,.6);">SOLO TRIP · 2026</span>
    </div>

{SPACER}

    <div style="display: flex; align-items: baseline; gap: 18px;">
      {title(["대전 가서"], 128)}
    </div>
    <div style="display: flex; align-items: baseline; gap: 18px;">
      {title(["뭐 하지?"], 128, fill=IVORY)}
      {sparkle(66)}
    </div>

{sub_on_photo("검색하지 말고 오늘 기분부터 고르세요. 4가지 중 하나만 고르면 하루 코스가 나옵니다.")}

    <div style="margin-top: 26px; display: flex;">{tag("넘겨서 내 기분 찾기 " + arrow(26, IVORY))}</div>""")


MOOD_TONES = {
    "photo": "linear-gradient(145deg, #9dd8f6, #548fc1)",
    "food": "linear-gradient(145deg, #f8d48c, #bd7039)",
    "cafe": "linear-gradient(145deg, #ddc6aa, #84644c)",
    "lazy": "linear-gradient(145deg, #b5d5e8, #668ba8)",
}


def mood_row(kicker, color, name, places, art, art_alt):
    """꿈씨패밀리 타일 + 문구. 캐릭터는 공식 가이드라인의 기본형 그대로 쓴다."""
    tile = (f'<div style="width: 108px; height: 108px; flex-shrink: 0; padding: 10px; '
            f'display: grid; place-items: center; background: {MOOD_TONES[art]}; '
            f'border: 3px solid {INK}; border-radius: 20px;">'
            f'<img src="ssi-{art}.png" alt="{art_alt}" '
            'style="width: 100%; height: 100%; object-fit: contain;"></div>')
    text = (f'<div><span style="display: block; color: {color}; font-size: 21px; font-weight: 900; letter-spacing: .08em;">{kicker}</span>'
            f'<strong style="display: block; margin-top: 4px; font-size: 38px; font-weight: 900; letter-spacing: -.04em;">{name}</strong>'
            f'<p style="margin: 6px 0 0; color: {BODY}; font-size: 23px;">{places}</p></div>')
    return pill(
        f'<div style="display: flex; align-items: center; gap: 24px;">{tile}{text}</div>',
        pad="20px 26px", translucent=True)


B2 = shell(photo="bg-hanbit.jpg", overlay=LIGHT_OV,
           alt="엑스포과학공원 한빛탑 전경",
           content=f"""    <div style="display: flex; align-items: center; gap: 16px;">
      {title(["오늘 어느 쪽?"], 74)}
      {sparkle(46, IVORY)}
    </div>

    <p style="margin: 16px 0 0; color: {IVORY}; font-size: 27px; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,.6);">하나 고르면 그날 코스가 정해집니다</p>

    <div style="margin-top: 30px; display: flex; flex-direction: column; gap: 18px;">
      {mood_row("PHOTO", CORAL, "사진 왕창 찍고 싶은 날", "엑스포다리 · 이응노미술관 · 한빛탑", "photo", "셀카봉을 들고 사진을 찍는 꿈누리")}
      {mood_row("EAT", "#c4870f", "맛집 다 뿌수고 싶은 날", "토미야 · 트리니트 비스트로 · 희락반점", "food", "빵 봉지를 안고 뛰어가는 온솔")}
      {mood_row("CAFE", "#5c8a45", "느좋 카페 가고 싶은 날", "궁동 소신 · 톨드어스토리 · 쌍리", "cafe", "화분을 들고 서 있는 안경 쓴 꿈씨패밀리")}
      {mood_row("COURSE", COBALT, "아무 생각 하기 싫은 날", "소제동 → 구모카페 → 대동 하늘공원 → 식장산", "lazy", "엎드려 누워 쉬고 있는 꿈동이")}
    </div>

{SPACER}

    {tag("전부 프로필 링크에 정리해뒀어요")}""")


def review(place, stars, rating, quote, meta):
    return pill(
        '<div style="display: flex; align-items: baseline; justify-content: space-between; gap: 20px;">'
        f'<strong style="font-size: 34px; font-weight: 900; letter-spacing: -.03em;">{place}</strong>'
        '<span style="display: flex; align-items: baseline; gap: 10px; flex-shrink: 0;">'
        f'<span style="color: #c4870f; font-size: 26px; letter-spacing: .04em;">{stars}</span>'
        f'<b style="font-size: 30px; font-weight: 900; font-variant-numeric: tabular-nums;">{rating}</b>'
        '</span></div>'
        f'<p style="margin: 12px 0 0; min-height: 82px; color: #3d3730; font-size: 26px; font-weight: 500; line-height: 1.55;">&ldquo;{quote}&rdquo;</p>'
        f'<div style="margin-top: 8px; color: {MUTED}; font-size: 21px; font-weight: 700; font-variant-numeric: tabular-nums;">{meta}</div>',
        pad="26px 30px", translucent=True)


B3 = shell(ground="ivory",
           content=f"""    <div style="display: flex; align-items: center; gap: 16px;">
      {title(["우리만 좋다고 하는 거,", "아닙니다."], 62)}
    </div>

    <div style="margin-top: 30px; display: flex; flex-direction: column; gap: 18px;">
      {review("식장산 해돋이전망대", "★★★★★", "4.6", "주차도 무료고 올라가는 길도 재미있고, 야경이 정말 너무 예뻐요.", "@Mi M · 3,037 reviews")}
      {review("엑스포다리", "★★★★★", "4.5", "야경이 아름답고, 차가 다니지 않아 산책하기 좋아요.", "@H C · 1,282 reviews")}
      {review("토미야", "★★★★★", "4.5", "면발이 쫄깃하고 냉우동 육수와 튀김까지 정말 훌륭했어요.", "@룡이보호자 · 50 reviews")}
    </div>

{SPACER}

    <p style="margin: 0; color: {MUTED}; font-size: 21px; line-height: 1.5;">* Google 리뷰(via Wanderlog) · 다이닝코드에 공개된 표시값입니다. 플랫폼별 집계 기준은 서로 다를 수 있습니다.</p>""")


B4 = shell(ground="ivory",
           content=f"""    <div style="display: flex; align-items: center; gap: 16px;">
      {title(["오늘 당신은", "어느 쪽인가요?"], 96)}
    </div>

{sub_plain("질문 4개, 30초면 끝납니다.<br>결과에 하루 코스까지 같이 나옵니다.", size=36, top=34)}

{SPACER}

    <div style="display: grid; place-items: center;">
      <img src="kkumdori.png" alt="대전광역시 공식 캐릭터 꿈돌이" style="width: 360px; height: auto;">
    </div>

{SPACER}

{cta_button("내 기분으로 코스 만들기")}
{cta_micro("가입 없이 무료 · 프로필 링크에서 바로")}""")


# ══════════════════════════════════════════════════════════
# A안 · 10월 대전 축제
# ══════════════════════════════════════════════════════════

POSTERS = [
    ("poster-donggu.jpg", "2026 대전 동구동락 축제 포스터", "50% 50%", "-4deg"),
    ("poster-fair.jpg", "2026 대전콘텐츠페어 포스터", "50% 45%", "2.5deg"),
    ("poster-bread.jpg", "2026 대전빵축제 포스터", "50% 20%", "-1.5deg"),
]

A1 = shell(ground="ink",
           content=f"""    <div>
      {badge("OCTOBER 2026", size=25)}
    </div>

    <div style="margin-top: 30px;">
      {title(["10월 대전,", "주말 일정은", "이미 정해졌어요."], 106, fill=YELLOW, stroke=IVORY, sw=9)}
    </div>

    <p style="margin: 30px 0 0; color: {IVORY}; font-size: 36px; font-weight: 700; line-height: 1.5;">한 달에 축제 3개가 몰려 있습니다</p>

{SPACER}

    <div style="display: flex; align-items: flex-end; justify-content: center; gap: 20px;">
""" + "\n".join(
    f'      <img src="{src}" alt="{alt}" style="width: 268px; height: 379px; object-fit: cover; '
    f'object-position: {pos}; border: 3px solid {INK}; border-radius: 10px; '
    f'box-shadow: 7px 8px 0 rgba(0,0,0,.55); transform: rotate({rot});">'
    for src, alt, pos, rot in POSTERS
) + f"""
    </div>

    <p style="margin: 30px 0 0; color: rgba(255,249,237,.6); font-size: 20px;">포스터 ⓒ 각 행사 주최 측</p>

    <div style="margin-top: 18px; display: flex;">{tag("날짜만 저장해 가세요 " + arrow(26, IVORY))}</div>""")


def cal_row(date, weekday, name, place, translucent=True):
    return pill(
        '<div style="display: flex; align-items: center; gap: 24px;">'
        '<div style="width: 300px; flex-shrink: 0;">'
        f'<div style="color: {COBALT}; font-size: 42px; font-weight: 900; letter-spacing: -.03em; white-space: nowrap; font-variant-numeric: tabular-nums;">{date}</div>'
        f'<div style="margin-top: 4px; color: {MUTED}; font-size: 21px; font-weight: 700;">{weekday}</div>'
        '</div>'
        f'<div style="width: 1px; height: 78px; background: {RULE}; flex-shrink: 0;"></div>'
        '<div>'
        f'<strong style="font-size: 38px; font-weight: 900; letter-spacing: -.04em;">{name}</strong>'
        f'<p style="margin: 6px 0 0; color: {BODY}; font-size: 23px;">{place}</p>'
        '</div></div>',
        pad="22px 28px", radius=22, translucent=translucent)


A2 = shell(photo="bg-ungno.jpg", overlay=LIGHT_OV,
           alt="이응노미술관의 하얀 외벽과 대나무 정원",
           content=f"""    <div style="display: flex; align-items: center; gap: 16px;">
      {title(["10월 축제 달력"], 76)}
      {sparkle(46, IVORY)}
    </div>

    <p style="margin: 16px 0 0; color: {IVORY}; font-size: 25px; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,.6);">주말 세 번이 이미 정해져 있어요</p>

    <div style="margin-top: 28px; display: flex; flex-direction: column; gap: 16px;">
      {cal_row("10.09 – 10.11", "금 · 토 · 일", "동구동락 축제", "소제동 · 대동천 일원")}
      {cal_row("10.16 – 10.18", "금 · 토 · 일", "대전콘텐츠페어", "DCC 제2전시장")}
      {cal_row("10.17 – 10.18", "토 · 일", "2026 대전빵축제", "엑스포과학공원 한빛탑")}
      {cal_row("8월 – 12월", "상시", "유성온날 YUON", "유성구 · 10월을 놓쳐도 여기는 남아 있어요")}
    </div>

{SPACER}

    {tag(bookmark(28, IVORY) + " 이 장만 저장해두면 10월 일정 끝")}""")


def map_pin(num, name, place, date):
    return f"""      <div style="display: flex; align-items: flex-start; gap: 22px;">
        <span style="width: 46px; height: 46px; flex-shrink: 0; display: grid; place-items: center; background: {YELLOW}; border: 3px solid {INK}; border-radius: 50%; font-size: 24px; font-weight: 900; font-variant-numeric: tabular-nums;">{num}</span>
        <div>
          <strong style="display: block; font-size: 38px; font-weight: 900; letter-spacing: -.04em;">{name}</strong>
          <p style="margin: 6px 0 0; color: {BODY}; font-size: 24px;">{place}</p>
          <p style="margin: 4px 0 0; color: {COBALT}; font-size: 24px; font-weight: 900; font-variant-numeric: tabular-nums;">{date}</p>
        </div>
      </div>"""


def zone(kicker, kicker_color, name, side, tint, inner):
    return f"""    <div style="overflow: hidden; background: #fff; border: 3px solid {INK}; border-radius: 24px; box-shadow: 8px 9px 0 {INK};">
      <div style="padding: 18px 30px; display: flex; align-items: baseline; gap: 16px; background: {tint}; border-bottom: 3px solid {INK};">
        <span style="color: {kicker_color}; font-size: 22px; font-weight: 900; letter-spacing: .1em;">{kicker}</span>
        <strong style="font-size: 33px; font-weight: 900; letter-spacing: -.04em;">{name}</strong>
        <span style="color: {MUTED}; font-size: 22px; font-weight: 700;">{side}</span>
      </div>
      <div style="padding: 26px 30px; display: flex; flex-direction: column; gap: 16px;">
{inner}
      </div>
    </div>"""


A3 = shell(ground="ivory",
           content=f"""    <div>
      {badge("WHERE IN DAEJEON", size=25)}
    </div>

    <div style="margin-top: 26px; display: flex; align-items: center; gap: 16px;">
      {title(["축제 3개가", "두 동네에서 열려요."], 70)}
    </div>

    <div style="margin-top: 22px; display: flex; flex-direction: column; gap: 16px;">
{zone("AREA 01", COBALT, "엑스포 일원", "대전 북서쪽", "#f1f7ff",
      map_pin(1, "대전콘텐츠페어", "DCC 제2전시장", "10.16 – 10.18")
      + f"""
      <div style="display: flex; align-items: center; gap: 12px; padding-left: 12px;">
        {arrow(26, MUTED, down=True)}
        <span style="color: {MUTED}; font-size: 24px; font-weight: 900;">물빛광장 산책 20 ~ 30분</span>
      </div>"""
      + "\n" + map_pin(2, "2026 대전빵축제", "엑스포과학공원 한빛탑", "10.17 – 10.18"))}
{zone("AREA 02", "#c4632c", "원도심", "대전 동쪽", "#fff6ec",
      map_pin(3, "동구동락 축제", "소제동 · 대동천 일원", "10.09 – 10.11"))}
    </div>

{SPACER}

    <div style="padding-top: 24px; border-top: 3px solid {INK};">
      <p style="margin: 0; color: #3d3730; font-size: 26px; font-weight: 500; line-height: 1.6;"><strong style="font-weight: 900;">10월 17일엔 1번과 2번이 같이 열려 있어요.</strong> 그래서 하루에 둘 다 볼 수 있습니다.</p>
      <p style="margin: 12px 0 0; color: #8a8378; font-size: 20px; line-height: 1.5;">※ 실제 축척이 아닌 위치 관계 도식입니다. 정확한 위치는 각 행사 공식 채널에서 확인해 주세요.</p>
    </div>""")


def step(src, alt, pos, date, name, place):
    return f"""    <div style="display: flex; overflow: hidden; background: #fff; border: 3px solid {INK}; border-radius: 24px; box-shadow: 8px 9px 0 {INK};">
      <img src="{src}" alt="{alt}" style="width: 176px; height: 238px; flex-shrink: 0; object-fit: cover; object-position: {pos}; border-right: 3px solid {INK};">
      <div style="padding: 28px 32px; display: flex; flex-direction: column; justify-content: center;">
        <div style="color: {COBALT}; font-size: 26px; font-weight: 900; font-variant-numeric: tabular-nums;">{date}</div>
        <strong style="margin-top: 8px; font-size: 44px; font-weight: 900; letter-spacing: -.04em;">{name}</strong>
        <p style="margin: 10px 0 0; color: {BODY}; font-size: 25px;">{place}</p>
      </div>
    </div>"""


A4 = shell(ground="ivory",
           content=f"""    <div>
      {badge("10월 추천 PICK", bg=PINK, color=COBALT, size=25, spaced=False)}
    </div>

    <div style="margin-top: 26px; display: flex; align-items: center; gap: 16px;">
      {title(["10월 17일 하루면", "둘 다 봅니다."], 76)}
    </div>

    <div style="margin-top: 32px; display: flex; flex-direction: column; gap: 16px;">
{step("poster-fair.jpg", "2026 대전콘텐츠페어 포스터", "50% 45%", "10.16 – 10.18", "대전콘텐츠페어", "DCC 제2전시장 · 캐릭터 · 게임 · 굿즈")}

    <div style="display: flex; align-items: center; justify-content: center; gap: 14px;">
      {arrow(32, MUTED, down=True)}
      <span style="color: {MUTED}; font-size: 28px; font-weight: 900; letter-spacing: -.02em;">물빛광장 산책 20 ~ 30분</span>
    </div>

{step("poster-bread.jpg", "2026 대전빵축제 포스터", "50% 20%", "10.17 – 10.18", "2026 대전빵축제", "엑스포과학공원 한빛탑 · 대전이 빵의 도시인 이유")}
    </div>

{SPACER}

    <div style="padding-top: 24px; border-top: 3px solid {INK};">
      <p style="margin: 0; color: #3d3730; font-size: 26px; font-weight: 500; line-height: 1.6;"><strong style="font-weight: 900;">끝나고 그냥 집에 가지 마세요.</strong> 빵축제가 열리는 한빛탑에서 엑스포다리 방향으로 걸으면 탑의 불빛과 다리 조명이 차례로 이어집니다.</p>
      <p style="margin: 12px 0 0; color: #8a8378; font-size: 20px; line-height: 1.5;">포스터 ⓒ 각 행사 주최 측 · 음악분수와 미디어파사드는 방문 전 운영 일정을 확인해 주세요.</p>
    </div>""")


def mood_line(color, name, last=False):
    pad = "padding-top: 20px;" if last else "padding: 20px 0;"
    return (f'      <div style="display: flex; align-items: center; gap: 20px; {pad}">'
            f'<span style="width: 20px; height: 20px; flex-shrink: 0; background: {color}; '
            f'border: 3px solid {INK}; border-radius: 50%;"></span>'
            f'<span style="font-size: 34px; font-weight: 900; letter-spacing: -.04em;">{name}</span></div>')


A5 = shell(ground="ivory",
           content=f"""    <div style="display: flex; align-items: center; gap: 16px;">
      {title(["근데 축제 말고", "뭐 하지?"], 96)}
    </div>

{sub_plain("질문 4개만 답하면<br>오늘 기분에 맞는 하루 코스가 나옵니다.", size=36, top=34)}

    <div style="margin-top: 36px;">
{pill(
    mood_line(CORAL, "사진 왕창 찍고 싶은 날").replace("padding: 20px 0;", "padding-bottom: 20px;")
    + f'<div style="height: 1px; background: {RULE};"></div>'
    + mood_line("#d9a715", "맛집 다 뿌수고 싶은 날")
    + f'<div style="height: 1px; background: {RULE};"></div>'
    + mood_line("#71995c", "느좋 카페 가고 싶은 날")
    + f'<div style="height: 1px; background: {RULE};"></div>'
    + mood_line("#397dcc", "아무 생각 하기 싫은 날", last=True),
    pad="30px 34px", radius=24)}
    </div>

{SPACER}

{cta_button("30초 만에 내 코스 찾기")}
{cta_micro("축제 일정도 이 링크에 정리해뒀어요")}""")



# ══════════════════════════════════════════════════════════
# C안 · 온통대전 혜택 (여행자가 챙길 수 있는 것만)
#
# 자료 : 대전광역시 「즉시 체감 서비스」('26. 9~12월)
# 표에 있어도 여행자와 무관한 것(정책지원금·상권분석·소상공인지원·
# 선물하기·온정나눔)은 넣지 않는다. 12월 캐시백은 표에 "기본+α"로만
# 적혀 있어 수치를 지어내지 않고 뺐다.
# 가입 자격 : 거주 무관, 만 14세 이상 누구나 (2026-09-02 확인)
# ══════════════════════════════════════════════════════════

SOURCE_NOTE = "자료 : 대전광역시 「즉시 체감 서비스」(&rsquo;26. 9~12월)"
JUA = "'Jua', 'Noto Sans KR', sans-serif"


def percent_card(pct, label):
    """큰 퍼센트 한 개. 표지에서 두 장 나란히 쓴다."""
    return pill(
        f'<div style="font-family: {JUA}; font-size: 116px; line-height: 1; color: {YELLOW}; '
        f'-webkit-text-stroke: 10px {INK}; paint-order: stroke fill; letter-spacing: -.02em;">{pct}</div>'
        f'<p style="margin: 14px 0 0; font-size: 26px; font-weight: 900; letter-spacing: -.03em; line-height: 1.35;">{label}</p>',
        pad="30px 32px", radius=24)


def rate_row(name, value, last=False):
    """왼쪽 항목 · 오른쪽 수치. 수치는 tabular-nums 로 세로를 맞춘다."""
    border = "" if last else f"border-bottom: 1px solid {RULE};"
    return (f'<div style="display: flex; align-items: baseline; justify-content: space-between; '
            f'gap: 20px; padding: 10px 0; {border}">'
            f'<span style="font-size: 26px; font-weight: 700;">{name}</span>'
            f'<strong style="flex-shrink: 0; color: {COBALT}; font-size: 31px; font-weight: 900; '
            f'font-variant-numeric: tabular-nums;">{value}</strong></div>')


def rate_card(label, rows, note):
    return pill(
        f'<span style="display: inline-block; margin-bottom: 10px; padding: 7px 16px; '
        f'background: {YELLOW}; border: 3px solid {INK}; border-radius: 999px; '
        f'font-size: 22px; font-weight: 900; letter-spacing: .04em;">{label}</span>'
        + "".join(rows)
        + f'<p style="margin: 12px 0 0; color: {MUTED}; font-size: 20px; line-height: 1.5;">{note}</p>',
        pad="20px 26px", radius=24)


def link_block(num, what, reward):
    """랜딩페이지 코스 ↔ 마일리지 연결 한 칸."""
    return pill(
        '<div style="display: flex; align-items: flex-start; gap: 22px;">'
        f'<span style="width: 44px; height: 44px; flex-shrink: 0; display: grid; place-items: center; '
        f'background: {YELLOW}; border: 3px solid {INK}; border-radius: 50%; font-size: 23px; '
        f'font-weight: 900; font-variant-numeric: tabular-nums;">{num}</span>'
        '<div style="flex-grow: 1;">'
        f'<p style="margin: 0; font-size: 30px; font-weight: 900; letter-spacing: -.03em; line-height: 1.4;">{what}</p>'
        f'<div style="margin: 12px 0; height: 1px; background: {RULE};"></div>'
        f'<p style="margin: 0; color: {COBALT}; font-size: 26px; font-weight: 900;">{reward}</p>'
        '</div></div>',
        pad="24px 28px", radius=24)


def step_line(num, text, first=False, last=False):
    pad = ("padding-bottom: 16px;" if first else
           "padding-top: 16px;" if last else "padding: 16px 0;")
    return (f'<div style="display: flex; align-items: center; gap: 18px; {pad}">'
            f'<span style="width: 38px; height: 38px; flex-shrink: 0; display: grid; place-items: center; '
            f'background: {YELLOW}; border: 3px solid {INK}; border-radius: 50%; font-size: 21px; '
            f'font-weight: 900; font-variant-numeric: tabular-nums;">{num}</span>'
            f'<span style="font-size: 30px; font-weight: 900; letter-spacing: -.03em;">{text}</span></div>')


def hint_pill(text):
    """아이보리 바탕용 유도 알약. 옐로 배경 + 잉크 테두리."""
    return (f'<div style="display: flex; align-items: center; gap: 12px; padding: 14px 26px; '
            f'align-self: flex-start; background: {YELLOW}; border: 3px solid {INK}; '
            f'border-radius: 999px; color: {INK}; font-size: 26px; font-weight: 900;">'
            f'{text}{arrow(26)}</div>')


C1 = shell(ground="ivory",
           content=f"""    <div>
      {badge("온통대전 · 2026. 9~12월", size=24, spaced=False)}
    </div>

    <div style="margin-top: 28px;">
      {title(["대전 시민만", "되는 거 아니에요."], 98)}
    </div>

{sub_plain("만 14세 이상이면 누구나 발급됩니다.<br>30만원 충전하면 3만원이 캐시백으로 돌아옵니다.", size=34, top=32)}

{SPACER}

    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px;">
      {percent_card("10%", "기본 캐시백")}
      {percent_card("15%", "9월 추석 · 착한가격업소")}
    </div>

{SPACER}

    <div style="display: flex;">{hint_pill("넘겨서 숫자 보기")}</div>

    <p style="margin: 22px 0 0; color: {MUTED}; font-size: 20px;">{SOURCE_NOTE}</p>""")


C2 = shell(ground="ivory",
           content=f"""    <div>
      {title(["여행자가 챙길 건 세 가지"], 56)}
    </div>

{sub_plain("나머지는 대전 시민 · 소상공인 대상이라 접어뒀어요.", size=24, color=MUTED, top=12)}

    <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 14px;">
{rate_card("캐시백", [
    rate_row("기본", "10%"),
    rate_row("9월 (추석)", "15%"),
    rate_row("착한가격업소 · 9~12월", "15%", last=True),
], "※ 월 충전한도 30만원, 충전액 기준. 10~11월엔 전통시장 · 골목형 상점가에서 13%.")}

{rate_card("보람마일리지", [
    rate_row("매일 8천 보 이상 걷기", "150P"),
    rate_row("버스 · 지하철 이용", "50P"),
    rate_row("미술관 · 도서관 QR 인증 (10월~)", "50P", last=True),
], "※ 일 최대 440P · 월 최대 11,000P")}

{rate_card("카드포인트", [
    rate_row("안 쓰는 카드 포인트를 온통대전으로", "9개 카드사", last=True),
], "현대 · KB국민 · 신한 · NH농협 · 삼성 · 우리 · 하나 · BC · 롯데")}
    </div>

{SPACER}

    <p style="margin: 0; color: {MUTED}; font-size: 20px;">{SOURCE_NOTE}</p>""")


C3 = shell(ground="ivory",
           content=f"""    <div>
      {badge("우리 코스랑 붙여보면", bg=PINK, color=COBALT, size=24, spaced=False)}
    </div>

    <div style="margin-top: 26px;">
      {title(["우리 코스 그대로 걸으면", "마일리지도 같이 쌓여요."], 66)}
    </div>

    <div style="margin-top: 28px; display: flex; flex-direction: column; gap: 16px;">
      {link_block(1, "소제동 → 구모카페 → 대동 하늘공원 → 식장산", "걷기보상 · 8천 보 달성 150P")}
      {link_block(2, "이응노미술관에서 QR 인증", "시설방문인증 · 50P/회 (10월~)")}
      {link_block(3, "대전역에서 버스 · 지하철로 이동", "대중교통 · 50P/회")}
    </div>

{SPACER}

    <div style="padding-top: 24px; border-top: 3px solid {INK};">
      <p style="margin: 0; color: #3d3730; font-size: 26px; font-weight: 500; line-height: 1.6;"><strong style="font-weight: 900;">코스 한 바퀴면 하루 마일리지가 거의 다 찹니다.</strong> 어차피 걸을 길이고, 어차피 탈 버스니까요.</p>
      <p style="margin: 12px 0 0; color: #8a8378; font-size: 20px; line-height: 1.5;">{SOURCE_NOTE} · 시설방문인증 대상 시설과 QR 위치는 온통대전 앱에서 확인해 주세요.</p>
    </div>""")


C4 = shell(ground="ivory",
           content=f"""    <div>
      {title(["코스는 우리가,", "캐시백은 대전시가."], 86)}
    </div>

{sub_plain("걷는 길만 정해두면 나머지는 알아서 쌓입니다.", size=34, top=32)}

    <div style="margin-top: 32px;">
{pill(
    step_line(1, "온통대전 발급 — 만 14세 이상 누구나", first=True)
    + f'<div style="height: 1px; background: {RULE};"></div>'
    + step_line(2, "우리 코스 순서대로 걷기")
    + f'<div style="height: 1px; background: {RULE};"></div>'
    + step_line(3, "캐시백 + 마일리지 같이 챙기기", last=True),
    pad="28px 32px", radius=24)}
    </div>

{SPACER}

    <div style="display: grid; place-items: center;">
      <img src="kkumdori.png" alt="대전광역시 공식 캐릭터 꿈돌이" style="width: 200px; height: auto;">
    </div>

{SPACER}

{cta_button("마일리지 쌓이는 코스 보기")}
{cta_micro("프로필 링크 · 가입 없이 무료")}

    <p style="margin: 20px 0 0; text-align: center; color: {MUTED}; font-size: 20px;">{SOURCE_NOTE}</p>""")


CARDS = {
    "Main.dc.html": B1,
    "MoodList.dc.html": B2,
    "MoodProof.dc.html": B3,
    "MoodCta.dc.html": B4,
    "FestCover.dc.html": A1,
    "FestCalendar.dc.html": A2,
    "FestMap.dc.html": A3,
    "FestCourse.dc.html": A4,
    "FestCta.dc.html": A5,
    "BenefitCover.dc.html": C1,
    "BenefitRates.dc.html": C2,
    "BenefitCourse.dc.html": C3,
    "BenefitCta.dc.html": C4,
}

for name, html in CARDS.items():
    io.open(HERE / name, "w", encoding="utf-8", newline="\n").write(html)
    print(f"{name:24s} {len(html)//1024} KB")
