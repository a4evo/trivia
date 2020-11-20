import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('question_stats')
export class QuestionStatsEntity {
  @ObjectIdColumn() id: ObjectID;
  @Column() question: string;
  @Column() correct: boolean;

  constructor(stats?: Partial<QuestionStatsEntity>) {
    Object.assign(this, stats);
  }
}
