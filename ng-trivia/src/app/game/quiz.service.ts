import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionModel } from './models/question.model';
import { QuizSubmitModel } from './models/quiz-submit.model';

@Injectable()
export class QuizService {

  prefix = 'api/v1/quiz';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.prefix}`);
  }

  submitAnswer(result: QuizSubmitModel): Observable<null> {
    return this.http.post<null>(this.prefix, result);
  }
}
