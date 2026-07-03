import type { Letter, QuizAnswer } from "./types";

// 동점일 경우 우선순위: I, N, T, P
const TIE_BREAK_WINNER: Record<string, Letter> = {
  EI: "I",
  SN: "N",
  TF: "T",
  JP: "P",
};

const PAIRS: Array<[Letter, Letter]> = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"],
];

export function calculateMbti(answers: QuizAnswer[]): string {
  const scores: Record<Letter, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  for (const answer of answers) {
    scores[answer.letter] += 1;
  }

  let result = "";

  for (const [left, right] of PAIRS) {
    const dimensionKey = `${left}${right}`;
    if (scores[left] > scores[right]) {
      result += left;
    } else if (scores[right] > scores[left]) {
      result += right;
    } else {
      result += TIE_BREAK_WINNER[dimensionKey];
    }
  }

  return result;
}
