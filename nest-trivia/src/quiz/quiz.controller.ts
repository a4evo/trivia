import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { SubmitResultDto } from './dto/submit-result.dto';
import { StatsService } from './services/stats.service';
import { QuestionStatsDto } from './dto/question-stats.dto';
import { PlayersStatsDto } from './dto/players-stats.dto';
import { map } from 'rxjs/operators';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly statsService: StatsService,
  ) {}

  @Get()
  getQuestions() {
    return this.questionsService.getQuestions();
  }

  @Post()
  submitResult(@Body() result: SubmitResultDto) {
    return this.statsService.submitResult(result).pipe(map(() => null));
  }

  @Get('player-stats')
  getPlayerStats(): Promise<PlayersStatsDto[]> {
    return this.statsService.getPlayersStats();
  }

  @Get('question-stats')
  getQuestionStats(): Promise<QuestionStatsDto[]> {
    return this.statsService.getQuestionsStats();
  }
}
