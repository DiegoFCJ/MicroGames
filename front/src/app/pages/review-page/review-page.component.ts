import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieAPIService } from 'src/services/movie-api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';
import { CommentService } from 'src/services/comment.service';
import { AlertsService } from 'src/mockup/alerts.service';
import * as Messages from 'src/const-messages/messages'
import { Comment } from 'src/models/comment';
import { RatingService } from 'src/services/rating.service';
import { Rating } from 'src/models/rating';
import { FavoriteService } from 'src/services/favorite-like.service';
import { FavMovieForDB } from 'src/models/favourite';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ReviewPageComponent implements OnInit {
  currentRate = 0;
  defaultText = 'bookmark';
  buttonText = this.defaultText;
  commentForDB!: Comment;
  changeLike: boolean = false;
  rateForDB!: Rating;
  favMovieForDB!: FavMovieForDB;

  constructor(
    config: NgbModalConfig, 
    protected authServ: AuthService, 
    protected movieServ: MovieAPIService, 
    protected commentServ: CommentService, 
    private router: Router,
    private alertServ: AlertsService,
    private rateServ: RatingService,
    private favLikeServ: FavoriteService) { 
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit(): void {
    if (!this.authServ.isAuthenticated()) {
      this.showMustLogAlertAndRedirect();
    }
  }

  adultsFilm(isAdultFilm: boolean){
    if(isAdultFilm){
      return Messages.ADULLT_YES;
    }else{
      return Messages.ADULT_NO;
    }
  }

  playAgain(){
    this.movieServ.ordMovies.length = 0;
    this.movieServ.rating = 0;
    this.router.navigateByUrl(Messages.ROT_GAME);
  }

  saveRating(f: NgForm){
    if(f.valid){
      this.rateForDB = {
        createdAt: new Date(),
        rate: f.form.value.rating,
        movieId: this.movieServ.movieID,
        userId: this.authServ.getCurrentUser().id
      }

      this.rateServ.saveRate(this.rateForDB).subscribe();
    }
  }

  openTemplAndSetMovieId(content: any, movieId:number){
    this.favMovieForDB = {
      id: 0,
      createdAt: new Date(),
      favorite: false,
      like: false,
      userId: this.authServ.getCurrentUser().id,
      movieId: movieId
    };
    
    this.favLikeServ.readByUserIdAndMovieId(this.authServ.getCurrentUser().id, movieId).subscribe(res => {
    
      if (res !== null) {
        console.log(res);
        this.favMovieForDB = res;
    
        if (res.favorite || res.like) {
          if (res.favorite) {
            this.buttonText = 'bookmark_added';
          }
    
          if (res.like) {
            this.favMovieForDB.like = true;
          }
        }
      } else {
        this.buttonText = this.defaultText;
        // Il DTO è vuoto
        this.favMovieForDB.userId = this.authServ.getCurrentUser().id;
        this.favMovieForDB.movieId = movieId;
      }
    }); 
    
    this.movieServ.openTemplAndSetMovieId(content, movieId);
  }

  saveCommentFromForm(el: NgForm) {
    if (el.valid) {
      this.prepareCommentForSaving(el);
      this.commentServ.saveComment(this.commentForDB).subscribe();
    }
  }

  saveFavourite(movieId: number): void {
    if (!this.favMovieForDB.favorite) {
      this.handleFavoriteSaving(movieId);
    } else {
      this.handleAlreadyFavorited();
    }
  }

  like(movieId: number){
    if(this.favMovieForDB.like){
      this.favMovieForDB.like = false;
    }else{
      this.favMovieForDB.like = true;
    }
  }

  private showMustLogAlertAndRedirect(): void {
    this.alertServ.showAutoDestroyAlert(
      Messages.ICO_INFO,
      Messages.LOG_MUST,
      Messages.LOG_WARNING_NO_ACC,
      4000
    );
    this.router.navigateByUrl(Messages.ROT_SIGN);
  }

  private prepareCommentForSaving(el: NgForm): void {
    this.commentForDB = {
      username: this.authServ.getCurrentUser().username,
      createdAt: new Date(),
      comment: el.form.value.comment,
      movieId: this.movieServ.movieID,
      userId: this.authServ.getCurrentUser().id,
    };
  }

  private handleFavoriteSaving(movieId: number): void {
    this.favLikeServ.readByUserIdAndMovieId(this.authServ.getCurrentUser().id, movieId).subscribe({
      next: (res) => {
        this.buttonText = 'bookmark_added';
        if (res) {
          this.updateExistingFavorite(res);
        } else {
          this.createNewFavorite(movieId);
        }
      },
      error: (res) => {
        this.prepareForNewFavoriteCreation(movieId);
      },
    });
  }

  private updateExistingFavorite(res: FavMovieForDB): void {
    this.favMovieForDB = res;
    this.favMovieForDB.favorite = true;
    this.favLikeServ.updateFavorite(this.favMovieForDB).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error),
    });
  }

  private createNewFavorite(movieId: number): void {
    this.favMovieForDB = {
      id: 0,
      createdAt: new Date(),
      favorite: true,
      like: false,
      userId: this.authServ.getCurrentUser().id,
      movieId: movieId,
    };
    this.favLikeServ.createFavorite(this.favMovieForDB).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error),
    });
  }

  private prepareForNewFavoriteCreation(movieId: number): void {
    this.favMovieForDB.userId = this.authServ.getCurrentUser().id;
    this.favMovieForDB.movieId = movieId;
  }

  private handleAlreadyFavorited(): void {
    this.buttonText = 'bookmark_added';
  }
}


/*


  private updateExistingFL(res: FavMovieForDB): void {
    this.favLikeServ.updateFavorite(this.favMovieForDB).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error),
    });
  }

  private createNewFL(movieId: number): void {
    this.favMovieForDB.id = 0;
    this.favMovieForDB.createdAt = new Date();
    this.favMovieForDB.userId = this.authServ.getCurrentUser().id;
    this.favMovieForDB.movieId = movieId;

    this.favLikeServ.createFavorite(this.favMovieForDB).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error),
    });
  }
  
  private handleAlreadyLiked(): void {
    this.buttonText = 'bookmark_added';
  }

  private handleLikeSaving(movieId: number): void {
    this.favLikeServ.readByUserIdAndMovieId(this.authServ.getCurrentUser().id, movieId).subscribe({
      next: (res) => {
        this.buttonText = 'bookmark_added';
        if (res) {
          this.favMovieForDB = res;
          this.favMovieForDB.favorite = true;
          this.updateExistingFL(res);
        } else {
          this.favMovieForDB.favorite = true;
          this.favMovieForDB.like = false;
          this.createNewFL(movieId);
        }
      },
      error: (res) => {
        this.prepareForNewFavoriteCreation(movieId);
      },
    });
  }*/