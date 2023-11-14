import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieRootObject } from 'src/models/movie';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TNVFinalProjectVIII';

  constructor(protected authService: AuthService) {}

  ngOnInit(): void {
  }

} 


