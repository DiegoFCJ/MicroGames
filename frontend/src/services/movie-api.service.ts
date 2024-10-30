import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavMovie } from 'src/models/favourite';
import { MovieRootObject } from 'src/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieAPIService {

  constructor(private http: HttpClient) {}

  getMovie(movieId: number) {
    return this.http.get<MovieRootObject>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3949444e64e7a9355250d3b1b5c59bf1&language=it-it`);
  }

  getMoviePosterPath(posterPath: string){
    return `https://image.tmdb.org/t/p/w185${posterPath}`;
  }
}