import { Component, OnInit, Output } from '@angular/core';
import { FavoriteMovie, Movie } from 'src/app/models/movie';
import { Input } from '@angular/core';
import { MovieService } from 'src/app/@core/services/movie.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'tnv-favorite-movie-item',
  templateUrl: './favorite-movie-item.component.html',
  styleUrls: ['./favorite-movie-item.component.scss']
})
export class FavoriteMovieItemComponent implements OnInit {

  @Input() movieUserIdList: Partial<FavoriteMovie> [] = [];
  @Input() movieList: Partial<Movie>[] = [];
  @Input() movie: Partial<Movie> = {};


  imageBaseUrl: string = "https://image.tmdb.org/t/p/w440_and_h660_face"

  constructor(private authService: AuthService, private movieService: MovieService) { }

  currentUser: Partial<User> = {};

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  onSubmit(form: NgForm) {
    const userId = this.currentUser.id;
    this.movieService.deleteFavorite(userId, this.movie.id).subscribe({
      next: (res) => {
      console.log(res);
      window.location.reload();
      }
  });
}

}

