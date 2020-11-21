import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, quizFeatureKey, QuizState } from './quiz.reducer';

export const selectQuizState = createFeatureSelector<AppState, QuizState>(quizFeatureKey);

export const selectQuestions = createSelector(
  selectQuizState,
  (state: QuizState) => state.questions
);

export const selectLives = createSelector(
  selectQuizState,
  (state: QuizState) => state.lives
);

export const selectQuestionNumberOf = createSelector(
  selectQuizState,
  (state: QuizState) => ({
    current: state.currentQuestion + 1, total: state.questions.length
  })
);

export const selectScore = createSelector(
  selectQuizState,
  (state: QuizState) => state.score
);

export const selectCurrentQuestion = createSelector(
  selectQuizState,
  (state: QuizState) => state.questions[state.currentQuestion]
);

export const selectFinalResult = createSelector(
  selectQuizState,
  ({ score, questions, correctAnswers }: QuizState) => ({
    score,
    correctAnswers,
    totalQuestion: questions.length
  })
);

export const selectResultForSubmit = createSelector(
  selectQuizState,
  ({  score, answers }: QuizState) => ({
    score, answers
  })
);
