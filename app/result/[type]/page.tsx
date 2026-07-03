import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPersona, isValidMbtiType } from "@/lib/mbti/personas";
import ShareActions from "@/components/ShareActions";

type ResultPageProps = {
  params: Promise<{ type: string }>;
};

export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const { type } = await params;
  const persona = getPersona(type);

  if (!persona) {
    return { title: "결과를 찾을 수 없어요 | IT 부캐 찾기" };
  }

  return {
    title: `${persona.title} (${persona.type}) | IT 부캐 찾기`,
    description: persona.tagline,
    openGraph: {
      title: `나의 IT 부캐는 '${persona.title}'!`,
      description: persona.tagline,
      type: "website",
    },
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { type } = await params;

  if (!isValidMbtiType(type)) {
    notFound();
  }

  const persona = getPersona(type)!;

  return (
    <main className="flex w-full max-w-md flex-col items-center gap-6 animate-fade-in">
      <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-xs font-bold tracking-widest text-cyan-300">
        나의 IT 부캐 분석 결과
      </span>

      <div className="glass-card flex w-full flex-col items-center gap-3 rounded-2xl p-8 text-center">
        <p className="text-4xl font-black tracking-widest gradient-text">
          {persona.type}
        </p>
        <h1 className="text-2xl font-black text-slate-50 sm:text-3xl">
          {persona.title}
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          &ldquo;{persona.tagline}&rdquo;
        </p>
      </div>

      <section className="glass-card w-full rounded-2xl p-6 text-left">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-indigo-300">
          <span>✨</span> 일상 속 나의 모습
        </h2>
        <ul className="flex flex-col gap-3">
          {persona.traits.map((trait, index) => (
            <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-slate-200 sm:text-base">
              <span className="mt-0.5 text-cyan-400">•</span>
              <span>{trait}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="glass-card rounded-2xl border-emerald-400/20 bg-emerald-500/5 p-5">
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-emerald-300">
            <span>💚</span> 찰떡궁합
          </h3>
          <p className="text-xs font-bold text-slate-100 sm:text-sm">
            {persona.bestMatch.type} · {persona.bestMatch.name}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
            {persona.bestMatch.reason}
          </p>
        </div>
        <div className="glass-card rounded-2xl border-rose-400/20 bg-rose-500/5 p-5">
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-rose-300">
            <span>⚡</span> 케미 주의
          </h3>
          <p className="text-xs font-bold text-slate-100 sm:text-sm">
            {persona.worstMatch.type} · {persona.worstMatch.name}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
            {persona.worstMatch.reason}
          </p>
        </div>
      </section>

      <ShareActions />
    </main>
  );
}
