import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { timeRunOut } from '../store/quiz.actions';
import { selectStatus } from '../store/quiz.selectors';

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.scss']
})
export class QuizTimerComponent implements OnInit, OnDestroy {

  subs$: Subscription = new Subscription();

  timeLeft = 20;

  stopTimer$: Subject<boolean> = new Subject<boolean>();

  constructor(private  store: Store) {
  }

  ngOnInit(): void {
    const interval$ = interval(1000).pipe(takeUntil(this.stopTimer$));
    const s$ = this.store.select(selectStatus).pipe(
      tap(status => status !== 'TIMER' && this.stopTimer$.next(true)),
      filter(status => status === 'TIMER'),
      tap(() => this.timeLeft = 20),
      switchMap(() => interval$),
      map(() => --this.timeLeft),
      filter((v) => v === 0)
    ).subscribe(() => {
      this.store.dispatch(timeRunOut());
    });
    this.subs$.add(s$);
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
