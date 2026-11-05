import { C, H, W, cover, crop, header, pill, roundedImage, shade, text, type Ctx } from "./draw";

/** 카드에 쓰는 이미지 (public/images) */
export const ASSETS = {
  hero: "/images/hero-kkotnim-bloom.png",
  walk: "/images/scene-walk.png",
  oil: "/images/scene-oil.png",
  pasta: "/images/scene-pasta.png",
  goods: "/images/goods-sheet.png",
  logo: "/images/logo.png",
  spirit: "/images/spirit-1.png",
} as const;

export type Assets = Record<keyof typeof ASSETS, HTMLImageElement>;

/* logo.png(1254px) 안의 위치: 글자 y 430~870, bL x 70~432(+L 끝 ~505), 꽃·O x 432~882, M x 885~1190 */
const LOGO = { sx: 70, sy: 430, sw: 1120, sh: 440 };

/* goods-sheet.png: 8칸 × 3줄, 첫 칸이 앞모습 */
const CELL_W = 1536 / 8;
const CELL_H = 1024 / 3;

export type Card = {
  file: string;
  role: string;
  draw: (ctx: Ctx, a: Assets) => void;
};

export const CARDS: Card[] = [
  {
    file: "dongbaek-card-01.png",
    role: "멈추게 하기",
    draw(ctx, a) {
      cover(ctx, a.hero, 0, 0, W, H, 0.46, 0.5);
      shade(ctx, 320, 0, C.ink, 0.5);
      shade(ctx, 640, H, C.ink, 0.88);
      header(ctx, 1, true);
      pill(ctx, "콜라보 소식", 72, 850, { size: 32, bg: C.mint, color: C.ink });
      const end = text(ctx, ["너의 방식대로", "피어나"], 72, 950, {
        size: 108,
        color: C.white,
        lineHeight: 1.16,
      });
      text(ctx, ["동백마을과 A2O LITE가 함께 피워낸 이야기"], 72, end + 28, {
        size: 34,
        weight: 500,
        color: "rgba(255,255,255,0.9)",
      });
    },
  },
  {
    file: "dongbaek-card-02.png",
    role: "콜라보 소식",
    draw(ctx, a) {
      ctx.fillStyle = C.ivory;
      ctx.fillRect(0, 0, W, H);
      header(ctx, 2, false);
      const lw = 760;
      crop(ctx, a.logo, LOGO.sx, LOGO.sy, LOGO.sw, LOGO.sh, (W - lw) / 2, 200, lw);
      text(ctx, ["동백마을과 A2O LITE가", "함께 피워낸 이야기"], W / 2, 540, {
        size: 60,
        align: "center",
      });
      cover(ctx, a.walk, 0, 780, W, H - 780, 0.5, 0.55);
    },
  },
  {
    file: "dongbaek-card-03.png",
    role: "콜라보 굿즈",
    draw(ctx, a) {
      ctx.fillStyle = C.white;
      ctx.fillRect(0, 0, W, H);
      header(ctx, 3, false);
      const end = text(ctx, ["여행이 끝나도", "일상에서 다시 피어나는 굿즈"], 72, 170, {
        size: 64,
        lineHeight: 1.25,
      });
      pill(ctx, "출시 예정", 72, end + 36, { size: 30, bg: C.ink, color: C.white });

      const names = ["코튼 볼캡", "씨앗 파우치", "드로퍼 병"];
      const gap = 24;
      const tw = (W - 144 - gap * 2) / 3;
      const ty = 500;
      const th = 560;
      names.forEach((name, i) => {
        const tx = 72 + i * (tw + gap);
        ctx.fillStyle = C.tile;
        ctx.beginPath();
        ctx.roundRect(tx, ty, tw, th, 28);
        ctx.fill();
        const iw = tw * 0.8;
        const ih = (CELL_H / CELL_W) * iw;
        ctx.save();
        ctx.globalCompositeOperation = "multiply"; // 시트의 흰 바탕을 지움
        ctx.drawImage(a.goods, 0, i * CELL_H, CELL_W, CELL_H, tx + (tw - iw) / 2, ty + (th - ih) / 2, iw, ih);
        ctx.restore();
        text(ctx, [name], tx + tw / 2, ty + th + 26, { size: 34, align: "center" });
      });
      text(ctx, ["동백마을 민트 배지와 bLOOM 레터링을 담았어요"], 72, 1200, {
        size: 30,
        weight: 500,
        color: C.sub,
      });
    },
  },
  {
    file: "dongbaek-card-04.png",
    role: "체험 장면",
    draw(ctx, a) {
      ctx.fillStyle = C.ivory;
      ctx.fillRect(0, 0, W, H);
      header(ctx, 4, false);
      text(ctx, ["둘러보기만 해도,", "깊이 체험해도 괜찮아요"], 72, 150, { size: 64, lineHeight: 1.25 });

      const shots: [HTMLImageElement, string, number][] = [
        [a.walk, "동백숲 걷기", 0.5],
        [a.oil, "동백오일 만들기", 0.5],
        [a.pasta, "고사리파스타 클래스", 0.5],
      ];
      const top = 350;
      const gap = 20;
      const h = (1240 - top - gap * 2) / 3;
      shots.forEach(([img, label, fy], i) => {
        const y = top + i * (h + gap);
        roundedImage(ctx, img, 72, y, W - 144, h, 28, 0.5, fy);
        pill(ctx, label, 96, y + h - 76, { size: 28, bg: C.white, color: C.ink });
      });
      text(ctx, ["꽃님이와 블룸이가 안내하는 동백마을의 하루"], 72, 1268, {
        size: 28,
        weight: 500,
        color: C.sub,
      });
    },
  },
  {
    file: "dongbaek-card-05.png",
    role: "더 알아보기",
    draw(ctx, a) {
      ctx.fillStyle = C.ivory;
      ctx.fillRect(0, 0, W, H);
      header(ctx, 5, false);
      text(ctx, ["동백숲의 요정이", "어디로 갔을까요?"], W / 2, 150, {
        size: 72,
        align: "center",
        lineHeight: 1.25,
      });

      const sw = 440;
      ctx.drawImage(a.spirit, (W - sw) / 2, 340, sw, sw);

      // 로고의 꽃 자리만 비워 두고 bL · M 만 흐리게 → 요정이 들어갈 자리
      const s = 900 / LOGO.sw;
      const x0 = (W - 900) / 2;
      const y0 = 820;
      const part = (sx: number, sy: number, sw2: number, sh2: number) =>
        ctx.drawImage(a.logo, sx, sy, sw2, sh2, x0 + (sx - LOGO.sx) * s, y0 + (sy - LOGO.sy) * s, sw2 * s, sh2 * s);
      ctx.save();
      ctx.globalAlpha = 0.3;
      part(70, 430, 362, 350); // b, L
      part(432, 715, 75, 65); // L 의 아래 획 끝
      part(885, 430, 305, 350); // M
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = C.pink;
      ctx.lineWidth = 5;
      ctx.setLineDash([14, 14]);
      ctx.beginPath();
      ctx.arc(x0 + (657 - LOGO.sx) * s, y0 + (609 - LOGO.sy) * s, 130, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      pill(ctx, "더 알아보기  →", W / 2, 1150, { size: 40, bg: C.ink, color: C.white, align: "center", padX: 52 });
      text(ctx, ["프로필 링크에서 이어서 확인하세요"], W / 2, 1268, {
        size: 28,
        weight: 500,
        color: C.sub,
        align: "center",
      });
    },
  },
];
