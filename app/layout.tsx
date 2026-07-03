import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "IT 부캐 찾기 | 출근길 내 모습으로 알아보는 MBTI 테스트",
  description:
    "협업 스타일부터 위기 대처법까지, 내 MBTI 유형에 맞는 IT 직무 페르소나를 찾아보세요.",
  openGraph: {
    title: "출근길 내 모습으로 알아보는 'IT 부캐' 테스트",
    description:
      "협업 스타일부터 위기 대처법까지, 내 MBTI 유형에 맞는 IT 직무 페르소나는?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body className="font-sans antialiased">
        <div className="relative min-h-screen overflow-hidden bg-grid">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 animate-blob rounded-full bg-indigo-600/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 animate-blob rounded-full bg-cyan-500/20 blur-3xl [animation-delay:2s]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 animate-blob rounded-full bg-teal-500/20 blur-3xl [animation-delay:4s]"
          />
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
