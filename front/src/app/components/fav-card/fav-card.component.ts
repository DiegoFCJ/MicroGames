import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/mockup/alerts.service';
import { FavMovieForDB } from 'src/models/favourite';
import { Rating } from 'src/models/rating';
import { AuthService } from 'src/services/auth.service';
import { CommentService } from 'src/services/comment.service';
import { FavoriteService } from 'src/services/favorite-like.service';
import { MovieAPIService } from 'src/services/movie-api.service';
import { RatingService } from 'src/services/rating.service';
import * as Messages from 'src/const-messages/messages';
import { Comment } from 'src/models/comment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fav-card',
  templateUrl: './fav-card.component.html',
  styleUrls: ['./fav-card.component.scss']
})
export class FavCardComponent implements OnInit {
  @Input() movieElement: any; // Input per passare dati dal componente padre al componente figlio
  @Input() i: any; // Input per passare dati dal componente padre al componente figlio
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
  }
  
  adultsFilm(isAdultFilm: boolean) {
    return isAdultFilm ? Messages.ADULLT_YES : Messages.ADULT_NO;
  }

  saveRating(f: NgForm) {
    if (f.valid) {
      this.rateForDB = {
        createdAt: new Date(),
        rate: f.form.value.rating,
        movieId: this.movieServ.movieID,
        userId: this.authServ.getCurrentUser().id,
      };

      this.rateServ.saveRate(this.rateForDB).subscribe();
    }
  }

  openTemplAndSetMovieId(content: any, movieId: number) {
    this.favMovieForDB = {
      id: 0,
      createdAt: new Date(),
      favorite: false,
      like: false,
      userId: this.authServ.getCurrentUser().id,
      movieId: movieId,
    };

    this.favLikeServ.readByUserIdAndMovieId(this.authServ.getCurrentUser().id, movieId).subscribe((res) => {
      if (res !== null) {
        this.favMovieForDB = res;
        if (res.favorite || res.like) {
          if (res.favorite) {
            this.buttonText = 'bookmark_added';
            this.favMovieForDB.favorite = true;
          }
          if (res.like) {
            this.favMovieForDB.like = true;
          }
        }
      } else {
        this.buttonText = this.defaultText;
        this.prepareForNewFavoriteCreation(movieId);
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

  like(movieId: number): void {
    this.favLikeServ.readByUserIdAndMovieId(this.authServ.getCurrentUser().id, movieId).subscribe({
      next: (res) => {
        if (res) {
          if (res.like) {
            this.handleUnlike(res);
          } else {
            this.handleLike(res);
          }
        } else {
          this.handleNewLike(movieId);
        }
      },
      error: (error) => {
        this.prepareForNewFavoriteCreation(movieId);
      },
    });
  }

  favorite(movieId: number): void {
    this.favLikeServ.readByUserIdAndMovieId(this.authServ.getCurrentUser().id, movieId).subscribe({
      next: (res) => {
        if (res) {
          if (res.favorite) {
            this.handleUnFavorite(res);
          } else {
            this.handleFavorite(res);
          }
        } else {
          this.handleNewFavorite(movieId);
        }
      },
      error: (res) => {
        this.prepareForNewFavoriteCreation(movieId);
      },
    });
  }

  private handleUnlike(res: FavMovieForDB): void {
    this.favMovieForDB = res;
    this.favMovieForDB.like = false;

    if (res.favorite) {
      this.updateExistingLike(res);
    } else {
      this.favLikeServ.deleteFavorite(res.id).subscribe((response) => console.log(response));
    }
  }

  private handleUnFavorite(res: FavMovieForDB): void {
    this.buttonText = this.defaultText;
    this.favMovieForDB = res;
    this.favMovieForDB.favorite = false;

    if (res.like) {
      this.updateExistingFavorite(res);
    } else {
      this.favLikeServ.deleteFavorite(res.id).subscribe((response) => console.log(response));
    }
  }

  private handleLike(res: FavMovieForDB): void {
    this.favMovieForDB = res;
    this.favMovieForDB.like = true;
    this.updateExistingLike(res);
  }

  private handleFavorite(res: FavMovieForDB): void {
    this.buttonText = 'bookmark_added';
    this.favMovieForDB = res;
    this.favMovieForDB.favorite = true;
    this.updateExistingFavorite(res);
  }

  private updateExistingLike(updatedFavMovie: FavMovieForDB): void {
    this.favLikeServ.updateFavorite(updatedFavMovie).subscribe((response) => console.log(response));
  }

  private updateExistingFavorite(res: FavMovieForDB): void {
    this.favLikeServ.updateFavorite(this.favMovieForDB).subscribe((response) => console.log(response));
  }

  private handleNewLike(movieId: number): void {
    this.favMovieForDB.favorite = false;
    this.favMovieForDB.like = true;
    this.createNewLike(movieId);
  }

  private handleNewFavorite(movieId: number): void {
    this.buttonText = 'bookmark_added';
    this.favMovieForDB.favorite = true;
    this.favMovieForDB.like = false;
    this.createNewFavorite(movieId);
  }

  private createNewLike(movieId: number): void {
    this.favMovieForDB = {
      id: 0,
      createdAt: new Date(),
      favorite: false,
      like: true,
      userId: this.authServ.getCurrentUser().id,
      movieId: movieId,
    };
    this.favLikeServ.createFavorite(this.favMovieForDB).subscribe((response) => console.log(response));
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
    this.favLikeServ.createFavorite(this.favMovieForDB).subscribe((response) => console.log(response));
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

  private prepareForNewFavoriteCreation(movieId: number): void {
    this.favMovieForDB.userId = this.authServ.getCurrentUser().id;
    this.favMovieForDB.movieId = movieId;
  }

}

