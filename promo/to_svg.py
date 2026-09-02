"""카드 아트보드를 Figma 에서 편집 가능한 SVG 로 뽑는다.

HTML 을 그대로 SVG 로 감싸는 방법(foreignObject)은 Figma 가 못 읽는다.
그래서 브라우저에서 렌더한 뒤 실측 좌표를 읽어 진짜 도형·텍스트로 다시 그린다.
글자는 <text> 로 나가므로 Figma 에서 바로 고칠 수 있다.

  python to_svg.py            -> svg/A안.svg, svg/B안.svg, svg/C안.svg

한계 (알고 쓰는 것) :
  · 배경 도트 텍스처는 뺀다. 단색 바탕만 남는다.
  · 줄바꿈은 렌더된 결과를 줄 단위로 굳힌다. Figma 에서 글을 늘리면 다시 안 흐른다.
  · 폰트는 Jua / Noto Sans KR. 둘 다 Google Fonts 라 Figma 에 있다.
"""
import io
import json
import pathlib
import re

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent
STAND = HERE / "_standalone"
OUT = HERE / "svg"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
W, H = 1080, 1350
GAP = 80

# Figma 는 자체 Google Fonts 를 쓰지만, 브라우저나 다른 도구로 열 때
# 대체 폰트로 떨어지지 않게 SVG 안에도 링크를 넣어둔다.
FONT_STYLE = (
    "<style>@import url('https://fonts.googleapis.com/css2?"
    "family=Jua&amp;family=Noto+Sans+KR:wght@400;500;700;900&amp;display=swap');</style>"
)

SETS = {
    "B안": [("B1-표지", "표지"), ("B2-기분4종", "기분 4종"),
            ("B3-리뷰", "실제 리뷰"), ("B4-CTA", "CTA")],
    "A안": [("A1-표지", "표지"), ("A2-달력", "10월 달력"), ("A3-지도", "축제 위치"),
            ("A4-코스", "10.17 코스"), ("A5-CTA", "CTA")],
    "C안": [("C1-표지", "표지"), ("C2-혜택", "혜택 세 가지"),
            ("C3-연결", "코스 연결"), ("C4-CTA", "CTA")],
}

