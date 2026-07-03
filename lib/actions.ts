"use server";

import { createSupabaseServerClient } from "./supabase/server";
import type { QuizAnswer } from "./mbti/types";

export async function submitQuizResult(mbtiType: string, answers: QuizAnswer[]) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("mbti_results").insert({
    mbti_type: mbtiType,
    answers,
  });

  if (error) {
    console.error("[submitQuizResult] failed to save result:", error.message);
  }
}
