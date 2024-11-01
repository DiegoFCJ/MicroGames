import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  port: string = "8095";
  type: string = "/api/comment";
  springBootUrl: string = "";

  constructor(private http: HttpClient) {
    if(!environment.production){
      this.springBootUrl = environment.APIEndpoint + this.port + this.type;
    }else{
      this.springBootUrl = environment.APIEndpoint;
    }
  }

  readByUserIdAndMovieId(userId: number, movieId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.springBootUrl}/readByUserIdAndMovieId?userId=${userId}&movieId=${movieId}`);
  }

  readByMovieId(movieId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.springBootUrl}/readByMovieId?movieId=${movieId}`);
  }

  saveComment(comment: Comment) {
    return this.http.post<Comment>(`${this.springBootUrl}/create`, comment);
  }
}
