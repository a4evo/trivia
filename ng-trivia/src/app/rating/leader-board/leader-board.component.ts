import { Component, OnInit } from '@angular/core';
import { RatingService } from '../rating.service';
import { Observable } from 'rxjs';
import { LeaderBoardEntry } from '../models/leader-board-entry.interface';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {

  data$: Observable<LeaderBoardEntry[]>;

  constructor(private service: RatingService) { }

  ngOnInit(): void {
    this.data$ = this.service.getLeaderBoardData();
  }

}
