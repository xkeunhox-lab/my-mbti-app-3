"use client";

import { useEffect, useState } from "react";

export default function ParticipantBanner({ initialCount }: { initialCount: number }) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const target = initialCount;
    if (target <= 0) {
      setDisplayCount(0);
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    let frameId: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [initialCount]);

  return (
    <div className="glass-card inline-flex items-center gap-2 rounded-full border-indigo-400/30 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-200 sm:text-base">
      <span className="text-lg">👥</span>
      <span>
        이미{" "}
        <span className="font-extrabold text-cyan-300">
          {displayCount.toLocaleString()}명
        </span>
        의 동료들이 자신의 부캐를 확인했어요!
      </span>
    </div>
  );
}