# ── 브라우저에서 실측값을 긁어오는 부분 ───────────────────────
COLLECT_JS = r"""() => {
  const px = v => parseFloat(v) || 0;
  const seen = v => v && v !== 'none' && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent';

  // 글자 기준선. 캔버스로 실제 ascent 를 재서 <text> y 를 맞춘다.
  const cv = document.createElement('canvas').getContext('2d');
  const asc = {};
  function ascentOf(font) {
    if (asc[font] === undefined) {
      cv.font = font;
      const m = cv.measureText('가Ag');
      asc[font] = {
        a: m.fontBoundingBoxAscent || m.actualBoundingBoxAscent || 0,
        d: m.fontBoundingBoxDescent || m.actualBoundingBoxDescent || 0,
      };
    }
    return asc[font];
  }

  // 회전은 측정 전에 벗겨두고 각도만 기억한다. 안 그러면 회전된 bbox 가 잡힌다.
  const spun = [];
  for (const el of document.querySelectorAll('*')) {
    const t = getComputedStyle(el).transform;
    if (t && t !== 'none') {
      const m = new DOMMatrixReadOnly(t);
      const deg = Math.atan2(m.b, m.a) * 180 / Math.PI;
      if (Math.abs(deg) > 0.01) {
        const r = el.getBoundingClientRect();
        spun.push([el, deg, r.left + r.width / 2, r.top + r.height / 2]);
      }
      el.style.transform = 'none';
    }
  }
  const spinOf = new Map(spun.map(([el, deg]) => [el, deg]));

  function radii(cs, w, h) {
    const r = px(cs.borderTopLeftRadius);
    return Math.min(r, w / 2, h / 2);
  }

  // linear-gradient(Ndeg, c p%, ...) 만 다룬다. 카드에 쓰는 건 이 형태뿐.
  function grad(v) {
    const m = v.match(/linear-gradient\((-?[\d.]+)deg,\s*(.+)\)$/);
    if (!m) return null;
    const angle = parseFloat(m[1]);
    const stops = [];
    // 색 안의 콤마와 스톱 구분 콤마를 구분해서 자른다
    let depth = 0, buf = '';
    for (const ch of m[2] + ',') {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { stops.push(buf.trim()); buf = ''; }
      else buf += ch;
    }
    return {
      angle,
      stops: stops.map((s, i) => {
        const mm = s.match(/^(.*?)(?:\s+([\d.]+)%)?$/);
        return {
          color: mm[1].trim(),
          offset: mm[2] !== undefined ? parseFloat(mm[2]) / 100
                                      : i / Math.max(1, stops.length - 1),
        };
      }),
    };
  }

  // 텍스트 노드를 줄 단위로 쪼갠다. 문자마다 위치를 재서 같은 줄끼리 묶는다.
  function lines(node) {
    const out = [];
    const txt = node.textContent;
    const rg = document.createRange();
    let cur = null;
    for (let i = 0; i < txt.length; i++) {
      rg.setStart(node, i);
      rg.setEnd(node, i + 1);
      const r = rg.getClientRects()[0];
      if (!r || r.width === 0 && txt[i].trim() === '') {
        if (cur) cur.text += txt[i];
        continue;
      }
      if (!cur || Math.abs(r.top - cur.top) > 2) {
        cur = {text: txt[i], top: r.top, bottom: r.bottom, left: r.left, right: r.right};
        out.push(cur);
      } else {
        cur.text += txt[i];
        cur.right = Math.max(cur.right, r.right);
        cur.left = Math.min(cur.left, r.left);
      }
    }
    return out.filter(l => l.text.trim() !== '')
              .map(l => ({...l, text: l.text.replace(/\s+$/, '')}));
  }

  function walk(el) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return null;
    const r = el.getBoundingClientRect();
    const node = {
      tag: el.tagName.toLowerCase(),
      x: r.left, y: r.top, w: r.width, h: r.height,
      spin: spinOf.get(el) ?? null,
      rx: radii(cs, r.width, r.height),
      opacity: parseFloat(cs.opacity),
      fill: null, gradient: null, shadow: null,
      border: null, image: null, texts: [], children: [],
    };

    if (seen(cs.backgroundColor)) node.fill = cs.backgroundColor;
    const bi = cs.backgroundImage;
    if (bi && bi.startsWith('linear-gradient')) node.gradient = grad(bi);

    // 하드섀도우(번짐 0)만 살린다. 카드에 쓰는 건 전부 이 형태.
    const sh = cs.boxShadow;
    if (seen(sh)) {
      const m = sh.match(/^(rgba?\([^)]+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/);
      if (m && parseFloat(m[4]) < 1) {
        node.shadow = {color: m[1], dx: parseFloat(m[2]), dy: parseFloat(m[3])};
      }
    }

    const bw = px(cs.borderTopWidth);
    if (bw > 0 && seen(cs.borderTopColor)) {
      node.border = {w: bw, color: cs.borderTopColor};
      // 한쪽 테두리만 있는 경우(구분선 대용)는 사각형 대신 선으로
      const sides = ['Top', 'Right', 'Bottom', 'Left'].map(s => px(cs['border' + s + 'Width']));
      if (sides.filter(v => v > 0).length < 4) {
        node.border = null;
        const names = ['Top', 'Right', 'Bottom', 'Left'];
        node.edges = [];
        sides.forEach((v, i) => {
          if (v > 0) node.edges.push({side: names[i], w: v, color: cs['border' + names[i] + 'Color']});
        });
      }
    }

    if (node.tag === 'img' && el.currentSrc) {
      node.image = {
        href: el.currentSrc,
        fit: cs.objectFit,
        pos: cs.objectPosition,
      };
    }

    if (node.tag === 'svg') {
      node.rawSvg = el.outerHTML;
      return node;   // 아이콘은 마크업째로 옮긴다
    }

    const fontShort = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    for (const ch of el.childNodes) {
      if (ch.nodeType === 3 && ch.textContent.trim() !== '') {
        const {a, d} = ascentOf(fontShort);
        for (const ln of lines(ch)) {
          const mid = (ln.top + ln.bottom) / 2;
          node.texts.push({
            text: ln.text,
            x: cs.textAlign === 'center' ? (ln.left + ln.right) / 2 : ln.left,
            y: mid - (a + d) / 2 + a,
            anchor: cs.textAlign === 'center' ? 'middle' : 'start',
            size: px(cs.fontSize),
            weight: cs.fontWeight,
            family: cs.fontFamily.split(',')[0].replace(/["']/g, ''),
            color: cs.color,
            spacing: px(cs.letterSpacing),
            stroke: px(cs.webkitTextStrokeWidth) > 0
                    ? {w: px(cs.webkitTextStrokeWidth), color: cs.webkitTextStrokeColor}
                    : null,
            shadow: (() => {
              const m = cs.textShadow.match(
                /^(rgba?\([^)]+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/);
              return m && parseFloat(m[4]) < 1
                     ? {color: m[1], dx: parseFloat(m[2]), dy: parseFloat(m[3])} : null;
            })(),
          });
        }
      } else if (ch.nodeType === 1) {
        const c = walk(ch);
        if (c) node.children.push(c);
      }
    }
    return node;
  }

  return walk(document.body.firstElementChild);
}"""


