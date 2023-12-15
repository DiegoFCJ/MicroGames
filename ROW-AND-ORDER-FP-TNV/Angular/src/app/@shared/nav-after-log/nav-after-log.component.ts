import { AuthService } from './../../@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-after-log',
  templateUrl: './nav-after-log.component.html',
  styleUrls: ['./nav-after-log.component.scss']
})
export class NavAfterLogComponent implements OnInit {

  constructor(protected authS: AuthService) { }

  ngOnInit(): void {
  }
  
}
