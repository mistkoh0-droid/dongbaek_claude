/** 카드뉴스를 canvas 에 그리는 도구 모음 (1080 × 1350, 인스타그램 4:5) */

export const W = 1080;
export const H = 1350;

export const C = {
  ink: "#18250d",
  sub: "#4e5848",
  line: "#dfe3da",
  tile: "#f4f6f1",
  ivory: "#fbf8f1",
  mint: "#cfe8da",
  pink: "#ff0176",
  white: "#ffffff",
};

export const FONT =
  '"Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif';

export type Ctx = CanvasRenderingContext2D;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`이미지를 불러오지 못했어요: ${src}`));
    img.src = src;
  });
}

/** object-fit: cover 처럼 채워 그리기. fx, fy 는 잘라낼 때 남길 위치(0~1) */
export function cover(
  ctx: Ctx,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  fx = 0.5,
  fy = 0.5,
) {
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale;
  const sh = h / scale;
  ctx.drawImage(img, (img.width - sw) * fx, (img.height - sh) * fy, sw, sh, x, y, w, h);
}

/** 이미지의 일부(sx, sy, sw, sh)를 비율 그대로 폭 w 로 그리고, 그린 높이를 돌려줌 */
export function crop(
  ctx: Ctx,
  img: HTMLImageElement,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  x: number,
  y: number,
  w: number,
) {
  const h = (sh / sw) * w;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  return h;
}

type TextOpt = {
  size: number;
  weight?: number;
  color?: string;
  align?: CanvasTextAlign;
  lineHeight?: number;
  letterSpacing?: number;
};

/** 여러 줄 글자. y 는 첫 줄의 윗선, 다 쓴 뒤의 아랫선 y 를 돌려줌 */
export function text(ctx: Ctx, lines: string[], x: number, y: number, o: TextOpt) {
  const lh = o.size * (o.lineHeight ?? 1.3);
  ctx.save();
  ctx.font = `${o.weight ?? 700} ${o.size}px ${FONT}`;
  ctx.fillStyle = o.color ?? C.ink;
  ctx.textAlign = o.align ?? "left";
  ctx.textBaseline = "top";
  if (o.letterSpacing) ctx.letterSpacing = `${o.letterSpacing}px`;
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * lh));
  ctx.restore();
  return y + lines.length * lh;
}

/** 둥근 알약 모양 라벨. x 는 왼쪽(align left) 또는 가운데(align center) */
export function pill(
  ctx: Ctx,
  label: string,
  x: number,
  y: number,
  o: { size: number; bg: string; color: string; padX?: number; padY?: number; align?: "left" | "center" },
) {
  const padX = o.padX ?? o.size * 0.9;
  const padY = o.padY ?? o.size * 0.55;
  ctx.save();
  ctx.font = `700 ${o.size}px ${FONT}`;
  const w = ctx.measureText(label).width + padX * 2;
  const h = o.size + padY * 2;
  const left = o.align === "center" ? x - w / 2 : x;
  ctx.fillStyle = o.bg;
  ctx.beginPath();
  ctx.roundRect(left, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = o.color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(label, left + w / 2, y + h / 2 + o.size * 0.04);
  ctx.restore();
  return { w, h };
}

export function roundedImage(
  ctx: Ctx,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fx = 0.5,
  fy = 0.5,
) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.clip();
  cover(ctx, img, x, y, w, h, fx, fy);
  ctx.restore();
}

/** 아래에서 위로 어두워지는 그라데이션 */
export function shade(ctx: Ctx, from: number, to: number, color: string, maxAlpha: number) {
  const g = ctx.createLinearGradient(0, from, 0, to);
  g.addColorStop(0, hexA(color, 0));
  g.addColorStop(1, hexA(color, maxAlpha));
  ctx.fillStyle = g;
  ctx.fillRect(0, Math.min(from, to), W, Math.abs(to - from));
}

export function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/** 모든 카드 공통: 위쪽 캠페인 이름과 쪽 번호 */
export function header(ctx: Ctx, page: number, dark: boolean) {
  const color = dark ? C.white : C.ink;
  text(ctx, ["동백마을 × A2O LITE"], 72, 64, { size: 30, color, letterSpacing: 1 });
  text(ctx, [`${page} / 5`], W - 72, 64, { size: 30, weight: 600, color, align: "right" });
}
