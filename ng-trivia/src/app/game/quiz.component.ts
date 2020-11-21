import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { gameOver, startQuiz } from './store/quiz.actions';
import { combineLatest } from 'rxjs';
import { selectLives, selectQuestionNumberOf } from './store/quiz.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {


  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.dispatch(startQuiz());
    this.subscribeOnGameOver();
  }

  subscribeOnGameOver(): void {
    const subs$ = combineLatest([
      this.store.select(selectQuestionNumberOf),
      this.store.select(selectLives),
    ]).subscribe(([numberOf, lives]) => {
      const isLast = numberOf.total && numberOf.current > numberOf.total;
      if (lives < 0 || isLast) {
        subs$.unsubscribe();
        this.router.navigate(['game-over'], { relativeTo: this.route }).then(() => this.store.dispatch(gameOver()));
      }
    });
  }
}
