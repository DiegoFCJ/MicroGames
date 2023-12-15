import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MovieService } from 'src/app/@core/services/movie.service';
import { RankingService } from 'src/app/@core/services/ranking.service';
import { Ranking } from 'src/app/models/ranking';

@Component({
  selector: 'tnv-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss']
})
export class EndGameComponent implements OnInit {

  constructor(private movieService: MovieService, private authService: AuthService, public rankingService: RankingService) { }

  movies = this.movieService.movies;
  currentUser = this.authService.getCurrentUser();
  rankingUser: Partial<Ranking> = {};

  ngOnInit(): void {
    let userId = this.currentUser.id
    this.rankingService.getRankingByUserId(userId).subscribe({
      next: (res) => {
        this.rankingUser = res;
        console.log(res);
      }
    });
  }

}
