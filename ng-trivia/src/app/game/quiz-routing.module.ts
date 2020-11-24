import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizSubmitResultsComponent } from './quiz-submit-results/quiz-submit-results.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: QuizComponent },
  { path: 'game-over', component: QuizSubmitResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {
}
