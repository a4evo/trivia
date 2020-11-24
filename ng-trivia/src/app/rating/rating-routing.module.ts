import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { QuestionBoardComponent } from './question-board/question-board.component';
import { RatingComponent } from './rating.component';

const routes: Routes = [
  {
    path: '', component: RatingComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'leader' },
      { path: 'leader', component: LeaderBoardComponent },
      { path: 'question', component: QuestionBoardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule {
}
