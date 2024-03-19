import { UserFull } from '../../../models/user';
import { AuthService } from 'src/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MovieRootObject } from 'src/models/movie';
import { MovieAPIService } from 'src/services/movie-api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ScoreService } from 'src/services/score.service';
import { ScoreDTO } from 'src/models/score';
import { AlertsService } from 'src/mockup/alerts.service';
import * as Messages from 'src/const-messages/messages';
import { DataTransferService } from 'src/transfer-services/data-transfer.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  attributes = [Messages.ORD_REVENUE_ENG, Messages.ORD_RELEASE_ENG, Messages.ORD_POPULARITY_ENG];
  stringCondPrint: string = "";
  currentUser: Partial<UserFull> = this.authServ.getCurrentUser();
  randomMovies: MovieRootObject[] = [];
  arrayDim: number = 10;
  scoreForDB!: ScoreDTO;
  attribute: any;
  rating: number = 0;
  private ordMovies: MovieRootObject[] = [];

  constructor(
    protected movieServ: MovieAPIService,
    private router: Router,
    protected authServ: AuthService,
    protected scoreServ: ScoreService,
    private alertServ: AlertsService,
    private dataTransferService: DataTransferService
  ) {}

  ngOnInit(): void {
    if (!this.authServ.isAuthenticated()) {
      this.alertServ.showAutoDestroyAlert(
        Messages.ICO_INFO,
        Messages.LOG_MUST,
        Messages.LOG_WARNING_NO_ACC,
        4000
      );
      this.router.navigateByUrl(Messages.ROT_SIGN);
    } else {
      this.attribute = this.attributes[Math.floor(Math.random() * this.attributes.length)];

      for (let i = 0; i < this.arrayDim; i++) {
        this.getRandomMovie(this.attribute);
      }
    }
  }

  getRandomMovie(attributeS: any) {
    const latestId = 30000;
    const randomId = Math.round(Math.random() * latestId);

    this.movieServ.getMovie(randomId).subscribe({
      next: (res) => {
        if (res.poster_path) {
          this.randomMovies.push(res);
          this.ordMovies.push(res);
          this.ordMovies.sort((a: any, b: any) =>
            a[attributeS] > b[attributeS] ? 1 : b[attributeS] > a[attributeS] ? -1 : 0
          );
        } else {
          this.getRandomMovie(attributeS);
        }
      },
      error: () => {
        this.getRandomMovie(attributeS);
      },
    });
  }

  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    moveItemInArray(this.randomMovies, event.previousIndex, event.currentIndex);
  }

  checkResult() {
    for (let i = 0; i < this.arrayDim; i++) {
      if (this.randomMovies[i] === this.ordMovies[i]) {
        this.rating = this.rating + 10;
        this.ordMovies[i].isCorrect = true;
      }
    }

    this.dataTransferService.setRating(this.rating);
    this.dataTransferService.setOrdMovies(this.ordMovies);

    let user = this.authServ.getCurrentUser();

    this.scoreForDB = {
      createdAt: new Date(),
      score: this.rating,
      user: {
        id: user.id,
        username: user.username,
      },
    };

    console.log(this.scoreForDB);

    this.scoreServ.saveNewScore(this.scoreForDB).subscribe({
      next: () => {
        this.alertServ.showSuccessAlertWithTit(Messages.SCORE_SUCCESS, Messages.SCORE_SUCCESS_INFO);
      },
      error: (error) => {
        this.alertServ.showErrorAlert(Messages.SCORE_ERR + error);
      },
    });

    this.router.navigateByUrl(Messages.ROT_REVIEW);
  }

  printGameType() {
    if (this.attribute === Messages.ORD_RELEASE_ENG) {
      this.stringCondPrint = Messages.ORD_RELEASE_OLDER;
      return Messages.ORD_RELEASE_ITA;
    } else if (this.attribute === Messages.ORD_REVENUE_ENG) {
      this.stringCondPrint = Messages.ORD_REVENUE_LESS;
      return Messages.ORD_REVENUE_ITA;
    }
    this.stringCondPrint = Messages.ORD_POPULARITY_LESS;
    return Messages.ORD_POPULARITY_ITA;
  }
}
