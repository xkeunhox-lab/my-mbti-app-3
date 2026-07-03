"use client";

import Link from "next/link";
import { useState } from "react";

export default function ShareActions() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("링크 복사에 실패했습니다.", error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <Link href="/quiz" className="btn-secondary w-full">
        테스트 다시 하기
      </Link>
      <button
        type="button"
        onClick={handleCopyLink}
        className="btn-primary w-full"
      >
        {copied ? "링크가 복사되었어요! ✅" : "결과 링크 복사하기"}
      </button>
    </div>
  );
}
