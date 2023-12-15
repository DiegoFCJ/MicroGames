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
  token: string = "";
  email: string = "";
  user: RecoverDTO = { email: '', password: '' };

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
      this.getSendToken()
    }
  }

  getSendToken(){
    const tokenFromRoute = this.route.snapshot.paramMap.get('token');
    const emailFromRoute = this.route.snapshot.paramMap.get('email');
    if (tokenFromRoute !== null && emailFromRoute !== null) {
      this.token = tokenFromRoute;
      this.email = emailFromRoute; 
    }else{
      this.alertServ.showErrorAlert(Messages.LIN_EXPIRED);
    }
  }

  recoverPassword(form: NgForm) {
    if (form.valid) {
      this.user.email = this.email;
      this.user.password = form.value.nuovaPassword;
      this.emailServ.recoverPassword(this.user, this.token).subscribe({
        next: (res) => {
          this.alertServ.showWarningAlert(res);
        },
        error: (error) => {
          this.alertServ.showErrorAlert(error.error.text);
        }
      })
    }
  }

}