# ── SVG 로 내보내는 부분 ──────────────────────────────────
def esc(t):
    return (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


class Emitter:
    def __init__(self):
        self.defs = []
        self.n = 0

    def uid(self, kind):
        self.n += 1
        return f"{kind}{self.n}"

    def gradient(self, g, x, y, w, h):
        """CSS 각도(0deg=위쪽)를 SVG 두 점으로 바꾼다."""
        import math
        a = math.radians(g["angle"])
        dx, dy = math.sin(a), -math.cos(a)
        # 박스 안에서 그라디언트 선의 양 끝
        cx, cy = 0.5, 0.5
        k = (abs(dx) + abs(dy)) / 2
        x1, y1 = cx - dx * k, cy - dy * k
        x2, y2 = cx + dx * k, cy + dy * k
        gid = self.uid("grad")
        stops = "".join(
            f'<stop offset="{s["offset"]:.4f}" stop-color="{s["color"]}"/>'
            for s in g["stops"]
        )
        self.defs.append(
            f'<linearGradient id="{gid}" x1="{x1:.4f}" y1="{y1:.4f}" '
            f'x2="{x2:.4f}" y2="{y2:.4f}">{stops}</linearGradient>'
        )
        return f"url(#{gid})"

    def node(self, nd, ox, oy):
        """한 요소와 그 아래를 SVG 조각 목록으로."""
        out = []
        x, y = nd["x"] - ox, nd["y"] - oy
        w, h = nd["w"], nd["h"]
        rx = nd["rx"]

        if nd.get("rawSvg"):
            svg = nd["rawSvg"]
            svg = re.sub(r"<svg", f'<svg x="{x:.1f}" y="{y:.1f}"', svg, count=1)
            return [svg]

        if nd["shadow"]:
            s = nd["shadow"]
            out.append(
                f'<rect x="{x + s["dx"]:.1f}" y="{y + s["dy"]:.1f}" width="{w:.1f}" '
                f'height="{h:.1f}" rx="{rx:.1f}" fill="{s["color"]}"/>'
            )

        paint = nd["fill"]
        if nd["gradient"]:
            paint = self.gradient(nd["gradient"], x, y, w, h)
        if paint:
            out.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" '
                       f'height="{h:.1f}" rx="{rx:.1f}" fill="{paint}"/>')

        if nd["image"]:
            im = nd["image"]
            par = "xMidYMid slice" if im["fit"] == "cover" else "xMidYMid meet"
            cid = self.uid("clip")
            self.defs.append(
                f'<clipPath id="{cid}"><rect x="{x:.1f}" y="{y:.1f}" '
                f'width="{w:.1f}" height="{h:.1f}" rx="{rx:.1f}"/></clipPath>'
            )
            out.append(
                f'<image clip-path="url(#{cid})" x="{x:.1f}" y="{y:.1f}" '
                f'width="{w:.1f}" height="{h:.1f}" preserveAspectRatio="{par}" '
                f'href="{im["href"]}"/>'
            )

        if nd["border"]:
            b = nd["border"]
            i = b["w"] / 2
            out.append(
                f'<rect x="{x + i:.1f}" y="{y + i:.1f}" width="{max(0, w - b["w"]):.1f}" '
                f'height="{max(0, h - b["w"]):.1f}" rx="{max(0, rx - i):.1f}" '
                f'fill="none" stroke="{b["color"]}" stroke-width="{b["w"]}"/>'
            )

        for e in nd.get("edges", []):
            side, bw, col = e["side"], e["w"], e["color"]
            if side == "Top":
                x1, y1, x2, y2 = x, y + bw / 2, x + w, y + bw / 2
            elif side == "Bottom":
                x1, y1, x2, y2 = x, y + h - bw / 2, x + w, y + h - bw / 2
            elif side == "Left":
                x1, y1, x2, y2 = x + bw / 2, y, x + bw / 2, y + h
            else:
                x1, y1, x2, y2 = x + w - bw / 2, y, x + w - bw / 2, y + h
            out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
                       f'stroke="{col}" stroke-width="{bw}"/>')

        for t in nd["texts"]:
            attrs = [
                f'x="{t["x"] - ox:.1f}"', f'y="{t["y"] - oy:.1f}"',
                f'font-family="{t["family"]}"', f'font-size="{t["size"]:.0f}"',
                f'font-weight="{t["weight"]}"', f'fill="{t["color"]}"',
            ]
            if t["anchor"] != "start":
                attrs.append(f'text-anchor="{t["anchor"]}"')
            if abs(t["spacing"]) > 0.05:
                attrs.append(f'letter-spacing="{t["spacing"]:.2f}"')
            if t["stroke"]:
                attrs.append(f'stroke="{t["stroke"]["color"]}"')
                attrs.append(f'stroke-width="{t["stroke"]["w"]:.1f}"')
                attrs.append('paint-order="stroke"')
                attrs.append('stroke-linejoin="round"')
            # 하드 드롭섀도우는 같은 글자를 색만 바꿔 뒤에 한 번 더 그린다
            sh = t.get("shadow")
            if sh:
                sa = [a for a in attrs if not a.startswith(("x=", "y=", "fill=", "stroke"))]
                sa = ([f'x="{t["x"] - ox + sh["dx"]:.1f}"', f'y="{t["y"] - oy + sh["dy"]:.1f}"',
                       f'fill="{sh["color"]}"'] + sa)
                if t["stroke"]:
                    sa += [f'stroke="{sh["color"]}"', f'stroke-width="{t["stroke"]["w"]:.1f}"']
                out.append(f'<text {" ".join(sa)}>{esc(t["text"])}</text>')
            out.append(f'<text {" ".join(attrs)}>{esc(t["text"])}</text>')

        for c in nd["children"]:
            out += self.node(c, ox, oy)

        if nd["spin"] is not None:
            cx = x + w / 2
            cy = y + h / 2
            body = "".join(out)
            out = [f'<g transform="rotate({nd["spin"]:.2f} {cx:.1f} {cy:.1f})">{body}</g>']

        if nd["opacity"] < 0.999:
            out = [f'<g opacity="{nd["opacity"]:.3f}">{"".join(out)}</g>']

        return out


