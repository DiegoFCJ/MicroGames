// Import dei moduli Angular e dei servizi necessari
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { MovieAPIService } from 'src/services/movie-api.service';
import { FavoriteService } from '../../../services/favorite-like.service';
import { FavMovie, FavMovieForDB } from 'src/models/favourite';
import { MovieRootObject } from 'src/models/movie';
import { CommentService } from 'src/services/comment.service';
import { DataTransferService } from 'src/transfer-services/data-transfer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() movieElement: any;
  @Input() i: any;
  defaultText = 'bookmark';
  buttonText = this.defaultText;
  favMovies: any[] = [];

  constructor(
    protected authServ: AuthService,
    protected movieServ: MovieAPIService,
    protected commentServ: CommentService,
    private favLikeServ: FavoriteService) {
    }

  ngOnInit() {
    this.retrieveFavorites(1);
  }
  
  retrieveFavorites(userId: number) {
    this.favLikeServ.getAllFavoriteMovies(userId).subscribe({
      next: (res) => {
        if(res){
          this.favMovies = res;
        }
      },
      error(err) {
      },
    });
  }

}