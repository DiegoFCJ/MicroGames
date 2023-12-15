import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  listaUsers: User[] = [];

  ngOnInit(): void {
    this.http
      .get<User>('http://localhost:8080/api/admin/allUsersDescending?username=admin')
      .subscribe({
        next: (res) => {
          this.listaUsers.push(res); 
        },
      });
  }
  redirect() {
    this.router.navigate(['game-page']);
  }
}
