import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { QuizModule } from './quiz/quiz.module';
import { PlayerStatsEntity } from './quiz/entities/player-stats.entity';
import { QuestionStatsEntity } from './quiz/entities/question-stats.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      entities: [PlayerStatsEntity, QuestionStatsEntity],
      // synchronize: true,
      // ssl: true,
      // autoLoadEntities: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: true,
    }),
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
