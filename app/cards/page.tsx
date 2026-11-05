import type { Metadata } from "next";
import CardNews from "./_components/CardNews";

export const metadata: Metadata = {
  title: "SNS 카드뉴스 5장 | 동백마을 × A2O LITE",
  robots: { index: false }, // 제작용 페이지: 검색에 노출하지 않음
};

export default function CardsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <p className="text-xs font-bold tracking-[0.2em] text-sub uppercase">
        SNS Card News
      </p>
      <h1 className="mt-2 text-3xl font-bold">동백마을 × A2O LITE 카드뉴스 5장</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-sub">
        멈추게 하기 → 콜라보 소식 → 굿즈 → 체험 → 더 알아보기 순서예요. 5장의
        &lsquo;더 알아보기&rsquo;는 웹사이트 첫 화면으로 이어지고, 웹사이트에서
        동백요정이 로고가 되는 장면으로 답을 보여 줘요.
      </p>
      <div className="mt-8">
        <CardNews />
      </div>
    </main>
  );
}
