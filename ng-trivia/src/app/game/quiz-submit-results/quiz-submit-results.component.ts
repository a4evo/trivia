import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFinalResult, selectResultForSubmit } from '../store/quiz.selectors';
import { switchMap, take } from 'rxjs/operators';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-submit-results',
  templateUrl: './quiz-submit-results.component.html',
  styleUrls: ['./quiz-submit-results.component.scss']
})
export class QuizSubmitResultsComponent implements OnInit {

  score: number;
  correctAnswers: number;
  totalQuestions: number;
  name: any;

  constructor(private store: Store, private service: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.store.select(selectFinalResult)
      .pipe(take(1))
      .subscribe(({ score, correctAnswers, totalQuestion }) => {
        this.score = score;
        this.totalQuestions = totalQuestion;
        this.correctAnswers = correctAnswers;
    });
  }

  submitResult(): void {
    this.store.select(selectResultForSubmit).pipe(
      switchMap(res => this.service.submitAnswer({...res, name: this.name.trim()}))
    ).subscribe(res => {
      this.router.navigate(['rating', 'leader']);
    });
  }
}
