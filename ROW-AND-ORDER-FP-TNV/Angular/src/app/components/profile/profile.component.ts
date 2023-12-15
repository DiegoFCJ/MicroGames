import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLocalSt, User } from 'src/app/models/user';
import { AuthService } from 'src/app/@core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FavData, FullFavData } from 'src/app/models/movieData';
import { FavouritesService } from 'src/app/@core/services/favourites.service';

@Component({
  selector: 'tnv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  currentUser!: UserLocalSt;

  constructor(protected authService: AuthService, private router: Router, protected favServ: FavouritesService) {}

  ngOnInit(): void {
     if (!this.authService.isAuthenticated()) {
      alert("You cannot access on this page without permission")
      this.router.navigateByUrl("/sign");
    }
    this.currentUser = this.authService.getCurrentUser();
    this.favServ.fetchAllFavourites(this.currentUser.id);
  } 



}
