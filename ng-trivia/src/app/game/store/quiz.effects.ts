import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuizActions from './quiz.actions';
import { QuizService } from '../quiz.service';
import { delay, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectIfGameIsOver } from './quiz.selectors';

@Injectable()
export class QuizEffects {

  fetchQuestions$ = createEffect(() => this.actions$.pipe(
    ofType(QuizActions.startQuiz),
    switchMap(() => this.service.getQuestions()),
    map(questions => QuizActions.setQuestions({ questions })),
  ));

  startQuestionsCount$ = createEffect(() => this.actions$.pipe(
    ofType(QuizActions.setQuestions),
    map(() => QuizActions.goToNextQuestion())
  ));

  goToNextQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(QuizActions.skipQuestion, QuizActions.submitAnswer, QuizActions.timeRunOut),
    delay(2000),
    map(() => QuizActions.goToNextQuestion()),
  ));

  gameOver$ = createEffect(() => this.actions$.pipe(
    ofType(QuizActions.goToNextQuestion),
    withLatestFrom(this.store.select(selectIfGameIsOver)),
    filter(([_, isOver]) => !!isOver),
    map(() => QuizActions.gameOver())
  ));

  constructor(private actions$: Actions,
              private store: Store,
              private service: QuizService) {}
}
