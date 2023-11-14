import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavMovie } from 'src/models/favourite';
import { MovieData } from 'src/models/movie';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) { }

  getAllFavouriteMovies(id : number){
    return this.http.get<FavMovie[]>(`http://localhost:5268/reviews/fromuser/${id}`);
  }

  deleteFavourite(commentId: number){
    return this.http.delete<MovieData>(`http://localhost:5268/reviews/${commentId}`);
  }
}
