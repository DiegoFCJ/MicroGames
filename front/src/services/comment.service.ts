import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieAPIService } from './movie-api.service';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  port: string = "8095";
  type: string = "/api/comment";
  springBootUrl: string = environment.APIEndpoint + this.port + this.type;

  constructor(private http: HttpClient) { }

  saveComment(comment: Comment) {
    return this.http.post<Comment>(`${this.springBootUrl}/create`, comment);
  }
}
