import { AnswerModel } from './answer.model';

export interface QuizSubmitModel {
  name?: string;
  score?: number;
  answers?: AnswerModel[];

  correctAnswers?: number;
  totalQuestions?: number;
}
