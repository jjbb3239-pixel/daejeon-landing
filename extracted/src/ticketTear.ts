/* 퀴즈 결과 → 코스 페이지 전환.
   결과창의 작은 티켓이 승차권으로 커졌다가, 절취선을 따라 잘린 반권이
   오른쪽으로 빠져나가며 빛으로 부서진다.

   프로토타입: prototypes/ticket-tear.html */

import { MOODS, type MoodId } from "./quiz";

/* 승차권 원본은 항상 이 크기로 그려두고 화면에는 축소해서 올린다 */
const W = 1100;
const H = 450;
const SPLITX = Math.round(W * 0.73); // 절취선
const PITCH = 15; // 퍼포레이션 구멍 간격
const HOLE = 2.7; // 구멍 반지름

/* 승차권을 화면 가득 키우면 1100px 원본으로는 글자가 뭉갠다.
   원본을 이 배율로 크게 그려두고 렌더할 때 줄여 쓴다. */
const RES = 2.5;

const PARTS = 190;
const D0 = 0.04; // 녹기 시작하는 지점
const DSPAN = 0.7; // 다 녹는 데 걸리는 구간
const LIFE = 0.34; // 빛 알갱이 수명

type Spark = { x: number; y: number; rel: number; vx: number; vy: number; r: number };

let sparkSprite: HTMLCanvasElement | null = null;
let running = false;

/* ---------- 승차권 그리기 ----------
   히어로 섹션의 티켓과 같은 결로 그린다.
   종이 질감 · 왼쪽 모서리 노치 · 스텁 톱니 · 손글씨 제목 ·
   ARRIVED 도장 · 기차 낙서 · 바코드까지. */

const PAD = 46;

/* 티켓 바깥 윤곽. 왼쪽은 히어로처럼 모서리가 깎이고, 오른쪽 스텁은 톱니다. */
function ticketPath(ctx: CanvasRenderingContext2D) {
  const notch = W * 0.028;
  ctx.beginPath();
  ctx.moveTo(notch, 0);
  ctx.lineTo(W, 0);

  // 스텁 오른쪽 톱니
  const teeth = 46;
  for (let i = 0; i <= teeth; i++) {
    const y = (i / teeth) * H;
    ctx.lineTo(W - (i % 2 ? 6 : 0), y);
  }

  ctx.lineTo(notch, H);
  ctx.lineTo(0, H * 0.92);
  ctx.lineTo(0, H * 0.08);
  ctx.closePath();
}

