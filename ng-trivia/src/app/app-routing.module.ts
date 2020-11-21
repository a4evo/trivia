import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StartComponent },
  { path: 'quiz', loadChildren: () => import('./game/quiz.module').then(m => m.QuizModule) },
  { path: 'rating', loadChildren: () => import('./rating/rating.module').then(m => m.RatingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
