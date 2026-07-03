import Link from "next/link";
import { getParticipantCount } from "@/lib/supabase/server";
import ParticipantBanner from "@/components/ParticipantBanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const participantCount = await getParticipantCount();

  return (
    <main className="flex w-full max-w-md flex-col items-center gap-8 text-center">
      <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1 text-xs font-bold tracking-widest text-indigo-300">
        IT ALTER-EGO MBTI
      </span>

      <h1 className="text-3xl font-black leading-tight sm:text-4xl">
        출근길 내 모습으로 알아보는
        <br />
        <span className="gradient-text">&apos;IT 부캐&apos;</span> 테스트
      </h1>

      <p className="text-balance text-sm leading-relaxed text-slate-300 sm:text-base">
        협업 스타일부터 위기 대처법까지,
        <br />
        내 MBTI 유형에 맞는 IT 직무 페르소나는?
      </p>

      <ParticipantBanner initialCount={participantCount} />

      <Link
        href="/quiz"
        className="btn-primary w-full animate-pulse-glow text-base sm:text-lg"
      >
        내 IT 부캐 확인하러 가기
        <span aria-hidden>➔</span>
      </Link>

      <p className="text-xs text-slate-500">
        8개의 질문 · 소요 시간 약 1분
      </p>
    </main>
  );
}
