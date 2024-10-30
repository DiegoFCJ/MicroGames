import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { MovieAPIService } from 'src/services/movie-api.service';

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
