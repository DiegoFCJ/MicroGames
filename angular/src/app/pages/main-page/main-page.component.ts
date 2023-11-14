import { AuthService } from 'src/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router, private authServ: AuthService) {}


  ngOnInit(): void {
  }
  //in caso non ci sia utente loggato da un alert se si preme il tasto gioca
  redirectNotLogged() {
    if (!this.authServ.isAuthenticated()) {
      alert("Non puoi accedere a questa pagina senza permesso! Esegui l'accesso")
      this.router.navigateByUrl("/sign");
    }else{
      this.router.navigate(['game']);
    }
  }
}
