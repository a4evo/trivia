import { Component, OnInit } from '@angular/core';
import { RatingService } from '../rating.service';
import { Observable } from 'rxjs';
import { QuestionBoardEntry } from '../models/question-board-entry.model';

@Component({
  selector: 'app-question-board',
  templateUrl: './question-board.component.html',
  styleUrls: ['./question-board.component.scss']
})
export class QuestionBoardComponent implements OnInit {

  data$: Observable<QuestionBoardEntry[]>;

  constructor(private service: RatingService) { }

  ngOnInit(): void {
    this.data$ = this.service.getQuestionBoardData();
  }

}
