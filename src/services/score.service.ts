import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScoresForRankDTO, ScoreDTO } from 'src/models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  port: string = "8094";
  type: string = "/api/score";
  springBootUrl: string = "";

  constructor(private http: HttpClient) {
    if(!environment.production){
      this.springBootUrl = environment.APIEndpoint + this.port + this.type;
    }else{
      this.springBootUrl = environment.APIEndpoint;
    }
  }

  getScForRunkings(): Observable<any>{
    return this.http.get<ScoresForRankDTO[]>(`${this.springBootUrl}/getScForRunkings`);
  }

  saveNewScore(scoreForDB: ScoreDTO): Observable<any>{
    return this.http.post(`${this.springBootUrl}/create`, scoreForDB, { responseType: 'text' });
  }
}
