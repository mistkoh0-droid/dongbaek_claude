import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "너의 방식대로 피어나 | 동백마을 × A2O LITE",
  description:
    "동백마을과 A2O LITE의 콜라보 소식. 꽃님이와 블룸이와 함께 동백마을을 만나고, 콜라보 굿즈 출시 알림을 받아 보세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
