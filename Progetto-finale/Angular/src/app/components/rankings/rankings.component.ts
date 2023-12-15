import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { RankingService } from 'src/app/@core/services/ranking.service';
import { Ranking } from 'src/app/models/ranking';
import { User } from 'src/app/models/user';

@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  users: Partial<User> [] = [];
  rankings: Partial<Ranking>[] = [];
  bestRanking: Partial<Ranking>[] = [];
  currentUser = this.authService.getCurrentUser();

  constructor(private rankingService: RankingService, private authService: AuthService) { }

  ngOnInit(): void {
    let userId = this.currentUser.id;
    this.rankingService.getRanking(userId).subscribe({
      next: (res) => {
        this.rankings = res;
        console.log(res);
        this.descendingOrderRankings();
      }
    });
  }

  descendingOrderRankings() {
    this.rankings?.sort((a, b) => {
      if (a.gamePoints != undefined && b.gamePoints != undefined) {
        if (b.gamePoints > a.gamePoints) {
          return 1;
        }
        if (b.gamePoints < a.gamePoints) {
          return -1;
        }
        return 0;
      }
      else return 0;
    });

    for (let i = 0; i < 10; ++i) {
      this.bestRanking.push(this.rankings[i]);
      this.authService.getUserById(this.bestRanking[i].userId);
    }
    console.log(this.bestRanking);
    
    for (let i = 0; i < 10; ++i) {
      this.authService.getUserById(this.bestRanking[i].userId).subscribe({
        next: (res) => {
          this.users [i] = res;
        }
      });
    }
    console.log(this.users);
  }

}
