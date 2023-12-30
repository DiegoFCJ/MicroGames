import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MovieAPIService } from 'src/services/movie-api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';
import { CommentService } from 'src/services/comment.service';
import { AlertsService } from 'src/mockup/alerts.service';
import * as Messages from 'src/const-messages/messages';


@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ReviewPageComponent implements OnInit {

  constructor(
    protected authServ: AuthService,
    protected movieServ: MovieAPIService,
    protected commentServ: CommentService,
    private router: Router,
    private alertServ: AlertsService
  ) {
  }
  
ngOnInit(): void {
  if(this.movieServ.ordMovies.length === 0){
    this.playAgain();
  }
  this.checkBrowserBack();
  if (!this.authServ.isAuthenticated()) {
    this.showMustLogAlertAndRedirect();
  }
}

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event): void {
    this.movieServ.ordMovies.length = 0;
  }

  private checkBrowserBack(): void {
    const previousUrl = window.history.state.navigationId > 1 ? window.history.state.url : '';
  
    window.onpopstate = (event) => {
      const currentUrl = window.history.state.navigationId > 1 ? window.history.state.url : '';
  
      if (event && previousUrl !== currentUrl) {
        this.movieServ.ordMovies.length = 0;
        window.location.reload();
      }
    };
  }

  private showMustLogAlertAndRedirect(): void {
    this.alertServ.showAutoDestroyAlert(Messages.ICO_INFO, Messages.LOG_MUST, Messages.LOG_WARNING_NO_ACC, 4000);
    this.router.navigateByUrl(Messages.ROT_SIGN);
  }

  playAgain() {
    this.movieServ.ordMovies.length = 0;
    this.movieServ.rating = 0;
    this.router.navigateByUrl(Messages.ROT_GAME);
  }
}