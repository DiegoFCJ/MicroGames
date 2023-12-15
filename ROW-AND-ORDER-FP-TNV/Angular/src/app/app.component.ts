import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = "TNVLezioni"

  constructor(protected authService: AuthService) {}
  
  ngOnInit(): void {
  }

} 


