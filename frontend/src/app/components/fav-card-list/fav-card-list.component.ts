import { Component, OnInit , Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavMovieForDB } from 'src/models/favourite';
import { AuthService } from 'src/services/auth.service';
import { CommentService } from 'src/services/comment.service';
import { MovieAPIService } from 'src/services/movie-api.service';
import { MovieRootObject } from 'src/models/movie';
import { DataTransferService } from 'src/transfer-services/data-transfer.service';
import { FavoriteService } from 'src/services/favorite-like.service';

@Component({
  selector: 'app-fav-card-list',
  templateUrl: './fav-card-list.component.html',
  styleUrls: ['./fav-card-list.component.scss']
})
export class FavCardListComponent implements OnInit {
  @Input() movieElement: any;
  @Input() i: any;
  defaultText = 'bookmark';
  buttonText = this.defaultText;
  favMovieForDB!: FavMovieForDB;
  ordMovies: MovieRootObject[] = [];

  constructor(
    protected authServ: AuthService,
    protected movieServ: MovieAPIService,
    protected commentServ: CommentService,
    private favLikeServ: FavoriteService,
    private modal: NgbModal,
    private dataTransferService: DataTransferService) {
    }

  ngOnInit() {
    this.ordMovies = this.dataTransferService.getOrdMovies();
    this.favMovieForDB = {
      id: 0,
      createdAt: new Date(),
      favorite: false,
      like: false,
      userId: this.authServ.getCurrentUser().id,
      movieId: this.movieElement.id,
    };
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

  private prepareForNewFavoriteCreation(movieId: number): void {
    this.favMovieForDB.userId = this.authServ.getCurrentUser().id;
    this.favMovieForDB.movieId = movieId;
  }

}

