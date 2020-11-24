import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as QuizSelectors from '../store/quiz.selectors';
import { Observable, Subscription } from 'rxjs';
import { QuestionModel } from '../models/question.model';
import { skipQuestion, submitAnswer } from '../store/quiz.actions';
import { QuizStatus } from '../store/quiz.reducer';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit, OnDestroy {

  subs$: Subscription = new Subscription();

  question: QuestionModel;
  questionIndex: number;

  attempts$: Observable<number> = this.store.select(QuizSelectors.selectLives);
  status$: Observable<QuizStatus | null> = this.store.select(QuizSelectors.selectStatus);
  questionIndex$: Observable<number> = this.store.select(QuizSelectors.selectCurrentQuestionIndex);
  question$: Observable<QuestionModel> = this.store.select(QuizSelectors.selectQuestion);

  selectedAnswer: string | null;

  status: QuizStatus | null = null;
  disableButtons = false;
  messages: { [K: string]: string } = {
    SUBMITTED_RIGHT: 'GOOD JOB!!! Prepare for the next question…',
    SUBMITTED_WRONG: 'WRONG! Prepare for the next question…',
    TIME_IS_OUT: 'TIMES UP :( Prepare for the next question…',
    SKIPPED: 'SKIPPED! May be better luck next time...'
  };

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.subs$.add(this.getQuestion());
    this.subs$.add(this.getQuestionIndex());
    this.subs$.add(this.getStatus());
  }

  private getQuestion(): Subscription {
    return this.question$.subscribe(question => {
      this.question = question;
      this.selectedAnswer = null;
    });
  }

  private getQuestionIndex(): Subscription {
    return this.questionIndex$.subscribe(index => {
      this.questionIndex = index;
    });
  }

  private getStatus(): Subscription {
    return this.status$
      .subscribe((status) => {
        this.disableButtons = status !== 'TIMER';
        this.status = status;
      });
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  selectValue(answer: string): void {
    this.selectedAnswer = answer;
  }

  submit(): void {
    this.store.dispatch(submitAnswer({
      question: this.question.question,
      correct: this.selectedAnswer === this.question.correct_answer
    }));
  }

  skip(): void {
    this.store.dispatch(skipQuestion());
  }
}
