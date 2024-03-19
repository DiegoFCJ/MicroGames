import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavMovie, FavMovieForDB } from 'src/models/favourite';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  port: string = "8096";
  type: string = "/api/favouriteAndLike";
  springBootUrl: string = environment.APIEndpoint + this.port + this.type;

  constructor(private http: HttpClient) { }

  getAllFavoriteMovies(userId : number){
    return this.http.get<FavMovie[]>(`${this.springBootUrl}/findByUserId?userId=${userId}`);
  }

  createFavorite(fav: FavMovieForDB){
    return this.http.post<FavMovieForDB>(`${this.springBootUrl}/create`, fav);
  }

  readByUserIdAndMovieId(userId: number, movieId: number): Observable<FavMovieForDB> {
    return this.http.get<FavMovieForDB>(`${this.springBootUrl}/readByUserIdAndMovieId?userId=${userId}&movieId=${movieId}`);
  }

  updateFavorite(fav: FavMovieForDB){
    return this.http.put<FavMovieForDB>(`${this.springBootUrl}/update`, fav);
  }

  deleteFavorite(id: number){
    return this.http.delete(`${this.springBootUrl}/delete?id=${id}`);
  }
}
