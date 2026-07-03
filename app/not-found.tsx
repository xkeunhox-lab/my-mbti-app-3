import Link from "next/link";

export default function NotFound() {
  return (
    <div className="glass-card flex w-full max-w-md flex-col items-center gap-4 rounded-2xl p-10 text-center animate-fade-in">
      <p className="text-4xl">🧭</p>
      <h1 className="text-xl font-black text-slate-50">
        페이지를 찾을 수 없어요
      </h1>
      <p className="text-sm leading-relaxed text-slate-400">
        요청하신 결과나 페이지가 존재하지 않아요.
        <br />
        다시 테스트를 시작해 볼까요?
      </p>
      <Link href="/" className="btn-primary w-full">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
