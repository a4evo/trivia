import { Injectable } from '@nestjs/common';
import { SubmitResultDto } from '../dto/submit-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStats } from '../entities/player-stats.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class StatsService {

  constructor(@InjectRepository(PlayerStats) private readonly playerStatsRepository: MongoRepository<PlayerStats>) {}

  submitResult(result: SubmitResultDto) {
    return this.playerStatsRepository.save(
      new PlayerStats({ name: result.name, score: result.score }),
    );
  }
}
