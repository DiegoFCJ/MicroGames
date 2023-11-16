import { FavouriteService } from './../../../services/favourite.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MovieAPIService } from 'src/services/movie-api.service';
import { AlertsService } from 'src/mockup/alerts.service';
import * as Messages from 'src/const-messages/messages'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    protected authServ: AuthService, 
    protected movieServ: MovieAPIService,
    protected favServ: FavouriteService,
    private router: Router, 
    private alertServ: AlertsService) {}

    ngOnInit(): void {
      if (!this.authServ.isAuthenticated()) {
        this.alertServ.showAutoDestroyAlert(
          Messages.ICO_INFO,
          Messages.LOG_MUST,
          Messages.LOG_WARNING_NO_ACC,
          4000
        ).then(() => {
          return this.router.navigateByUrl(Messages.ROT_SIGN);
        });
      }
     this.getAllFavouriteMovies(this.authServ.getCurrentUser().id);
    }

    printStringIfNoFav(){
      if(this.movieServ.favourites === null){
        return this.alertServ.showAutoDestroyAlert(
          Messages.ICO_WARNING,
          Messages.TIT_WARNING,
          Messages.FAV_NOTPRESENT,
          4000
        )
      }else{
        return this.alertServ.showAutoDestroyAlert(
          Messages.ICO_INFO,
          Messages.TIT_INFO,
          Messages.FAV_ISPRESENT,
          2200
        )
      }
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
