import { Action, createReducer, on } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { gameOver, setQuestions, skipQuestion, startQuiz, submitAnswer } from './quiz.actions';
import { QuestionModel } from '../models/question.model';
import { AnswerModel } from '../models/answer.model';

export const quizFeatureKey = 'quiz';

export interface AppState {
  quiz?: QuizState;
}

export interface QuizState {
  lives: number;
  questions: QuestionModel[];
  currentQuestion: number;
  score: number;
  correctAnswers: number;
  answers: AnswerModel[];
}

export const initialQuizState: QuizState = {
  lives: 3,
  questions: [],
  currentQuestion: -1,
  score: 0,
  answers: [],
  correctAnswers: 0
};

const _quizReducer: ActionReducer<QuizState> = createReducer(
  initialQuizState,
  on(setQuestions, (state, { questions }) => ({
    ...state,
    questions: [...questions]
  })),
  on(startQuiz, () => ({ ...initialQuizState, currentQuestion: 0 })),
  on(skipQuestion, (state) => ({
    ...state,
    lives: state.lives - 1,
    currentQuestion: state.currentQuestion + 1
  })),
  on(submitAnswer, (state, { question, correct }) => ({
    ...state,
    currentQuestion: state.currentQuestion + 1,
    score: correct ? state.score + 100 : state.score,
    lives: correct ? state.lives : state.lives - 1,
    answers: [...state.answers, { question, correct }],
    correctAnswers: correct ? state.correctAnswers + 1 : state.correctAnswers
  })),
  on(gameOver, state => ({
    ...state,
    currentQuestion: -1,
    score: state.score + (state.lives + 1) * 500
  })),
  )
;

export function quizReducer(state: QuizState | undefined, action: Action): QuizState {
  return _quizReducer(state, action);
}

