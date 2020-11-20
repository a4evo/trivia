import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('player_stats')
export class PlayerStats {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() score: number;

  constructor(stats?: Partial<PlayerStats>) {
    Object.assign(this, stats);
  }
}
