import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from 'src/app/models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  nodeBaseUrl: String = "http://localhost:1234/api";

  constructor(private httpClient: HttpClient) { }

  getRating(userId: number, movieId: number){
    return this.httpClient.get<Rating>(`${this.nodeBaseUrl}/rating/${userId}/${movieId}`);
  }

  createRating(rating: Partial<Rating>){
    return this.httpClient.post<Rating>(`${this.nodeBaseUrl}/rating`, rating); 
  }

  updateRating(userId: number, rating: Partial<Rating>){
    return this.httpClient.patch<Rating>(`${this.nodeBaseUrl}/rating/${userId}/`, rating);
  }

  deleteRating(userId: number){
    return this.httpClient.delete<Rating>(`${this.nodeBaseUrl}/rating/${userId}/`);
  }
}
