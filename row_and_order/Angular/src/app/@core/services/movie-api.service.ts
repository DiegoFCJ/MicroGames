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
  favouriteMovies: MovieRootObject[] = [];
  favListForCheck: FullFavData[] = [];
  favourites: FullFavData[] = [];
  singleFavourite: FullFavData = {
    id: 0,
    comment: '',
    userId: 0,
    movieId: 0,
    rating: 0,
    title: '',
    poster_path: ''
  }
  rating: number = 0;
  userNameLogged: string = '';
  currentRate: number = 6;
  movieID: number = 0;
  isHide = true;
  num: number = 0;
  choice!: number;
  commForm!: MovieData;
  dbFav!: FavData;
  dbComp!: MovieData;
  clickFavCheck: boolean = false;
  
  constructor(
    private router: Router, 
    private modalService: NgbModal, 
    protected authServ: AuthService, 
    private http: HttpClient, 
    protected favServ: FavouritesService) {}

  getCurrentMovie(){
    const user = JSON.parse(localStorage.getItem("movie") || "") as MovieRootObject;
  }
  
  open(content: any, numID:number) {
		this.modalService.open(content);
    this.movieID = numID;
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

		this.modalService.open(content);
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
  
  deleteFavourite(){
    this.http.delete<MovieData>(`http://localhost:5268/reviews/${this.singleFavourite.id}`).subscribe();
    window.location.reload()
  }

  saveFavourite(){
    this.dbFav = {
      userId: this.authServ.getCurrentUser().id,
      movieId: this.movieID
    }

    this.saveFavOnDb(this.dbFav).subscribe(item => { console.log(item) });
  }

  saveFavOnDb(fav: FavData){
    this.http.post<FavData>('http://localhost:5268/reviews', fav).subscribe();
    return this.http.post<FavData>('http://localhost:4567/favourite', fav);
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

  setFavouriteToZ(){
    this.favouriteMovies.length = 0;
    console.log(this.favouriteMovies)
  }

  getAllFavouriteMovies(id : number){

    this.http.get<FullFavData[]>(`http://localhost:5268/reviews/fromuser/${id}`)
    .subscribe((data) => {
      this.favourites = data;
      for(let i = 0; i < data.length; i++){
        this.http
        .get<MovieRootObject>(`https://api.themoviedb.org/3/movie/${data[i].movieId}?api_key=3949444e64e7a9355250d3b1b5c59bf1&language=en-en`)
        .subscribe((res) => {
            this.favourites[i] = {
              
              id: this.favourites[i].id,
              comment: this.favourites[i].comment,
              userId: this.favourites[i].userId,
              movieId: this.favourites[i].movieId,
              rating: this.favourites[i].rating,
              title: res.title,
              poster_path: res.poster_path
            }
        });
      }
      console.log(this.favourites)
    });
  }

  getFavouriteMovieByMovieId(id: number){
    return this.favourites.find(x => x.id === id);
  }

}
