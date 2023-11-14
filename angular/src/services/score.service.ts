import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoreFull, ScoreInfo } from 'src/models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  scoreForDB!: ScoreInfo;
  dataSource: any;

  constructor(private http: HttpClient) { }

  fetchAllScores(){
    return this.http.get<ScoreFull[]>(`http://localhost:4567/top10`);
  }

  saveNewScore(){
    return this.http.post<ScoreInfo>(`http://localhost:4567/score`, this.scoreForDB);
  }
}
