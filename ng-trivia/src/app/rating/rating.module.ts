import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { QuestionBoardComponent } from './question-board/question-board.component';
import { RatingService } from './rating.service';


@NgModule({
  declarations: [LeaderBoardComponent, QuestionBoardComponent],
  imports: [
    CommonModule,
    RatingRoutingModule,
  ],
  providers: [
    RatingService,
  ]
})
export class RatingModule { }
