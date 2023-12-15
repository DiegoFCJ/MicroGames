import { FavouriteService } from './../../../services/favourite.service';
import { Favourite } from './../../../models/favourite';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavMovie } from 'src/models/favourite';
import { MovieRootObject, MovieData } from 'src/models/movie';
import { AuthService } from 'src/services/auth.service';
import { MovieAPIService } from 'src/services/movie-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    protected authService: AuthService, 
    protected movieServ: MovieAPIService,
    protected favServ: FavouriteService,
    private router: Router) {}

    ngOnInit(): void {
      if (!this.authService.isAuthenticated()) {
       alert("Non puoi accedere a questa pagina senza permesso! Esegui l'accesso")
       this.router.navigateByUrl("/sign");
     }
     this.getAllFavouriteMovies(this.authService.getCurrentUser().id);

    }

    printStringIfNoFav(){
      if(this.movieServ.favourites === null){
        return "niente preferiti"
      }
      return "Questi sono i film che hai scelto come preferiti"
    }

    getAllFavouriteMovies(id : number){

      this.favServ.getAllFavouriteMovies(id).subscribe((data) => {
        this.movieServ.favourites = data;
        for(let i = 0; i < data.length; i++){
          this.movieServ.getMovie(data[i].movieId).subscribe((res) => {
            this.movieServ.favourites[i] = {
              id: this.movieServ.favourites[i].id,
              comment: this.movieServ.favourites[i].comment,
              userId: this.movieServ.favourites[i].userId,
              movieId: this.movieServ.favourites[i].movieId,
              rating: this.movieServ.favourites[i].rating,
              title: res.title,
              poster_path: res.poster_path
            }
          });
        }
      });
    }

    deleteFavourite(){
      this.favServ.deleteFavourite(this.movieServ.singleFavourite.id).subscribe();
      window.location.reload()
    }



}
