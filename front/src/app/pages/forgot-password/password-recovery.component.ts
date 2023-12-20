import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/mockup/alerts.service';
import { RecoverDTO } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';
import * as Messages from 'src/const-messages/messages'

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  user!: RecoverDTO;
  tokenFromRoute!: string;

  constructor(
    private authServ: AuthService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private emailServ: EmailService, 
    private alertServ: AlertsService) { }

  ngOnInit(): void {
    if (this.authServ.isAuthenticated()) {
      this.alertServ.showAutoDestroyAlert(
        Messages.ICO_INFO,
        Messages.LOG_INFO,
        Messages.EML_CANT_RECOVER,
        4000
      );
      this.router.navigateByUrl(Messages.ROT_HOME);
    }else{
      this.isDataNotNull()
    }
  }

  isDataNotNull(){
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    const tokenFromRoute = this.route.snapshot.paramMap.get('token');
    const emailFromRoute = this.route.snapshot.paramMap.get('email');
    console.log(idFromRoute)

    if (tokenFromRoute !== null && emailFromRoute !== null && idFromRoute !== null) {
      this.user = {
        id: Number(idFromRoute),
        email: emailFromRoute,
        password: "",
      };
      this.tokenFromRoute = tokenFromRoute;

      console.log(this.user);
      
    }else{
      this.alertServ.showErrorAlert(Messages.LIN_EXPIRED);
    }
  }

  changePassword(form: NgForm) {
    if (form.valid) {
      this.user.password = form.value.nuovaPassword;
      this.emailServ.confirmRecoverPassword(this.tokenFromRoute).subscribe({

        next: (res) => {
          if(res === "Confermato!"){
            this.alertServ.showSuccessAlert(res);
          }
          this.alertServ.showErrorAlert(res);
        },

        error: (error) => {
          this.alertServ.showErrorAlert(error.error.text);
        }

      })
    }
  }

}