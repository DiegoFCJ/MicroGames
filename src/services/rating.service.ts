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
  springBootUrl: string = "";

  constructor(private http: HttpClient) {
    if(!environment.production){
      this.springBootUrl = environment.APIEndpoint + this.port + this.type;
    }else{
      this.springBootUrl = environment.APIEndpoint;
    }
  }

  saveRate(rate: Rating) {
    return this.http.post<Rating>(`${this.springBootUrl}/create`, rate);
  }
}
