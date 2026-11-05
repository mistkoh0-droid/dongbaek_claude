"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * 동백숲의 동백요정이 날아올라 bLOOM 로고의 꽃이 되고,
 * 양옆에 bL · M 과 Your Way 가 나타나 로고가 완성되는 장면.
 * 스크롤 위치(0 → 1)를 --p 로 넘기고, 움직임은 globals.css 에서 계산합니다.
 */
export default function LogoStory() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const p =
        reduced || total <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / total));
      el.style.setProperty("--p", p.toFixed(4));
      // 마지막 안내와 버튼이 다 보인 뒤에만 누를 수 있게
      el.toggleAttribute("data-done", p > 0.88);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const logo = "/images/logo.png";
  const box = "absolute inset-0";

  return (
    <section
      ref={ref}
      id="bloom-logo"
      aria-label="동백요정이 bLOOM 로고가 되는 이야기"
      className="logo-story relative bg-ivory"
    >
      <div className="ls-stage sticky top-16 flex h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4">
        {/* 동백숲 사진: 처음에만 보이고 미색 바탕으로 사라짐 */}
        <div className="ls-photo absolute inset-0" aria-hidden>
          <Image
            src="/images/scene-meditation.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/35" />
        </div>

        <p className="ls-text1 absolute top-[16%] z-10 px-6 text-center text-2xl font-bold leading-snug text-white sm:text-4xl">
          동백마을 동백숲에는
          <br />
          동백요정이 살아요
        </p>
        <p className="ls-text2 absolute top-[10%] z-10 px-6 text-center text-xl font-bold leading-snug text-ink sm:text-3xl">
          요정은 숲에서 날아올라
          <br />
          하나의 꽃이 되었어요
        </p>

        {/* 요정과 로고를 같은 정사각형 안에 겹쳐 둡니다 */}
        <div className="relative z-10 aspect-square w-[min(94vw,calc(100svh-4rem),680px)]">
          <Image
            src="/images/spirit-1.png"
            alt="손을 흔드는 동백요정"
            fill
            sizes="(max-width: 768px) 94vw, 680px"
            className={`ls-spirit ${box} object-contain`}
          />
          <Image src={logo} alt="" fill sizes="(max-width: 768px) 94vw, 680px" className={`ls-bl ${box}`} aria-hidden />
          <Image src={logo} alt="" fill sizes="(max-width: 768px) 94vw, 680px" className={`ls-flower ${box}`} aria-hidden />
          <Image src={logo} alt="" fill sizes="(max-width: 768px) 94vw, 680px" className={`ls-m ${box}`} aria-hidden />
          <Image
            src={logo}
            alt="bLOOM Your Way 로고"
            fill
            sizes="(max-width: 768px) 94vw, 680px"
            className={`ls-tagline ${box}`}
          />
          {/* 마지막 안내: 로고 바로 아래 (로고 글자는 상자의 30%~68% 높이에 있음) */}
          <div className="ls-caption absolute inset-x-0 top-[71%] px-2 text-center">
            <p className="text-lg font-bold text-ink sm:text-2xl">
              가운데 핑크 꽃이 바로 동백요정이에요
            </p>
            <p className="mt-2 text-sm text-sub sm:text-base">
              이 꽃을 다시 만나면, 동백마을이 피어나는 소식이에요.
            </p>
            <a
              href="#notify"
              className="mt-4 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-base font-bold text-white hover:bg-ink/85"
            >
              알림받기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
