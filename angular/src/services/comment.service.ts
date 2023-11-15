import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieData } from 'src/models/movie';
import { AuthService } from './auth.service';
import { MovieAPIService } from './movie-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  port: string = "8093";
  type: string = "/api/comment";
  springBootUrl: string = environment.APIEndpoint + this.port + this.type;
  
  commentForDB!: MovieData;

  constructor(private http: HttpClient, protected movieServ: MovieAPIService, protected authServ: AuthService) { }

  saveComment(el: NgForm) {
    this.commentForDB = {
      comment: el.form.value.comment,
      rating: el.form.value.rating,
      movieId: this.movieServ.movieID,
      userId: this.authServ.getCurrentUser().id
    }
    return this.http.post<MovieData>(`${this.springBootUrl}/comment`, this.commentForDB);
  }
}
