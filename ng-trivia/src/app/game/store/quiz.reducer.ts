import { Action, createReducer, on } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import * as QuizActions from './quiz.actions';
import { QuestionModel } from '../models/question.model';
import { AnswerModel } from '../models/answer.model';

export const quizFeatureKey = 'quiz';

export interface AppState {
  quiz?: QuizState;
}

export type QuizStatus = 'TIMER' | 'TIME_IS_OUT' | 'SUBMITTED_RIGHT' | 'SUBMITTED_WRONG' | 'SKIPPED' | 'GAME_OVER';

export interface QuizState {
  status: QuizStatus | null;
  lives: number;
  questions: QuestionModel[];
  currentQuestion: number;
  score: number;
  correctAnswers: number;
  answers: AnswerModel[];
}

export const initialQuizState: QuizState = {
  status: null,
  lives: 3,
  questions: [],
  currentQuestion: -1,
  score: 0,
  answers: [],
  correctAnswers: 0
};

const _quizReducer: ActionReducer<QuizState> = createReducer(
  initialQuizState,
  on(QuizActions.setQuestions, (state, { questions }) => ({
    ...state,
    questions: [...questions]
  })),
  on(QuizActions.startQuiz, () => ({ ...initialQuizState })),
  on(QuizActions.skipQuestion, (state) => ({
    ...state,
    lives: state.lives - 1,
    status: 'SKIPPED'
  })),
  on(QuizActions.timeRunOut, (state) => ({
    ...state,
    lives: state.lives - 1,
    status: 'TIME_IS_OUT'
  })),
  on(QuizActions.submitAnswer, (state, { question, correct }) => ({
    ...state,
    status: correct ? 'SUBMITTED_RIGHT' : 'SUBMITTED_WRONG',
    score: correct ? state.score + 100 : state.score,
    lives: correct ? state.lives : state.lives - 1,
    answers: [...state.answers, { question, correct }],
    correctAnswers: correct ? state.correctAnswers + 1 : state.correctAnswers
  })),
  on(QuizActions.goToNextQuestion, (state) => ({
    ...state,
    currentQuestion: state.currentQuestion + 1,
    status: 'TIMER'
  })),
  on(QuizActions.gameOver, state => ({
    ...state,
    status: 'GAME_OVER',
    score: state.score + (state.lives + 1) * 500
  })),
  )
;

export function quizReducer(state: QuizState | undefined, action: Action): QuizState {
  return _quizReducer(state, action);
}

