import { MovieAPIService } from 'src/app/@core/services/movie-api.service';
import { FavouritesService } from './../../@core/services/favourites.service';
import {Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-favourites-carousel',
  templateUrl: './favourites-carousel.component.html',
  styleUrls: ['./favourites-carousel.component.scss']
})
export class FavouritesCarouselComponent implements OnInit {
  constructor(protected authServ: AuthService, protected favServ: FavouritesService, protected movieServ: MovieAPIService) {}

  ngOnInit() {
  
  }

  currentRateTest(){
    this.movieServ.currentRate = 5;
  }
  
}
