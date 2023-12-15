import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from 'src/app/@core/services/movie-api.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  
  constructor(
    private authService: AuthService, 
    protected movieServ: MovieAPIService, 
    private router: Router, 
    protected authServ: AuthService) {}
 
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      alert("You cannot access on this page without permission")
      this.router.navigateByUrl("/sign");
    }

    for (let i = 0; i < 10; i++) {
      this.movieServ.getRandomMovie();
    } 
  }

  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    moveItemInArray(this.movieServ.randomMovies, event.previousIndex, event.currentIndex);
  }
}
