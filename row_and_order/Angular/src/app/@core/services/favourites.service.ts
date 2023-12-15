import { AuthService } from 'src/app//@core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavData, FullFavData } from 'src/app/models/movieData';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favourites: FullFavData[] = [];
  
  constructor(private http: HttpClient, protected authServ: AuthService) { }

  fetchAllFavourites(id : number){

    this.getAllFavById(id).subscribe((data) => {
      this.favourites = data;
      console.log(this.favourites)
    });

  }

  getAllFavById(userId: number){
    return this.http.get<FullFavData[]>(`http://localhost:5268/reviews/fromuser/${userId}`)
  }

  saveFavOnDb(fav: FavData){
    return this.http.post<FavData>('http://localhost:4567/favourite', fav);
  }
}

