import { FavouritesService } from 'src/app/@core/services/favourites.service';
import { UserService } from './../../@core/services/user.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MovieAPIService } from 'src/app//@core/services/movie-api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app//@core/services/auth.service';

@Component({ 
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})

export class ReviewPageComponent implements OnInit {

  constructor(protected authServ: AuthService, protected movieServ: MovieAPIService, protected userServ: UserService, private router: Router, protected favServ:FavouritesService) { }

  ngOnInit(): void {
    if (!this.authServ.isAuthenticated()) {
      alert("You cannot access this page without permission")
      this.router.navigateByUrl("/sign");
    }
    this.userServ.saveNewBestScoreOnSpringDb(this.movieServ.rating);
  }
}
