import { HttpModule, Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuestionsService } from './services/questions.service';
import { StatsService } from './services/stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerStatsEntity } from './entities/player-stats.entity';
import { QuestionStatsEntity } from './entities/question-stats.entity';

@Module({
  controllers: [QuizController],
  providers: [QuestionsService, StatsService],
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([PlayerStatsEntity, QuestionStatsEntity]),
  ],
})
export class QuizModule {}
