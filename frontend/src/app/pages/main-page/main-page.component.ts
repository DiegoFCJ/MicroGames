import { AuthService } from 'src/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/mockup/alerts.service';
import * as Messages from 'src/const-messages/messages'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router, 
    private authServ: AuthService, 
    private alertServ: AlertsService) {}


  ngOnInit(): void {
  }

  //in caso non ci sia utente loggato da un alert se si preme il tasto gioca
  redirectNotLogged() {
    if (!this.authServ.isAuthenticated()) {
      this.alertServ.showAutoDestroyAlert(
        Messages.ICO_INFO,
        Messages.LOG_MUST,
        Messages.LOG_WARNING_NO_ACC,
        4000
      );
      this.router.navigateByUrl(Messages.ROT_SIGN);
    }else{
      this.router.navigateByUrl(Messages.ROT_GAME);
    }
  }
}
