import { createAction, props } from '@ngrx/store';
import { QuestionModel } from '../models/question.model';

export const startQuiz = createAction(
  '[Quiz] start quiz'
);

export const setQuestions = createAction(
  '[Quiz] Set questions',
  props<{
    questions: QuestionModel[]
  }>()
);

export const skipQuestion = createAction(
  '[Quiz] Skip question'
);

export const submitAnswer = createAction(
  '[Quiz] Submit question',
  props<{
    question: string,
    correct: boolean
  }>()
);

export const gameOver = createAction(
  '[Quiz] Finish game'
);
