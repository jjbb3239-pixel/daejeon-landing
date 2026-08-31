"""Pretendard 서브셋을 만들어 자체 호스팅한다.

왜 :
  지금은 jsdelivr 에서 5종 전체(3.9MB)를 받는다. CDN 이 죽으면 폰트가 통째로
  폴백되고, 용량도 페이지에서 가장 무겁다.

글자 집합 :
  KS X 1001 상용 한글 2,350자 + 소스에 실제로 쓰인 글자 + 라틴/숫자/기호
  = 2,552자. 팀이 문구를 고쳐도 웬만해선 글자가 깨지지 않는다.
"""
import io, os, sys, glob, subprocess, urllib.request

ROOT = r'C:\Users\loco1\daejeon_landing\extracted'
OUT = os.path.join(ROOT, 'src', 'fonts')
TMP = r'C:\Users\loco1\AppData\Local\Temp\claude\C--Users-loco1-daejeon-landing\cfb71913-91e1-4942-97e9-93a7b126c433\scratchpad\fonts'
os.makedirs(OUT, exist_ok=True)

BASE = ('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9'
        '/packages/pretendard/dist/web/static/woff2/Pretendard-%s.woff2')
WEIGHTS = [('Regular', 400), ('Medium', 500), ('Bold', 700), ('ExtraBold', 800), ('Black', 900)]

# KS X 1001 한글 영역 (EUC-KR 0xB0A1~0xC8FE = 2,350자)
ksx = []
for hi in range(0xB0, 0xC9):
    for lo in range(0xA1, 0xFF):
        try:
            c = bytes([hi, lo]).decode('euc-kr')
        except UnicodeDecodeError:
            continue
        if '\uac00' <= c <= '\ud7a3':
            ksx.append(c)

chars = set(ksx)
for pat in ('src/**/*.tsx', 'src/**/*.ts', 'index.html'):
    for f in glob.glob(os.path.join(ROOT, pat), recursive=True):
        chars |= set(io.open(f, encoding='utf-8').read())
chars |= set(chr(c) for c in range(0x20, 0x7F))
chars |= set(chr(i) for i in range(0x3131, 0x3164))
chars |= set('\u00b7\u2014\u2013\u2026\u2018\u2019\u201c\u201d\u300c\u300d\u300e\u300f'
             '\u2605\u2606\u2726\u2197\u2191\u2193\u2190\u2192\u2304\u25cf\u25cb'
             '\u25a1\u25a0\u2713\u00d7\u00f7\uff05\u20ac\u20a9\u00b0\u203b\u2665')
text = ''.join(sorted(chars))

total = 0
faces = []
for name, weight in WEIGHTS:
    src = os.path.join(TMP, name + '.woff2')
    if not os.path.exists(src):
        urllib.request.urlretrieve(BASE % name, src)
    dst = os.path.join(OUT, 'Pretendard-%s.subset.woff2' % name)
    subprocess.run([sys.executable, '-m', 'fontTools.subset', src,
                    '--text=' + text, '--layout-features=*', '--flavor=woff2',
                    '--output-file=' + dst], check=True)
    total += os.path.getsize(dst)
    faces.append('''@font-face{
  font-family:"Pretendard";
  font-weight:%d;
  font-style:normal;
  font-display:swap;
  src:url("./Pretendard-%s.subset.woff2") format("woff2");
}''' % (weight, name))

css = '''/* Pretendard 서브셋 — 자체 호스팅.
   원본 5종 3.9MB 를 jsdelivr 에서 받던 것을 KS X 1001 상용 한글 2,350자 +
   실제 사용 글자로 잘라 담았다. CDN 이 죽어도 폰트가 그대로 뜬다.

   글자가 깨지면(상용 한글 밖의 희귀 글자) 서브셋을 다시 만들어야 한다.
   만드는 스크립트는 PROGRESS.md 의 폰트 절 참고. */

''' + '\n\n'.join(faces) + '\n'

io.open(os.path.join(OUT, 'pretendard.css'), 'w', encoding='utf-8').write(css)
print('글자 %d자 · 합계 %d KB' % (len(chars), total // 1024))
