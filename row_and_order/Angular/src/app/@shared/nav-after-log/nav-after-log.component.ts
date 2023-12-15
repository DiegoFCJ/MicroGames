import { MovieAPIService } from 'src/app/@core/services/movie-api.service';
import { AuthService } from './../../@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-after-log',
  templateUrl: './nav-after-log.component.html',
  styleUrls: ['./nav-after-log.component.scss']
})
export class NavAfterLogComponent implements OnInit {

  constructor(protected authS: AuthService, protected movieServ: MovieAPIService) { }

  ngOnInit(): void {
  }
  
}
