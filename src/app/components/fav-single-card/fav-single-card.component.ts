import { Component, OnInit, Input } from '@angular/core';
import { FavMovieForDB } from 'src/models/favourite';
import { MovieRootObject } from 'src/models/movie';
import { AuthService } from 'src/services/auth.service';
import { DataTransferService } from 'src/transfer-services/data-transfer.service';
import { FavoriteService } from 'src/services/favorite-like.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Messages from 'src/const-messages/messages';

@Component({
  selector: 'app-fav-single-card',
  templateUrl: './fav-single-card.component.html',
  styleUrls: ['./fav-single-card.component.scss']
})
export class FavSingleCardComponent implements OnInit {
  @Input() buttonText: any;
  @Input() defaultText: any;
  @Input() movieElement: any;
  @Input() c!: Function;
  @Input() d!: Function;
  @Input() i: any;
  @Input() favMovieForDB!: FavMovieForDB;
  ordMovies: MovieRootObject[] = [];
  currentRate = 0;

  constructor(
    private dataTransferService: DataTransferService,
    private favLikeServ: FavoriteService, 
    private modal: NgbModal,
    protected authServ: AuthService) { }

  ngOnInit(): void {
    this.ordMovies = this.dataTransferService.getOrdMovies();
  }

  openTemplAndSetMovieId(content: any, movieId: number) {
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

    this.modal.open(content);
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

  private prepareForNewFavoriteCreation(movieId: number): void {
    this.favMovieForDB.userId = this.authServ.getCurrentUser().id;
    this.favMovieForDB.movieId = movieId;
  }
}
