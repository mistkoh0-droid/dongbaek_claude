"use client";

import { useEffect, useRef, useState } from "react";
import { ASSETS, CARDS, type Assets } from "../_lib/cards";
import { H, W, loadImage } from "../_lib/draw";

function download(canvas: HTMLCanvasElement, file: string) {
  return new Promise<void>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, "image/png");
  });
}

export default function CardNews() {
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const entries = await Promise.all(
          Object.entries(ASSETS).map(async ([k, src]) => [k, await loadImage(src)] as const),
        );
        await document.fonts.ready;
        if (cancelled) return;
        const assets = Object.fromEntries(entries) as Assets;
        CARDS.forEach((card, i) => {
          const ctx = canvases.current[i]?.getContext("2d");
          if (ctx) card.draw(ctx, assets);
        });
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function saveAll() {
    for (const [i, card] of CARDS.entries()) {
      const c = canvases.current[i];
      if (c) await download(c, card.file);
      await new Promise((r) => setTimeout(r, 300)); // 브라우저가 연속 저장을 막지 않도록
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={saveAll}
          disabled={status !== "ready"}
          className="min-h-12 rounded-full bg-ink px-6 font-bold text-white hover:bg-ink/85 disabled:opacity-40"
        >
          5장 모두 PNG로 저장
        </button>
        <p className="text-sm text-sub" role="status">
          {status === "loading" && "카드를 그리는 중이에요…"}
          {status === "ready" && "1080 × 1350px (인스타그램 4:5)"}
          {status === "error" && "이미지를 불러오지 못했어요. 새로고침해 주세요."}
        </p>
      </div>

      <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, i) => (
          <li key={card.file} className="grid gap-3">
            <canvas
              ref={(el) => {
                canvases.current[i] = el;
              }}
              width={W}
              height={H}
              aria-label={`카드뉴스 ${i + 1}장: ${card.role}`}
              className="aspect-4/5 w-full rounded-2xl border border-line bg-tile"
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold">
                {i + 1}. {card.role}
              </p>
              <button
                type="button"
                disabled={status !== "ready"}
                onClick={() => {
                  const c = canvases.current[i];
                  if (c) download(c, card.file);
                }}
                className="min-h-10 rounded-full border border-line px-4 text-sm font-bold hover:bg-tile disabled:opacity-40"
              >
                PNG 저장
              </button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
