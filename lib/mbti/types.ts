export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type Dimension = "EI" | "SN" | "TF" | "JP";

export interface QuizOption {
  id: string;
  text: string;
  letter: Letter;
}

export interface QuizQuestion {
  id: number;
  dimension: Dimension;
  question: string;
  options: [QuizOption, QuizOption];
}

export interface QuizAnswer {
  questionId: number;
  optionId: string;
  letter: Letter;
}

export interface Persona {
  type: string;
  title: string;
  tagline: string;
  traits: [string, string, string];
  bestMatch: { type: string; name: string; reason: string };
  worstMatch: { type: string; name: string; reason: string };
}
