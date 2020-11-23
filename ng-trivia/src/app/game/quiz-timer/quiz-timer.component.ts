import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { skipQuestion } from '../store/quiz.actions';
import { selectQuestionNumberOf } from '../store/quiz.selectors';

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.scss']
})
export class QuizTimerComponent implements OnInit, OnDestroy {

  subs$: Subscription = new Subscription();

  timeLeft = 20;

  constructor(private  store: Store) {
  }

  ngOnInit(): void {
    const s$ = this.store.select(selectQuestionNumberOf).pipe(
      tap(() => this.timeLeft = 20),
      switchMap(() => interval(1000)),
      map(() => --this.timeLeft),
      filter((v) => v === 0)
    ).subscribe(() => {
      this.store.dispatch(skipQuestion());
    });
    this.subs$.add(s$);
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
