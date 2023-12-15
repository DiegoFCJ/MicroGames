import { FullFavData } from './../../models/movieData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavData, MovieData } from 'src/app/models/movieData';
import { MovieRootObject } from 'src/app/models/movies';
import { ScoreInfo } from 'src/app/models/user';
import { AuthService } from './auth.service';
import { FavouritesService } from './favourites.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieAPIService {
  randomMovies: MovieRootObject[] = [];
  ordMovies: MovieRootObject[] = [];

  rating: number = 0;
  userNameLogged: string = '';
  currentRate: number = 0;
  movieID!: number;
  isHide = true;
  num: number = 0;
  choice!: number;
  commForm!: MovieData;

  dbFav!: FavData;
  dbComp!: MovieData;

  favListForCheck: FullFavData[] = [];
  lengthOfArr:number = 200;


  constructor(private router: Router, private modalService: NgbModal, protected authServ: AuthService, private http: HttpClient, protected favServ: FavouritesService) {}


  getCurrentMovie(){
    const user = JSON.parse(localStorage.getItem("movie") || "") as MovieRootObject;
  }
  
  open(content: any, numID:number) {
		this.modalService.open(content);
    this.movieID = numID;
	}

  justOpenTempl(content: any){
		this.modalService.open(content);
  }

  onSubmit(e: NgForm) {

    this.dbComp = {
      comment: e.form.value.comment,
      rating: e.form.value.rating,
      movieId: this.movieID,
      userId: this.authServ.getCurrentUser().id
    }
    this.http.post<MovieData>('http://localhost:5268/reviews', this.dbComp).subscribe(); 
    }

    saveFavourite(){
      this.dbFav = {
        userId: this.authServ.getCurrentUser().id,
        movieId: this.movieID
      }

      this.favServ.saveFavOnDb(this.dbFav).subscribe(item => { console.log(item) });
    }

  numChange(num: number){
      return this.num = num;
  }

  adultsFilm(isAdultFilm: boolean){
    if(isAdultFilm){
      return "This film is for adults only! 🔞";
    }else{
      return "You can watch this film with your family ✅";
    }
  }

  getRandomMovie() {
    const latestId = 30000;
    const randomId = Math.round(Math.random() * latestId);

    this.getMovieById(randomId).subscribe({
      next: (res) => {

        if (res.poster_path !== null) {
          this.randomMovies.push(res);

          this.ordMovies.push(res);
          this.ordMovies.sort((a, b) => a.release_date > b.release_date? 1: b.release_date > a.release_date? -1: 0)
        } else {
          this.getRandomMovie();
        }
      },
      error: () => {
        this.getRandomMovie();
      }
    });
  }

  getMovieById(id: number){
    return this.http.get<MovieRootObject>(`https://api.themoviedb.org/3/movie/${id}?api_key=3949444e64e7a9355250d3b1b5c59bf1&language=en-en`);
  }

  checkResult(){
    
    this.router.navigate(['/review-page']);
    for( let i = 0; i < 10; i++){
      if(this.randomMovies[i] === this.ordMovies[i]){
        this.rating = this.rating +10;
      }
    }

    let scoreComp: ScoreInfo = {
      userId: this.authServ.getCurrentUser().id,
      userName: this.authServ.getCurrentUser().username,
      score: this.rating

    }

    this.http.post<ScoreInfo>(`http://localhost:4567/score`, scoreComp).subscribe(); 
  }
}
