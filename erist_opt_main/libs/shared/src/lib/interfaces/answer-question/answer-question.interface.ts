/* eslint-disable @nx/enforce-module-boundaries */
export interface IAnswerQuestion {
  id: string;
  question: string;
  answer: string;
  status: boolean;
  sort: number;
}

export interface IInputAnswerQuestion {
  question: string;
  answer: string;
}

export interface IInputUpdateAnswerQuestion {
  id: string;
  question: string;
  answer: string;
  status: boolean;
}

export interface IInputToggleAnswerQuestionStatus {
  id: string;
}
