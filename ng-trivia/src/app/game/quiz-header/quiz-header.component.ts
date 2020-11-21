import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectLives, selectQuestionNumberOf, selectScore } from '../store/quiz.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss']
})
export class QuizHeaderComponent implements OnInit {

  lives$: Observable<number> = this.store.select(selectLives);
  questionNumberOf$: Observable<{ current: number, total: number }> = this.store.select(selectQuestionNumberOf);
  score$: Observable<number> = this.store.select(selectScore);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
