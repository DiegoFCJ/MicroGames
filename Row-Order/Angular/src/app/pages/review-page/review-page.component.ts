import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieAPIService } from 'src/services/movie-api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';
import { CommentService } from 'src/services/comment.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ReviewPageComponent implements OnInit {
  currentRate = 2;

  constructor(
    config: NgbModalConfig, 
    protected authServ: AuthService, 
    protected movieServ: MovieAPIService, 
    protected commentServ: CommentService, 
    private router: Router) { 
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit(): void {
    if (!this.authServ.isAuthenticated()) {
      alert("Non puoi accedere a questa pagina senza eseguire prima il login")
      this.router.navigateByUrl("/sign");
    }
  }

  saveCommentFromForm(el: NgForm) {
    this.commentServ.saveComment(el).subscribe(); 
  }

  adultsFilm(isAdultFilm: boolean){
    if(isAdultFilm){
      return "Attenzione! scene di nudo in vista! 🔞";
    }else{
      return "Qui niente scene di nudo ✅";
    }
  }

  playAgain(){
    this.movieServ.ordMovies.length = 0;
    this.movieServ.rating = 0;
    this.router.navigate(['game']);
  }
}
