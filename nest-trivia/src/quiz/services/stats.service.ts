import { Injectable } from '@nestjs/common';
import { SubmitResultDto } from '../dto/submit-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStatsEntity } from '../entities/player-stats.entity';
import { MongoRepository } from 'typeorm';
import { QuestionStatsEntity } from '../entities/question-stats.entity';
import { forkJoin } from 'rxjs';
import { QuestionStatsDto } from '../dto/question-stats.dto';
import { PlayersStatsDto } from '../dto/players-stats.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(PlayerStatsEntity)
    private readonly playerStatsRepository: MongoRepository<PlayerStatsEntity>,
    @InjectRepository(QuestionStatsEntity)
    private readonly questionStatsRepository: MongoRepository<
      QuestionStatsEntity
    >,
  ) {}

  submitResult(result: SubmitResultDto) {
    return forkJoin({
      player: this.submitPlayerStats(result),
      questions: this.submitQuestionsStats(result),
    });
  }

  private submitPlayerStats(result: SubmitResultDto) {
    return this.playerStatsRepository.save(
      new PlayerStatsEntity({ name: result.name, score: result.score }),
    );
  }

  private submitQuestionsStats(result: SubmitResultDto) {
    return this.questionStatsRepository.insertMany(result.answers);
  }

  getPlayersStats(): Promise<PlayersStatsDto[]> {
    return this.playerStatsRepository.find({
      order: { score: 'DESC' },
      take: 10,
    });
  }

  getQuestionsStats(): Promise<QuestionStatsDto[]> {
    return this.questionStatsRepository
      .aggregate([
        {
          $group: {
            _id: '$question',
            attempts: { $sum: 1 },
            success: { $sum: { $cond: ['$correct', 1, 0] } },
          },
        },
      ])
      .sort({ attempts: -1, success: -1 })
      .limit(10)
      .toArray();
  }
}
