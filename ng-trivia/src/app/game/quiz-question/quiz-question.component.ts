import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentQuestion, selectLives, selectQuestionNumberOf } from '../store/quiz.selectors';
import { Observable, of, Subscription } from 'rxjs';
import { QuestionModel } from '../models/question.model';
import { skipQuestion, submitAnswer } from '../store/quiz.actions';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit, OnDestroy {

  subs$: Subscription = new Subscription();

  question: QuestionModel;
  questionNumber: number;
  attempts$: Observable<number> = this.store.select(selectLives);

  selectedAnswer: string | null;
  status: 'RIGHT' | 'WRONG' | null;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.subs$.add(
      this.store.select(selectCurrentQuestion).subscribe(question => {
        this.question = question;
        this.selectedAnswer = null;
        this.status = null;
      }));
    this.subs$.add(
      this.store.select(selectQuestionNumberOf).subscribe(({ current, total }) => {
        this.questionNumber = current;
      }));
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  selectValue(answer: string): void {
    this.selectedAnswer = answer;
  }

  submit(): void {
    this.status = this.selectedAnswer === this.question.correct_answer ? 'RIGHT' : 'WRONG';
    const s$ = of(null).pipe(
      delay(2000)
    ).subscribe(() => {
      this.store.dispatch(submitAnswer({
        question: this.question.question,
        correct: this.status === 'RIGHT'
      }));
      s$.unsubscribe();
    });
  }


  skip(): void {
    this.store.dispatch(skipQuestion());
  }
}
