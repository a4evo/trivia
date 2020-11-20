import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionDto } from '../dto/question.dto';
import { OpendbQuestionDto } from '../dto/opendb-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly http: HttpService) {}

  private static toDto(val: OpendbQuestionDto): QuestionDto {
    return {
      question: val.question,
      correct_answer: val.correct_answer,
      answers: [...val.incorrect_answers, val.correct_answer].sort(
        () => Math.random() - Math.random(),
      ),
    };
  }

  getQuestions(): Observable<QuestionDto[]> {
    return this.http
      .get(`https://opentdb.com/api.php?amount=10&type=multiple`)
      .pipe(
        map((res) =>
          (res.data.results as OpendbQuestionDto[]).map((v) =>
            QuestionsService.toDto(v),
          ),
        ),
      );
  }
}