def build(name, cards, page):
    em = Emitter()
    groups = []
    for i, (label, title) in enumerate(cards):
        page.goto((STAND / f"{label}.html").as_uri())
        page.wait_for_load_state("networkidle")
        page.evaluate("document.fonts.ready")
        tree = page.evaluate(COLLECT_JS)
        ox = tree["x"]
        oy = tree["y"]
        body = "".join(em.node(tree, ox, oy))
        dx = i * (W + GAP)
        groups.append(
            f'<g id="{label}" transform="translate({dx} 0)">'
            f'<title>{esc(title)}</title>'
            f'<clipPath id="frame{i}"><rect width="{W}" height="{H}"/></clipPath>'
            f'<g clip-path="url(#frame{i})">{body}</g>'
            f"</g>"
        )
        print(f"  {label}")

    total_w = len(cards) * W + (len(cards) - 1) * GAP
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
        f'width="{total_w}" height="{H}" viewBox="0 0 {total_w} {H}">'
        + FONT_STYLE
        + f"<defs>{''.join(em.defs)}</defs>"
        + "".join(groups)
        + "</svg>"
    )
    OUT.mkdir(exist_ok=True)
    p = OUT / f"{name}.svg"
    io.open(p, "w", encoding="utf-8", newline="\n").write(svg)
    print(f"{name}.svg  {p.stat().st_size // 1024} KB  ({len(cards)}장)")


if __name__ == "__main__":
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path=CHROME)
        page = b.new_page(viewport={"width": W, "height": H})
        for name, cards in SETS.items():
            build(name, cards, page)
        b.close()
