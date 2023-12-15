import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criterion, FavoriteMovie, Movie } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  dotnetBaseUrl : string = "https://localhost:7024/api/review"
  nodeBaseUrl: String = "http://localhost:1234/api";
  APIKey : string = "api_key=0f19618cdb7bc8cd3529c739a1455e1a"

  movies: Partial<Movie>[] = [];
  criterion: Criterion = {} as Criterion;

  constructor(private httpClient: HttpClient) { }

  getRandomMovie(index: number) {
    // Per determinare questo valore facciamo eventualmente una query su movies/latest per avere l'id dell'ultimo Film inserito su TMDB
    const latestId = 30000;
    const randomId = Math.round(Math.random() * latestId);
    
      this.httpClient
      .get(
        `https://api.themoviedb.org/3/movie/${randomId}?${this.APIKey}&language=it-it`
      )
      .subscribe({
        // Qui non usate any ovviamente, ma create l'interfaccia typescript per la response
        next: (res: Partial<Movie>) => {
          console.log('ID trovato', randomId);
          if (res.poster_path) {
            this.movies[index] = res;
          } else {
            console.log('Film senza poster');
            this.getRandomMovie(index);
          }
        },
        error: () => {
          console.log('ID non esistente, retry!', randomId);
          this.getRandomMovie(index);
        },
      });
  }

  getRandomCriterion(){
    const latestCriterion = 4;
    const coin = Math.round(Math.random() * latestCriterion);
  
    switch(coin){
      case 0:
        this.criterion = {label: "all' anno di uscita", key: `release_date`};
        break;
      case 1:
        this.criterion = {label: "alla media voto data dagli utenti", key: 'vote_average'};
        break;
      case 2:
        this.criterion = {label: "alla durata", key: 'runtime'};
        break;
      case 3:
        this.criterion = {label: "al budget", key: 'budget'};
        break;
      case 4:
        this.criterion = {label: "agli incassi", key: 'revenue'};
        break;
    }

    return this.criterion;
  }

  getMovie(movieId: number | undefined) {
    return this.httpClient.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}?${this.APIKey}&language=it-it`);
  }
  
  getFavoriteByUserId(userId: number | undefined){
    return this.httpClient.get<FavoriteMovie[]>(`${this.nodeBaseUrl}/favorite/${userId}`);
  }
  
  createFavorite(movie: FavoriteMovie){
    return this.httpClient.post<FavoriteMovie>(`${this.nodeBaseUrl}/favorite`, movie); 
  }
  
  deleteFavorite(userId: number | undefined, movieId: number | undefined){
    return this.httpClient.delete<FavoriteMovie>(`${this.nodeBaseUrl}/favorite/${userId}/${movieId}`); 
  }
}
      
