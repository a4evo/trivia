import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, quizFeatureKey, QuizState } from './quiz.reducer';

export const selectQuizState = createFeatureSelector<AppState, QuizState>(quizFeatureKey);

export const selectQuestion = createSelector(
  selectQuizState,
  ({ questions, currentQuestion }: QuizState) => questions[currentQuestion]
);

export const selectStatus = createSelector(
  selectQuizState,
  (state: QuizState) => state.status
);

export const selectCurrentQuestionIndex = createSelector(
  selectQuizState,
  ({ currentQuestion }: QuizState) => currentQuestion
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

export const selectIfGameIsOver = createSelector(
  selectQuizState,
  ({ lives, currentQuestion, questions }: QuizState) => lives < 0 || (questions.length && currentQuestion >= questions.length)
);

export const selectScore = createSelector(
  selectQuizState,
  (state: QuizState) => state.score
);


export const selectFinalResult = createSelector(
  selectQuizState,
  ({ score, questions, correctAnswers, answers }: QuizState) => ({
    score,
    answers,
    correctAnswers,
    totalQuestions: questions.length
  })
);

