"""GA4 이벤트 발화 점검.

dist 를 로컬에 띄우고 실제로 클릭해서, 우리 코드가 gtag 로 어떤 이벤트를
보내는지 확인한다. googletagmanager 는 차단해서 index.html 의 스텁
`gtag(){dataLayer.push(arguments)}` 가 살아 있게 두고 dataLayer 를 읽는다.

  python extracted/ga-events.check.py
"""
import functools
import http.server
import pathlib
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).parent / "dist"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 8793

NEEDED = ["mood_test_start", "mood_test_complete", "mood_section_view",
          "share_click", "lang_switch"]


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main():
    srv = socketserver.TCPServer(
        ("127.0.0.1", PORT), functools.partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()

    fails = []
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path=CHROME)
        pg = b.new_page(viewport={"width": 420, "height": 900})
        # 실제 gtag.js 가 뜨면 dataLayer 를 자기 방식으로 처리한다. 막아둔다.
        pg.route("**://*.googletagmanager.com/**", lambda r: r.abort())
        pg.goto(f"http://127.0.0.1:{PORT}/", wait_until="load")
        pg.wait_for_timeout(700)

        # 기분 섹션을 화면 중앙에 올려 mood_section_view 를 발화시킨다
        pg.evaluate("document.getElementById('choose').scrollIntoView({block:'center'})")
        pg.wait_for_timeout(700)
        pg.evaluate("window.scrollTo(0, 0)")
        pg.wait_for_timeout(300)

        pg.click(".hero .ticket-cta")
        pg.wait_for_timeout(300)

        for i in range(4):
            sel = ".test-step.active .answer-button"
            try:
                pg.wait_for_selector(sel, timeout=3000)
            except Exception:
                fails.append(f"{i + 1}번 문항 선택지를 못 찾음")
                break
            pg.query_selector_all(sel)[0].click()
            pg.wait_for_timeout(250)

        if not pg.query_selector(".result-screen"):
            fails.append("결과 화면이 안 떴다")

        pg.click(".result-share")
        pg.wait_for_timeout(500)
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(200)
        pg.click('.lang-toggle button:has-text("EN")')
        pg.wait_for_timeout(300)

        events = pg.evaluate("""() =>
          (window.dataLayer || [])
            .map(a => Array.from(a))
            .filter(a => a[0] === 'event')
            .map(a => [a[1], a[2]])
        """)
        b.close()
    srv.shutdown()

    print("발화한 이벤트")
    for name, params in events:
        print(f"  {name:22s} {params}")

    got = [n for n, _ in events]
    fails += [f"{n} 안 나감" for n in NEEDED if n not in got]
    if got.count("mood_test_complete") != 1:
        fails.append(f"mood_test_complete 가 {got.count('mood_test_complete')}번 "
                     "(1번이어야 함)")
    fails += [f"{n} 에 lang 파라미터 없음" for n, p in events if "lang" not in (p or {})]

    print()
    if fails:
        print("실패:")
        for f in fails:
            print("  -", f)
        return 1
    print("전부 통과")
    return 0


if __name__ == "__main__":
    sys.exit(main())
