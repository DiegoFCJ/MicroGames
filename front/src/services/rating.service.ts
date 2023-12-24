import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rating } from 'src/models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  port: string = "8097";
  type: string = "/api/rating";
  springBootUrl: string = environment.APIEndpoint + this.port + this.type;

  constructor(private http: HttpClient) { }

  saveRate(rate: Rating) {
    return this.http.post<Rating>(`${this.springBootUrl}/create`, rate);
  }
}
