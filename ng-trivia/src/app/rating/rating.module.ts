import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { QuestionBoardComponent } from './question-board/question-board.component';
import { RatingService } from './rating.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [LeaderBoardComponent, QuestionBoardComponent],
  imports: [
    CommonModule,
    RatingRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [
    RatingService,
  ]
})
export class RatingModule { }
