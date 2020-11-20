import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaderBoardEntry } from './models/leader-board-entry.interface';

@Injectable()
export class RatingService {

  prefix = 'api/v1/quiz';

  constructor(private http: HttpClient) { }

  getLeaderBoardData(): Observable<LeaderBoardEntry[]> {
    return this.http.get<LeaderBoardEntry[]>(`${this.prefix}/player-stats`);
  }

}
