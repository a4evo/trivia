import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionDto } from '../dto/question.dto';
import { OpendbQuestionDto } from '../dto/opendb-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly http: HttpService) {}

  private static toDto(val: OpendbQuestionDto): QuestionDto {
    const correct_answer = decodeURIComponent(val.correct_answer);
    return {
      question: decodeURIComponent(val.question),
      correct_answer,
      answers: val.incorrect_answers
        .map((answer) => decodeURIComponent(answer))
        .concat(correct_answer)
        .sort(() => Math.random() - Math.random()),
    };
  }

  getQuestions(): Observable<QuestionDto[]> {
    return this.http
      .get(`https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986`)
      .pipe(
        map((res) =>
          (res.data.results as OpendbQuestionDto[]).map((v) =>
            QuestionsService.toDto(v),
          ),
        ),
      );
  }
}
