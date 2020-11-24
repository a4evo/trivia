import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QuizEffects } from './store/quiz.effects';
import { quizFeatureKey, quizReducer } from './store/quiz.reducer';
import { QuizComponent } from './quiz.component';
import { QuizService } from './quiz.service';
import { QuizHeaderComponent } from './quiz-header/quiz-header.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizSubmitResultsComponent } from './quiz-submit-results/quiz-submit-results.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuizTimerComponent } from './quiz-timer/quiz-timer.component';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [QuizComponent, QuizHeaderComponent, QuizQuestionComponent, QuizSubmitResultsComponent, QuizTimerComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    StoreModule.forFeature(quizFeatureKey, quizReducer),
    EffectsModule.forFeature([QuizEffects]),
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
  ],
  providers: [
    QuizService,
  ]
})
export class QuizModule {
}
