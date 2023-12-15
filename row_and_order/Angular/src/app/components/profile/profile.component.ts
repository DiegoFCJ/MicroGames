import { HttpClient } from '@angular/common/http';
import { MovieAPIService } from 'src/app/@core/services/movie-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { FavouritesService } from 'src/app/@core/services/favourites.service';
import { FullFavData } from 'src/app/models/movieData';
import { MovieRootObject } from 'src/app/models/movies';

@Component({
  selector: 'tnv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  constructor(
    protected authService: AuthService, 
    protected favServ: FavouritesService, 
    protected movieServ: MovieAPIService, 
    private router: Router) {}

    ngOnInit(): void {
     if (!this.authService.isAuthenticated()) {
      alert("You cannot access on this page without permission")
      this.router.navigateByUrl("/sign");
    }

    this.movieServ.getAllFavouriteMovies(this.authService.getCurrentUser().id);
  } 


  
  



}
