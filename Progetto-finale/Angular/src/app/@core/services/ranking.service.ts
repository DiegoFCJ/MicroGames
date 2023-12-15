import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ranking } from 'src/app/models/ranking';


@Injectable({
  providedIn: 'root'
})
export class RankingService {

  nodeBaseUrl: String = "http://localhost:1234/api"
  latestGamePoints: number = 0;

  constructor(private httpClient: HttpClient) { }

  getRankingByUserId(userId: number){
    return this.httpClient.get<Ranking>(`${this.nodeBaseUrl}/ranking/${userId}`);
  }

  createRanking(ranking: Partial<Ranking>){
    this.latestGamePoints = ranking.gamePoints || 0 ;
    return this.httpClient.post<Ranking>(`${this.nodeBaseUrl}/ranking`, ranking); 
  }

  getRanking(userId: number){
    return this.httpClient.get<Ranking[]>(`${this.nodeBaseUrl}/rankingall/${userId}`);
  }
}

