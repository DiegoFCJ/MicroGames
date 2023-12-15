import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'tnv-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() movie: Partial<Movie> = {};
  
  imageBaseUrl: string = "https://image.tmdb.org/t/p/w440_and_h660_face"
  
  constructor() { }

  ngOnInit(): void {
    
  }
}

