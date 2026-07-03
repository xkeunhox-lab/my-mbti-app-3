import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "질문에 답하고 내 IT 부캐 찾기 | IT 부캐 찾기",
};

export default function QuizPage() {
  return <QuizClient />;
}
