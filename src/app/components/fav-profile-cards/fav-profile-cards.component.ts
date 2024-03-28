import { Component, Input, OnInit } from '@angular/core';
import { MovieRootObject } from 'src/models/movie';
import { MovieAPIService } from 'src/services/movie-api.service';

@Component({
  selector: 'app-fav-profile-cards',
  templateUrl: './fav-profile-cards.component.html',
  styleUrls: ['./fav-profile-cards.component.scss']
})
export class FavProfileCardsComponent implements OnInit {
  @Input() favMovies: any;
  singleMovie!: MovieRootObject;

  constructor(private movieServ: MovieAPIService) { 
  }

  ngOnInit(): void {
    
  }

  getMovie(movieId: number){
    this.movieServ.getMovie(movieId).subscribe({
      next: (res) => {
        console.log('res: ', res)
        if(res){
          return res.poster_path;
        }
        return "";
      },
      error(err) {
          return "";
      },
    })
  }

}
