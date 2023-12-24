import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieAPIService } from 'src/services/movie-api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';
import { CommentService } from 'src/services/comment.service';
import { AlertsService } from 'src/mockup/alerts.service';
import * as Messages from 'src/const-messages/messages'
import { Comment } from 'src/models/comment';
import { RatingService } from 'src/services/rating.service';
import { Rating } from 'src/models/rating';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ReviewPageComponent implements OnInit {
  currentRate = 0;
  defaultText = 'bookmark';
  buttonText = this.defaultText;
  commentForDB!: Comment;
  changeLike: boolean = false;
  rateForDB!: Rating;

  constructor(
    config: NgbModalConfig, 
    protected authServ: AuthService, 
    protected movieServ: MovieAPIService, 
    protected commentServ: CommentService, 
    private router: Router,
    private alertServ: AlertsService,
    private rateServ: RatingService) { 
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit(): void {
    if (!this.authServ.isAuthenticated()) {
      this.alertServ.showAutoDestroyAlert(
        Messages.ICO_INFO,
        Messages.LOG_MUST,
        Messages.LOG_WARNING_NO_ACC,
        4000
      );
      this.router.navigateByUrl(Messages.ROT_SIGN);
    }
  }

  saveCommentFromForm(el: NgForm) {
    if(el.valid){

      this.commentForDB = {
        username: this.authServ.getCurrentUser().username,
        createdAt: new Date(), 
        comment: el.form.value.comment,
        movieId: this.movieServ.movieID,
        userId: this.authServ.getCurrentUser().id
      }
  
      this.commentServ.saveComment(this.commentForDB).subscribe(); 
    }
  }

  adultsFilm(isAdultFilm: boolean){
    if(isAdultFilm){
      return Messages.ADULLT_YES;
    }else{
      return Messages.ADULT_NO;
    }
  }

  playAgain(){
    this.movieServ.ordMovies.length = 0;
    this.movieServ.rating = 0;
    this.router.navigateByUrl(Messages.ROT_GAME);
  }

  saveFavourite(): void {
    this.buttonText = 'bookmark_added'; // Cambio temporaneo del testo
    setTimeout(() => {
      this.buttonText = this.defaultText; // Ripristino del testo predefinito
    }, 1000);
  }

  like(){
    if(this.changeLike){
      this.changeLike = false;
    }else{
      this.changeLike = true;
    }
  }

  saveRating(f: NgForm){
    if(f.valid){
      this.rateForDB = {
        createdAt: new Date(),
        rate: f.form.value.rating,
        movieId: this.movieServ.movieID,
        userId: this.authServ.getCurrentUser().id
      }

      this.rateServ.saveRate(this.rateForDB).subscribe();
    }
  }
}
