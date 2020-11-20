import { Body, Controller, Get, Post } from '@nestjs/common';
import { of } from 'rxjs';
import { QuestionsService } from './services/questions.service';
import { SubmitResultDto } from './dto/submit-result.dto';
import { StatsService } from './services/stats.service';

@Controller('quiz')
export class QuizController {

  constructor(private readonly questionsService: QuestionsService,
              private readonly statsService: StatsService) {
  }

  @Get()
  getQuestions() {
    return this.questionsService.getQuestions();
  }

  @Get('player-stats')
  getPlayerStats() {
    return of([1, 2, 4]);
  }

  @Get('question-stats')
  getQuestionStats() {
    return of([1, 2, 4]);
  }

  @Post()
  submitResult(@Body() result: SubmitResultDto) {
    return this.statsService.submitResult(result);
  }
}
