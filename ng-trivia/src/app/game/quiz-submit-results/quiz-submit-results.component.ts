import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFinalResult } from '../store/quiz.selectors';
import { take } from 'rxjs/operators';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { QuizSubmitModel } from '../models/quiz-submit.model';

@Component({
  selector: 'app-quiz-submit-results',
  templateUrl: './quiz-submit-results.component.html',
  styleUrls: ['./quiz-submit-results.component.scss']
})
export class QuizSubmitResultsComponent implements OnInit {

  results: QuizSubmitModel;
  name: string;

  constructor(private store: Store, private service: QuizService, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(selectFinalResult)
      .pipe(take(1))
      .subscribe((res) => {
        this.results = res;
      });
  }

  submitResult(): void {
    this.service.submitAnswer({
      name: this.name.trim(),
      score: this.results.score,
      answers: this.results.answers,
    }).subscribe(() => {
      this.router.navigate(['rating']);
    });
  }
}
