import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { startQuiz } from './store/quiz.actions';
import { selectStatus } from './store/quiz.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {


  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.dispatch(startQuiz());
    this.subscribeOnGameOver();
  }

  subscribeOnGameOver(): void {
    const subs$ = this.store.select(selectStatus)
      .pipe(filter(status => status === 'GAME_OVER'))
      .subscribe(() => {
        subs$.unsubscribe();
        this.router.navigate(['game-over'], { relativeTo: this.route });
      });
  }
}
