import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuizActions from './quiz.actions';
import { QuizService } from '../quiz.service';
import { map, switchMap } from 'rxjs/operators';
import { setQuestions } from './quiz.actions';

@Injectable()
export class QuizEffects {

  fetchQuestions$ = createEffect(() => this.actions$.pipe(
    ofType(QuizActions.startQuiz),
    switchMap(() => this.service.getQuestions()),
    map(questions => setQuestions({ questions }))
  ));

  constructor(private actions$: Actions,
              private service: QuizService) {}
}
