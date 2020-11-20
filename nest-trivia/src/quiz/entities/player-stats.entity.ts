import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('player_stats')
export class PlayerStatsEntity {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() score: number;

  constructor(stats?: Partial<PlayerStatsEntity>) {
    Object.assign(this, stats);
  }
}
