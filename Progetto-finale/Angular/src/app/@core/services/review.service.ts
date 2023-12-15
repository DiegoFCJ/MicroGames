import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'src/app/models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  dotnetBaseUrl : string = "http://localhost:5261/api/review"

  constructor(private httpClient: HttpClient) { }

  addReview(review: Review){
    return this.httpClient.post<Review>(`${this.dotnetBaseUrl}`, review); 
  }
}
