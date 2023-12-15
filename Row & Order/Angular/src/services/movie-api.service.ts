import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavMovie } from 'src/models/favourite';
import { MovieRootObject } from 'src/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieAPIService {
  num: number = 0;
  movieID = 0;
  rating: number = 0;
  userNameLogged: string = '';
  attribute: any;
  favourites: FavMovie[] = [];
  ordMovies: MovieRootObject[] = [];
  singleFavourite: FavMovie = {
    id: 0,
    comment: '',
    userId: 0,
    movieId: 0,
    rating: 0,
    title: '',
    poster_path: ''
  }

  constructor(private http: HttpClient, private modal: NgbModal) {}

  getMovie(movieId: number) {
    return this.http.get<MovieRootObject>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3949444e64e7a9355250d3b1b5c59bf1&language=it-it`);
  }

  getMoviePosterPath(posterPath: string){
    return `https://image.tmdb.org/t/p/w185${posterPath}`;
  }

  getFavMovieByMovieId(movieId: number){
    return this.favourites.find(x => x.id === movieId);
  }

  openOneFav(content: any, data:any){
    this.singleFavourite = {
      id: data.id,
      comment: data.comment,
      userId: data.userId,
      movieId: data.movieId,
      rating: data.rating,
      title: data.title,
      poster_path: data.poster_path
    };

		this.modal.open(content);
  }

  openTemplAndSetMovieId(content: any, numID:number) {
    this.modal.open(content);
    this.movieID = numID;
  }

  openTempl(content: any){
    this.modal.open(content);
  }
  
  indexSaveToFindFilm(num: number){
    return this.num = num;
  }

}
