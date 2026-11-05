import Image from "next/image";
import LogoStory from "./_components/LogoStory";
import NotifyForm from "./_components/NotifyForm";
import { GOODS, SCENES } from "./_data/campaign";

function NotifyButton({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const color = light
    ? "bg-white text-ink hover:bg-white/85"
    : "bg-ink text-white hover:bg-ink/85";
  return (
    <a
      href="#notify"
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 font-bold ${color} ${className}`}
    >
      알림받기
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-[0.2em] text-sub uppercase">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      {/* 상단 바: 어디서든 알림받기 */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-2" aria-label="맨 위로">
            {/* 정사각형 로고 파일에서 글자 부분만 잘라 보여 줌 */}
            <span className="relative block h-[52px] w-[132px] overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="bLOOM Your Way"
                width={150}
                height={150}
                className="absolute -top-[52px] -left-[10px] max-w-none"
              />
            </span>
            <span className="hidden text-sm font-bold sm:inline">
              동백마을 × A2O LITE
            </span>
          </a>
          <nav className="flex items-center gap-1 text-sm font-bold sm:gap-4">
            <a href="#village" className="hidden px-2 py-2 hover:text-sub sm:inline">
              동백마을
            </a>
            <a href="#goods" className="hidden px-2 py-2 hover:text-sub sm:inline">
              콜라보 굿즈
            </a>
            <NotifyButton className="min-h-10 px-5 text-sm" />
          </nav>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ① 콜라보 소식: 카드뉴스 1장과 같은 장면으로 시작 */}
        <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden">
          <Image
            src="/images/hero-kkotnim-bloom.png"
            alt="동백꽃이 핀 돌담길에서 손바닥 위의 블룸이를 바라보는 꽃님이"
            fill
            preload
            sizes="100vw"
            className="-z-10 object-cover object-[60%_center]"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/85 via-ink/30 to-transparent" />
          <div className="mx-auto w-full max-w-6xl px-4 pb-14 sm:pb-20">
            <p className="inline-block rounded-full bg-mint px-3 py-1 text-sm font-bold text-ink">
              콜라보 소식 · 동백마을 × A2O LITE
            </p>
            <h1 className="mt-4 text-4xl leading-tight font-bold text-white sm:text-6xl">
              너의 방식대로 피어나
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              동백숲 마을과 A2O LITE가 함께 피워낸 콜라보 굿즈가 곧
              출시돼요. 꽃님이와 블룸이를 따라 동백마을을 먼저 걸어 보세요.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NotifyButton light />
              <a
                href="#village"
                className="inline-flex min-h-12 items-center rounded-full border border-white/60 px-6 font-bold text-white hover:bg-white/10"
              >
                동백마을 둘러보기
              </a>
            </div>
          </div>
        </section>

        {/* ② 동백마을의 미학: 꽃님이와 블룸이 */}
        <section id="village" className="scroll-mt-16 bg-ivory py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Eyebrow>Dongbaek Village</Eyebrow>
            <h2 className="mt-3 text-3xl leading-snug font-bold sm:text-4xl">
              꽃님이와 블룸이의 하루
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-sub">
              둘러보기만 해도, 깊이 체험해도 괜찮아요. 동백마을에서는 저마다의
              속도로 피어나요.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <article className="flex items-center gap-5 rounded-3xl bg-white p-5">
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl sm:w-36">
                  <Image
                    src="/images/kkotnim-goods.png"
                    alt="콜라보 굿즈를 든 꽃님이"
                    fill
                    sizes="144px"
                    className="object-cover object-[55%_30%]"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-sub">마을 소녀</p>
                  <h3 className="mt-1 text-xl font-bold">꽃님이</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sub">
                    동백마을 돌담길에서 자랐어요. 숲길과 씨앗, 마을 사람들의
                    손맛을 누구보다 잘 알아요.
                  </p>
                </div>
              </article>
              <article className="flex items-center gap-5 rounded-3xl bg-white p-5">
                <div className="relative aspect-square w-28 shrink-0 sm:w-36">
                  <Image
                    src="/images/bloom.png"
                    alt="씨앗 파우치를 멘 블룸이"
                    fill
                    sizes="144px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-sub">동백숲 친구</p>
                  <h3 className="mt-1 text-xl font-bold">블룸이</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sub">
                    머리 위에 동백꽃 한 송이를 단 숲 친구예요. 씨앗 파우치에
                    마을에서 만난 순간을 하나씩 담아요.
                  </p>
                </div>
              </article>
            </div>

            <ol className="mt-16 grid gap-14 sm:gap-20">
              {SCENES.map((s, i) => (
                <li
                  key={s.src}
                  className="grid items-center gap-6 md:grid-cols-[3fr_2fr] md:gap-12"
                >
                  <div
                    className={`relative aspect-video overflow-hidden rounded-3xl ${
                      i % 2 ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-sub">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">{s.title}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-sub">
                      {s.line}
                    </p>
                    {/* 장면을 지날수록 블룸이의 씨앗 파우치가 채워짐 */}
                    <div className="mt-5 flex items-center gap-3">
                      <span className="text-xs font-bold text-sub">
                        블룸이의 씨앗 파우치
                      </span>
                      <span
                        className="flex gap-1.5"
                        role="img"
                        aria-label={`씨앗 ${SCENES.length}개 중 ${i + 1}개`}
                      >
                        {SCENES.map((_, j) => (
                          <span
                            key={j}
                            className={`size-3 rounded-full ${
                              j <= i ? "bg-[#8a5a3b]" : "border border-line bg-white"
                            }`}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ③ 콜라보 굿즈 출시 예정 */}
        <section id="goods" className="scroll-mt-16 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Eyebrow>Collab Goods</Eyebrow>
            <h2 className="mt-3 text-3xl leading-snug font-bold sm:text-4xl">
              여행이 끝나도 일상에서 다시 피어나는 굿즈
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-sub">
              동백마을과 A2O LITE가 함께 만든 콜라보 굿즈 3종이 출시를
              준비하고 있어요.
            </p>

            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {GOODS.map((g) => (
                <li
                  key={g.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-line"
                >
                  <div className="relative bg-tile">
                    <span className="absolute top-4 left-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-bold">
                      출시 예정
                    </span>
                    {/* goods-sheet.png(8칸 × 3줄)에서 앞모습 한 칸만 보여 줌 */}
                    <div
                      role="img"
                      aria-label={g.name}
                      className="mx-auto aspect-192/341 w-[min(62%,170px)] bg-no-repeat mix-blend-multiply"
                      style={{
                        backgroundImage: "url(/images/goods-sheet.png)",
                        backgroundSize: "800% 300%",
                        backgroundPosition: `0% ${g.row * 50}%`,
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <p className="text-xs font-bold tracking-widest text-sub uppercase">
                      {g.en}
                    </p>
                    <h3 className="mt-1 text-xl font-bold">{g.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-sub">
                      {g.desc}
                    </p>
                    <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed">
                      {g.story}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ④ 동백요정 → bLOOM 로고 */}
        <LogoStory />

        {/* ⑤ 알림받기 */}
        <section id="notify" className="scroll-mt-16 bg-tile py-20 sm:py-28">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-[2fr_3fr] md:items-center">
            <div>
              <Eyebrow>Notify me</Eyebrow>
              <h2 className="mt-3 text-3xl leading-snug font-bold sm:text-4xl">
                피어나는 순간을
                <br />
                가장 먼저 알려드릴게요
              </h2>
              <p className="mt-4 leading-relaxed text-sub">
                콜라보 굿즈가 출시되면 이메일로 알려드려요. 이메일만 남겨
                주세요.
              </p>
              <Image
                src="/images/bloom.png"
                alt=""
                width={160}
                height={160}
                className="mt-6 hidden md:block"
              />
            </div>
            <NotifyForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-10 text-center text-xs leading-relaxed text-sub">
        <p>AX 관광테크 교육용 가상 캠페인입니다. 실제로 판매하는 상품이 아니에요.</p>
        <p className="mt-1">동백마을 × A2O LITE 「bLOOM YOUR WAY」</p>
      </footer>
    </>
  );
}
