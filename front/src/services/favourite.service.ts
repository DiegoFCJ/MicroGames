import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavMovie } from 'src/models/favourite';
import { Comment } from 'src/models/comment';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  port: string = "8095";
  type: string = "/api/favourites";
  springBootUrl: string = environment.APIEndpoint + this.port + this.type;

  constructor(private http: HttpClient) { }

  getAllFavouriteMovies(id : number){
    return this.http.get<FavMovie[]>(`${this.springBootUrl}/fromuser/${id}`);
  }

  deleteFavourite(commentId: number){
    return this.http.delete<Comment>(`${this.springBootUrl}favourites/${commentId}`);
  }
}
