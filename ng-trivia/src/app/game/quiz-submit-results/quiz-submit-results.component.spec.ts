import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSubmitResultsComponent } from './quiz-submit-results.component';

describe('QuizSubmitResultsComponent', () => {
  let component: QuizSubmitResultsComponent;
  let fixture: ComponentFixture<QuizSubmitResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSubmitResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSubmitResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
