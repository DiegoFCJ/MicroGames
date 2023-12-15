import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/services/email.service';
import { AlertsService } from 'src/mockup/alerts.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-email-activated',
  templateUrl: './email-activated.component.html',
  styleUrls: ['./email-activated.component.scss']
})
export class EmailActivatedComponent implements OnInit {
  token: string = "";

  constructor(
    private route: ActivatedRoute, 
    private emailServ: EmailService, 
    private alertServ: AlertsService,
    private authServ: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.subscribeAfterTimeout();
  }
  
  subscribeAfterTimeout(){
    setTimeout(() => {
      this.router.navigateByUrl("/sign");
    }, 1600);
    const tokenFromRoute = this.route.snapshot.paramMap.get('token');
    if (tokenFromRoute !== null) {
      this.token = tokenFromRoute; // Assegna il valore solo se non è null
      this.emailServ.activation(this.token).subscribe(RES => {
        this.alertServ.showInfoAlert(RES.response);

        // Aggiungiamo la chiamata al metodo setUserEnabledByUserId dopo l'alert
        const userId = RES.userId; // Sostituisci con il modo corretto di ottenere l'ID dell'utente
        this.authServ.setUserEnabledByUserId(userId).subscribe(response => {
          console.log(response);
        });
      });
    }
  }
}
