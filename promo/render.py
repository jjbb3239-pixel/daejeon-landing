"""아트보드 .dc.html 을 1080x1350 JPEG 으로 뽑는다.
   사용 : python render.py            (전부)
          python render.py StyleMood  (일부)
"""
import io, re, sys, base64, pathlib
from playwright.sync_api import sync_playwright
from PIL import Image

SRC = pathlib.Path(__file__).parent
STAND = SRC / "_standalone"; STAND.mkdir(exist_ok=True)
OUT = SRC / "jpg"; OUT.mkdir(exist_ok=True)
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
MIME = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg"}
W, H = 1080, 1350

CARDS = [
    ("Main.dc.html",         "B1-표지"),
    ("MoodList.dc.html",     "B2-기분4종"),
    ("MoodProof.dc.html",    "B3-리뷰"),
    ("MoodCta.dc.html",      "B4-CTA"),
    ("FestCover.dc.html",    "A1-표지"),
    ("FestCalendar.dc.html", "A2-달력"),
    ("FestMap.dc.html",      "A3-지도"),
    ("FestCourse.dc.html",   "A4-코스"),
    ("FestCta.dc.html",      "A5-CTA"),
    ("BenefitCover.dc.html", "C1-표지"),
    ("BenefitRates.dc.html", "C2-혜택"),
    ("BenefitCourse.dc.html","C3-연결"),
    ("BenefitCta.dc.html",   "C4-CTA"),
    
    
]

only = sys.argv[1:]
cards = [c for c in CARDS if not only or any(o in c[0] for o in only)]

for fn, label in cards:
    s = io.open(SRC / fn, encoding="utf-8").read()
    head = re.search(r"<helmet>(.*?)</helmet>", s, re.S).group(1)
    body = re.search(r"</helmet>(.*?)</x-dc>", s, re.S).group(1)
    for name in set(re.findall(r'src="([^"]+\.(?:png|jpe?g))"', body)):
        p = SRC / name
        uri = f"data:{MIME[p.suffix.lower()]};base64,{base64.b64encode(p.read_bytes()).decode()}"
        body = body.replace(f'src="{name}"', f'src="{uri}"')
    (STAND / f"{label}.html").write_text(
        '<!doctype html><html lang="ko"><head><meta charset="utf-8">' + head
        + "<style>html,body{margin:0;padding:0}</style></head><body>" + body + "</body></html>",
        encoding="utf-8")

# 잘림 검사 : flex 가 눌러버리기 전 실제 높이를 본다
JS = """() => {
  const root = document.body.firstElementChild;
  // 새 껍데기는 마지막 자식이 내용 레이어 (absolute inset:0 + padding + flex column)
  const box = root.lastElementChild;
  const cs = getComputedStyle(box);
  const padT = parseFloat(cs.paddingTop), padB = parseFloat(cs.paddingBottom);
  const budget = box.clientHeight - padT - padB;
  // flex 가 눌러 감추는 것을 막고 진짜 높이를 잰다
  for (const el of box.querySelectorAll('*')) el.style.flexShrink = '0';
  let used = 0;
  for (const ch of box.children) {
    const m = getComputedStyle(ch);
    used += ch.getBoundingClientRect().height
          + parseFloat(m.marginTop) + parseFloat(m.marginBottom);
  }
  used = Math.round(used);
  return {ok: used <= budget, budget, used, over: used - budget};
}"""
with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path=CHROME)
    page = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=2)
    for _, label in cards:
        page.goto((STAND / f"{label}.html").as_uri())
        page.wait_for_load_state("networkidle")
        page.evaluate("document.fonts.ready")
        d = page.evaluate(JS)
        png = page.screenshot(type="png", clip={"x": 0, "y": 0, "width": W, "height": H})
        im = Image.open(io.BytesIO(png)).convert("RGB").resize((W, H), Image.LANCZOS)
        p = OUT / f"{label}.jpg"
        im.save(p, quality=92, optimize=True, subsampling=1)
        mark = "ok" if d.get("ok") else "OVERFLOW " + str(d)
        print(f"{label:14s} {p.stat().st_size//1024:4d} KB  {mark}")
    b.close()