function paperBase(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#f8efdc";
  ctx.fillRect(0, 0, W, H);

  // 히어로와 같은 사선 광택
  const g = ctx.createLinearGradient(0, 0, W * 0.9, H);
  g.addColorStop(0, "rgba(255,255,255,.68)");
  g.addColorStop(0.48, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // 아주 미세한 종이 결 (히어로의 radial-gradient 점무늬)
  ctx.fillStyle = "rgba(120,90,55,.055)";
  for (let y = 0; y < H; y += 11) {
    for (let x = 0; x < W; x += 11) ctx.fillRect(x, y, 0.9, 0.9);
  }
  ctx.fillStyle = "rgba(255,255,255,.22)";
  for (let y = 5; y < H; y += 17) {
    for (let x = 5; x < W; x += 17) ctx.fillRect(x, y, 1, 1);
  }
}

function drawTicket(mood: MoodId) {
  const c = document.createElement("canvas");
  c.width = Math.round(W * RES);
  c.height = Math.round(H * RES);
  const ctx = c.getContext("2d")!;
  ctx.scale(RES, RES); // 이후 좌표는 그대로 W×H 기준으로 쓴다
  const m = MOODS[mood];

  // 윤곽 안쪽에만 종이를 채운다
  ctx.save();
  ticketPath(ctx);
  ctx.clip();
  paperBase(ctx);

  // 안쪽 실선 테두리
  ctx.strokeStyle = "rgba(159,126,81,.30)";
  ctx.lineWidth = 1;
  ctx.strokeRect(29, 18, W - 46, H - 36);

  // 퍼포레이션 — 실제로 뚫린 구멍들
  for (let y = PITCH; y < H - PITCH * 0.5; y += PITCH) {
    ctx.beginPath();
    ctx.arc(SPLITX, y, HOLE, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150,120,80,.30)";
    ctx.fill();
    ctx.strokeStyle = "rgba(120,90,55,.22)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  /* ---- 본권 ---- */

  // 노란 라벨
  ctx.save();
  ctx.translate(PAD + 14, 52);
  ctx.rotate((-2 * Math.PI) / 180);
  ctx.fillStyle = "#ffd94a";
  ctx.fillRect(0, 0, 236, 36);
  ctx.fillStyle = "#292929";
  ctx.font = "900 17px Pretendard, 'Noto Sans KR', sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("★ 오늘의 대전행 티켓", 15, 19);
  ctx.restore();

  // 손글씨 제목 — 히어로 메인 메시지와 같은 글꼴
  ctx.fillStyle = "#292929";
  ctx.font = "400 76px 'Nanum Pen Script', Pretendard, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.save();
  ctx.translate(PAD + 16, 190);
  ctx.rotate((-1 * Math.PI) / 180);
  ctx.fillText(m.name, 0, 0);
  const tw = ctx.measureText(m.name).width;
  // 노란 형광펜 밑줄
  ctx.fillStyle = "#ffd32a";
  ctx.save();
  ctx.rotate((-1.5 * Math.PI) / 180);
  ctx.fillRect(-4, 8, Math.min(tw + 8, SPLITX - PAD - 40), 11);
  ctx.restore();
  ctx.restore();

  // FROM → TO
  const ry = H - 96;
  ctx.strokeStyle = "rgba(132,105,72,.30)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD + 16, ry);
  ctx.lineTo(PAD + 16 + 372, ry);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#8e7452";
  ctx.font = "900 11px Pretendard, monospace";
  ctx.fillText("FROM", PAD + 16, ry + 20);
  ctx.fillText("TO", PAD + 16 + 236, ry + 20);

  ctx.fillStyle = "#292929";
  ctx.font = "900 30px Pretendard, 'Noto Sans KR', sans-serif";
  ctx.fillText("오늘 기분", PAD + 16, ry + 52);
  ctx.fillText("DAEJEON", PAD + 16 + 236, ry + 52);

  ctx.fillStyle = "#917757";
  ctx.font = "400 26px Pretendard, sans-serif";
  ctx.fillText("→", PAD + 16 + 190, ry + 48);

  // 기차 낙서
  ctx.save();
  ctx.translate(SPLITX - 250, H - 150);
  ctx.rotate((-5 * Math.PI) / 180);
  ctx.strokeStyle = "rgba(40,105,216,.42)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(0, 0, 96, 42, [22, 10, 7, 7]);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(17, 12);
  ctx.lineTo(57, 12);
  ctx.moveTo(-8, 50);
  ctx.lineTo(110, 50);
  ctx.stroke();
  ctx.restore();

  // ARRIVED 도장
  ctx.save();
  ctx.translate(SPLITX - 108, H - 108);
  ctx.rotate((9 * Math.PI) / 180);
  ctx.strokeStyle = "rgba(40,105,216,.38)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 43, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(40,105,216,.5)";
  ctx.textAlign = "center";
  ctx.font = "900 10px Pretendard, monospace";
  ctx.fillText("ARRIVED", 0, -18);
  ctx.font = "900 15px Pretendard, sans-serif";
  ctx.fillText("DAEJEON", 0, 1);
  ctx.font = "900 10px Pretendard, 'Noto Sans KR', sans-serif";
  ctx.fillText("대 전 역", 0, 18);
  ctx.fillText("SOLO TRIP", 0, 33);
  ctx.restore();

  /* ---- 반권 ---- */

  const sx = SPLITX + (W - SPLITX) / 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#8e7452";
  ctx.font = "900 11px Pretendard, monospace";
  ctx.fillText("DESTINATION", sx, 62);

  ctx.fillStyle = "#292929";
  ctx.font = "900 32px Pretendard, sans-serif";
  ctx.fillText("DAEJEON", sx, 96);

  // PASSENGER / PLAN / MOOD / DEPARTURE
  const info: [string, string][] = [
    ["PASSENGER", "혼자"],
    ["PLAN", "미정"],
    ["MOOD", m.destination],
    ["DEPARTURE", "지금"],
  ];
  info.forEach(([k, v], n) => {
    const cx = sx + (n % 2 ? 62 : -62);
    const cy = 150 + Math.floor(n / 2) * 62;
    ctx.fillStyle = "#8e7452";
    ctx.font = "900 9px Pretendard, monospace";
    ctx.fillText(k, cx, cy);
    ctx.fillStyle = "#292929";
    ctx.font = "900 14px Pretendard, 'Noto Sans KR', sans-serif";
    ctx.fillText(v, cx, cy + 20);
  });

  // 노란 블록 + 취향 아이콘
  ctx.fillStyle = "#ffd634";
  ctx.fillRect(sx - 92, H - 152, 184, 54);
  ctx.strokeStyle = "#202020";
  ctx.lineWidth = 2;
  ctx.strokeRect(sx - 92, H - 152, 184, 54);
  ctx.font = "400 30px Pretendard, 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "#202020";
  ctx.fillText(m.icon, sx, H - 114);

  // 바코드
  let bx = sx - 52;
  for (let i = 0; i < 26; i++) {
    const bw = 1 + Math.round(Math.random() * 3);
    ctx.fillStyle = "#333";
    ctx.fillRect(bx, H - 82, bw, 30);
    bx += bw + 2 + Math.round(Math.random() * 2);
  }

  ctx.fillStyle = "#8e7452";
  ctx.font = "900 8px Pretendard, monospace";
  ctx.fillText("DAEJEON · SOLO TRIP · ONE WAY", sx, H - 36);

  ctx.restore();
  return c;
}

/* ---------- 절취선 단면 ----------
   구멍 자리는 반원으로 파이고, 구멍 사이 다리는 거의 곧게 끊긴다. */

function makeEdges() {
  const l = new Float32Array(H + 1);
  const r = new Float32Array(H + 1);

  for (let y = 0; y <= H; y++) {
    const dy = Math.abs((((y % PITCH) + PITCH) % PITCH) - PITCH * 0.5);
    const d = PITCH * 0.5 - dy;
    const bite = d < HOLE ? Math.sqrt(HOLE * HOLE - d * d) : 0;
    const fray = (Math.random() - 0.5) * 0.9;
    l[y] = SPLITX - bite + fray;
    r[y] = SPLITX + bite + fray;
  }
  return { l, r };
}

/* ---------- 빛 알갱이 ----------
   스프라이트 한 장을 미리 구워두고 재사용한다.
   프레임마다 그라디언트를 만들면 몇 배 느려진다. */

function makeSpark() {
  const c = document.createElement("canvas");
  c.width = c.height = 48;
  const g = c.getContext("2d")!;
  const rg = g.createRadialGradient(24, 24, 0, 24, 24, 24);
  rg.addColorStop(0, "rgba(255,248,225,1)");
  rg.addColorStop(0.35, "rgba(255,226,160,.55)");
  rg.addColorStop(1, "rgba(255,190,110,0)");
  g.fillStyle = rg;
  g.fillRect(0, 0, 48, 48);
  return c;
}

function makeParts(): Spark[] {
  const out: Spark[] = [];
  const w = W - SPLITX;
  for (let i = 0; i < PARTS; i++) {
    const rx = Math.pow(Math.random(), 0.82); // 찢긴 면 쪽에 조금 더 몰리게
    out.push({
      x: SPLITX + rx * w,
      y: Math.random() * H,
      rel: Math.max(0.02, Math.min(0.84, rx * 0.86 + (Math.random() - 0.5) * 0.12)),
      vx: 30 + Math.random() * 110,
      vy: -40 - Math.random() * 80,
      r: 5 + Math.random() * 13,
    });
  }
  return out;
}

const slideX = (q: number) => W * 1.15 * q * q;
const slideY = (q: number) => H * 0.2 * q * q;

/* ---------- 한 프레임 ---------- */

function renderFrame(
  ctx: CanvasRenderingContext2D,
  progress: number,
  dpr: number,
  ticket: HTMLCanvasElement,
  edges: { l: Float32Array; r: Float32Array },
  parts: Spark[],
) {
  const k = ctx.canvas.width / dpr / W;
  ctx.setTransform(dpr * k, 0, 0, dpr * k, 0, 0);
  ctx.clearRect(0, 0, W, H);

  if (progress <= 0) {
    ctx.drawImage(ticket, 0, 0, W, H);
    return;
  }

  // 본권 — 절취선 단면까지
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let y = 0; y <= H; y++) ctx.lineTo(edges.l[y], y);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(ticket, 0, 0, W, H);
  ctx.restore();

  // 종이가 녹는 정도는 1 에서 멈추지만, 알갱이 수명은 그 뒤로도 흘러야 한다.
  // 클램프한 값으로 수명까지 재면 다 녹은 뒤 알갱이가 화면에 얼어붙는다.
  const dRaw = (progress - D0) / DSPAN;
  const d = Math.max(0, Math.min(1, dRaw));
  const eat = d * (W - SPLITX);

  if (d < 1) {
    ctx.save();
    ctx.translate(SPLITX + slideX(progress), slideY(progress));
    ctx.rotate(0.1 * progress * progress);
    ctx.translate(-SPLITX, 0);

    ctx.beginPath();
    ctx.moveTo(edges.r[0] + eat, 0);
    for (let y = 0; y <= H; y++) ctx.lineTo(edges.r[y] + eat, y);
    ctx.lineTo(W, H);
    ctx.lineTo(W, 0);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(ticket, 0, 0, W, H);

    // 녹아드는 경계의 빛
    const gx = SPLITX + eat;
    const gr = ctx.createLinearGradient(gx - 46, 0, gx + 14, 0);
    gr.addColorStop(0, "rgba(255,226,160,0)");
    gr.addColorStop(0.65, "rgba(255,232,175,.45)");
    gr.addColorStop(1, "rgba(255,252,238,.9)");
    ctx.fillStyle = gr;
    ctx.fillRect(gx - 46, 0, 62, H);
    ctx.restore();
  }

  // 흩어지는 알갱이
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < parts.length; i++) {
    const q = parts[i];
    if (dRaw < q.rel) continue;
    const age = (dRaw - q.rel) / LIFE;
    if (age >= 1) continue;

    const born = D0 + q.rel * DSPAN; // 부서져 나온 시점
    const px = q.x + slideX(born) + q.vx * age;
    const py = q.y + slideY(born) + q.vy * age + 150 * age * age;
    const sz = q.r * (1.6 - age * 0.8);

    ctx.globalAlpha = (1 - age) * (1 - age);
    ctx.drawImage(sparkSprite!, px - sz, py - sz, sz * 2, sz * 2);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

/* ---------- 유틸 ---------- */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* rAF 는 배경 탭·저전력 모드에서 멈춘다.
   그대로 두면 전환이 끝나지 않아 화면이 승차권에 갇힌다. */
function animate(ms: number, step: (p: number) => void) {
  return new Promise<void>((resolve) => {
    const t0 = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(guard);
      step(1);
      resolve();
    };

    const guard = setTimeout(finish, ms + 500);

    const frame = (now: number) => {
      if (finished) return;
      const p = Math.min(1, (now - t0) / ms);
      step(p);
      if (p < 1) requestAnimationFrame(frame);
      else finish();
    };

    requestAnimationFrame(frame);
  });
}

/* ---------- 전환 실행 ----------
   from : 결과창 티켓 박스의 위치. 여기서 승차권이 자라난다.
   onArrive : 반권이 다 빠진 뒤 호출. 여기서 페이지를 바꾼다. */

export async function playTicketTear(opts: {
  from: DOMRect;
  mood: MoodId;
  ms?: number;
  onArrive: () => void;
}) {
  const total = opts.ms ?? 2000;

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    opts.onArrive();
    return;
  }

  // 전환 중에 또 부르면 레이어가 겹쳐 쌓인다. 앞선 것만 끝까지 재생한다.
  if (running) {
    opts.onArrive();
    return;
  }
  running = true;

  // 앞선 전환이 비정상 종료돼 남은 레이어가 있으면 치운다
  document.querySelectorAll(".tear-layer").forEach((n) => n.remove());

  const layer = document.createElement("div");
  layer.className = "tear-layer";
  const cv = document.createElement("canvas");
  cv.className = "tear-canvas";
  layer.appendChild(cv);
  document.body.appendChild(layer);

  try {
    const rect = cv.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(rect.width * dpr);
    cv.height = Math.round(rect.height * dpr);
    const ctx = cv.getContext("2d")!;

    if (!sparkSprite) sparkSprite = makeSpark();
    await document.fonts.ready;      // 손글씨가 로드되기 전에 그리면 다른 글꼴로 굳는다
    const ticket = drawTicket(opts.mood);
    const edges = makeEdges();
    const parts = makeParts();

    const grow = Math.round(total * 0.28);
    const hold = Math.round(total * 0.1);
    const slide = Math.round(total * 0.38);
    const handoff = total - grow - hold - slide; // 크로스페이드에 쓸 시간

    // 1) 결과창의 작은 티켓 자리에서 승차권으로
    const sx = opts.from.width / rect.width;
    const sy = opts.from.height / rect.height;
    const dx = opts.from.left + opts.from.width / 2 - (rect.left + rect.width / 2);
    const dy = opts.from.top + opts.from.height / 2 - (rect.top + rect.height / 2);

    renderFrame(ctx, 0, dpr, ticket, edges, parts);
    cv.style.transition = "none";
    cv.style.transform = `translate(${dx}px,${dy}px) scale(${sx},${sy})`;
    cv.style.opacity = "0";
    cv.getBoundingClientRect(); // 강제 리플로우

    cv.style.transition = `transform ${grow}ms cubic-bezier(.2,.8,.25,1), opacity 130ms linear`;
    cv.style.transform = "none";
    cv.style.opacity = "1";

    await wait(grow + hold);

    // 2) 반권이 빛으로 부서지며 빠져나간다
    await animate(slide, (p) => renderFrame(ctx, p, dpr, ticket, edges, parts));

    // 3) 승차권과 코스 페이지를 크로스페이드로 바꿔친다.
    //    움직임을 섞으면 끊겨 보여서 투명도만 건드린다.
    const lead = Math.round(handoff * 0.22);
    cv.style.transition = `opacity ${handoff}ms ease`;
    cv.style.opacity = "0";
    await wait(lead); // 승차권이 옅어지기 시작한 뒤에 페이지를 얹는다

    opts.onArrive();
    await wait(handoff - lead);
  } finally {
    layer.remove();
    running = false;
  }
}
