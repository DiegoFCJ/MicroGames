import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MovieService } from 'src/app/@core/services/movie.service';
import { RankingService } from 'src/app/@core/services/ranking.service';
import { Criterion, Movie } from 'src/app/models/movie';
import { Ranking } from 'src/app/models/ranking';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'tnv-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private movieService: MovieService, private rankingService: RankingService, private authService: AuthService) { }

  movies = this.movieService.movies;
  movie: Partial<Movie> = {};
  orderedMovies: Partial<Movie>[] = [];
  criterion: Criterion = { label: "", key: '' };
  currentUserId = this.authService.getCurrentUser().id;
  imageBaseUrl: string = "https://image.tmdb.org/t/p/w440_and_h660_face"
  game = false;
  results = false;


  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.movieService.getRandomMovie(index);
    }
    this.criterion = this.movieService.getRandomCriterion();
    console.log(this.criterion.key);
  }

  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    console.log(this.movies);
  }

  showGame() {
    this.game = !this.game;
  }


  startGame() {
    for (let i = 0; i < 10; i++) {
      this.orderedMovies.push(this.movieService.movies[i]);
    }

    for (let i = 0; i < 10; i++) {
      console.log(this.orderedMovies[i]);
    }

    this.descendingOrder(this.criterion.key)

    for (let i = 0; i < 10; i++) {
      console.log(this.orderedMovies[i]);
    }
  }

  finish(form: NgForm) {
    console.log(this.orderedMovies);
    console.log(this.movies);
    let points: number = 0;
    for (let i = 0; i < 10; i++) {
      if (this.orderedMovies[i] == this.movies[i]) {
        points = points + 10;
      }
    }
    this.rankingService.createRanking({ userId: this.currentUserId, gamePoints: points }).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

  descendingOrder(criterion: string) {
    this.orderedMovies?.sort((a: any, b: any) => {
      if (a[criterion] != undefined && b[criterion] != undefined) {
        if (b[criterion] > a[criterion]) {
          return 1;
        }
        if (b[criterion] < a[criterion]) {
          return -1;
        }
        return 0;
      }
      else return 0;
    });
  }
}