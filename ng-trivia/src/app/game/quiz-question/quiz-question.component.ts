import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentQuestion, selectLives } from '../store/quiz.selectors';
import { Observable, Subscription } from 'rxjs';
import { QuestionModel } from '../models/question.model';
import { skipQuestion, submitAnswer } from '../store/quiz.actions';

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
      this.store.select(selectCurrentQuestion)
        // .pipe(delay(5000))
        .subscribe(({ question, currentQuestion }) => {
          this.question = question;
          this.questionNumber = currentQuestion;
          this.selectedAnswer = null;
          this.status = null;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  selectValue(answer: string): void {
    this.selectedAnswer = answer;
  }

  submit(): void {
    this.status = this.selectedAnswer === this.question.correct_answer ? 'RIGHT' : 'WRONG';

    this.store.dispatch(submitAnswer({
      question: this.question.question,
      correct: this.status === 'RIGHT'
    }));
  }


  skip(): void {
    this.store.dispatch(skipQuestion());
  }
}
