import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { QuestionBoardComponent } from './question-board/question-board.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'leader' },
  { path: 'leader', component: LeaderBoardComponent },
  { path: 'question', component: QuestionBoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule {
}
