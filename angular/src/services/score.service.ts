import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScoreFull, ScoreDTO } from 'src/models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  port: string = "8094";
  type: string = "/api/score";
  springBootUrl: string = environment.APIEndpoint + this.port + this.type;
  
  dataSource: any;

  constructor(private http: HttpClient) { }

  fetchAllScores(){
    return this.http.get<ScoreFull[]>(`${this.springBootUrl}/getAll `);
  }

  saveNewScore(scoreForDB: ScoreDTO): Observable<any>{
    return this.http.post(`${this.springBootUrl}/create`, scoreForDB, { responseType: 'text' });
  }
}
