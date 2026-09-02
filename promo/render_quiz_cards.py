"""quiz_cards/*.html을 1080x1080 JPEG과 기획안별 ZIP으로 렌더한다."""
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
import io

from PIL import Image
from playwright.sync_api import sync_playwright


HERE = Path(__file__).parent
SRC = HERE / "quiz_cards"
OUT = SRC / "jpg"
OUT.mkdir(parents=True, exist_ok=True)
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
W = H = 1080

cards = sorted(SRC.glob("P[12]-*.html"))

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=CHROME)
    page = browser.new_page(viewport={"width": W, "height": H}, device_scale_factor=2)
    for source in cards:
        page.goto(source.as_uri())
        page.wait_for_load_state("networkidle")
        page.evaluate("document.fonts.ready")
        check = page.evaluate("""() => {
          const c = document.querySelector('[data-content]');
          const all = [...c.querySelectorAll('*')];
          const clipped = all.filter(el => {
            const r = el.getBoundingClientRect();
            return r.left < 0 || r.right > 1080 || r.top < 0 || r.bottom > 1080;
          }).length;
          return {scrollW: document.documentElement.scrollWidth,
                  scrollH: document.documentElement.scrollHeight,
                  clipped};
        }""")
        png = page.screenshot(type="png", clip={"x": 0, "y": 0, "width": W, "height": H})
        image = Image.open(io.BytesIO(png)).convert("RGB").resize((W, H), Image.Resampling.LANCZOS)
        target = OUT / f"{source.stem}.jpg"
        image.save(target, quality=93, optimize=True, subsampling=1)
        ok = check["scrollW"] == W and check["scrollH"] == H and check["clipped"] == 0
        print(f"{target.name:24s} {target.stat().st_size // 1024:4d} KB  {'ok' if ok else check}")
    browser.close()

for plan, label in [("P1", "카드뉴스-기획안1-저장목록"), ("P2", "카드뉴스-기획안2-노잼반전")]:
    target = OUT / f"{label}.zip"
    images = sorted(OUT.glob(f"{plan}-*.jpg"))
    with ZipFile(target, "w", ZIP_DEFLATED) as archive:
        for image in images:
            archive.write(image, image.name)
    print(f"{target.name:32s} {target.stat().st_size // 1024:4d} KB")

    thumb = 260
    gap = 8
    sheet = Image.new("RGB", (thumb * 4 + gap * 5, thumb * 2 + gap * 3), "#ccefff")
    for index, path in enumerate(images):
        card = Image.open(path).convert("RGB").resize((thumb, thumb), Image.Resampling.LANCZOS)
        x = gap + (index % 4) * (thumb + gap)
        y = gap + (index // 4) * (thumb + gap)
        sheet.paste(card, (x, y))
    preview = OUT / f"{label}-전체미리보기.jpg"
    sheet.save(preview, quality=92, optimize=True, subsampling=1)
    print(f"{preview.name:32s} {preview.stat().st_size // 1024:4d} KB")
