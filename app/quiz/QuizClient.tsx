"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS } from "@/lib/mbti/questions";
import { calculateMbti } from "@/lib/mbti/scoring";
import { submitQuizResult } from "@/lib/actions";
import type { QuizAnswer } from "@/lib/mbti/types";
import ProgressBar from "@/components/ProgressBar";

const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
const TRANSITION_MS = 250;

export default function QuizClient() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isFading, setIsFading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelect = useCallback(
    (optionId: string, letter: QuizAnswer["letter"]) => {
      if (isFading || isAnalyzing) return;

      setIsFading(true);

      window.setTimeout(async () => {
        const nextAnswers = [
          ...answers,
          { questionId: currentQuestion.id, optionId, letter },
        ];

        if (currentIndex + 1 >= TOTAL_QUESTIONS) {
          setIsAnalyzing(true);
          const mbtiType = calculateMbti(nextAnswers);

          const [result] = await Promise.allSettled([
            submitQuizResult(mbtiType, nextAnswers),
            new Promise((resolve) => window.setTimeout(resolve, 1200)),
          ]);

          if (result.status === "rejected") {
            console.error("결과 저장 중 오류가 발생했습니다.", result.reason);
          }

          router.push(`/result/${mbtiType}`);
          return;
        }

        setAnswers(nextAnswers);
        setCurrentIndex((prev) => prev + 1);
        setIsFading(false);
      }, TRANSITION_MS);
    },
    [answers, currentIndex, currentQuestion, isAnalyzing, isFading, router]
  );

  if (isAnalyzing) {
    return (
      <div className="glass-card flex w-full max-w-md flex-col items-center gap-4 rounded-2xl p-10 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-400/30 border-t-indigo-400" />
        <p className="font-bold text-slate-100">나만의 IT 부캐를 분석하고 있어요...</p>
        <p className="text-sm text-slate-400">잠시만 기다려 주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <ProgressBar current={currentIndex + 1} total={TOTAL_QUESTIONS} />

      <div
        key={currentQuestion.id}
        className={`glass-card flex flex-col gap-8 rounded-2xl p-8 ${
          isFading ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <p className="text-center text-lg font-bold leading-relaxed text-slate-50 sm:text-xl">
          {currentQuestion.question}
        </p>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id, option.letter)}
              disabled={isFading}
              className="btn-secondary w-full whitespace-normal py-5 text-left text-sm leading-relaxed sm:text-base"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
