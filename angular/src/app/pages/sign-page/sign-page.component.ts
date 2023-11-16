import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import { AlertsService } from 'src/mockup/alerts.service';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';
import { MovieAPIService } from 'src/services/movie-api.service';
import * as Messages from 'src/const-messages/messages'

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})

export class SignPageComponent implements OnInit {
  submitted: boolean = false;
  isPassToRecover: boolean = false;
  regLogChecked: boolean = false;

  constructor(
    private authServ: AuthService, 
    private router: Router, 
    protected movieSer: MovieAPIService, 
    private emailServ: EmailService, 
    private alertServ: AlertsService) {}

  ngOnInit(): void {
    if (this.authServ.isAuthenticated()) {
      this.alertServ.showAutoDestroyAlert(
        Messages.ICO_INFO,
        Messages.LOG_INFO,
        Messages.LOG_WARNING_NO_REG,
        4000
      );
      this.router.navigateByUrl(Messages.ROT_HOME);
    }
  }

  register(form: NgForm) {
    if (form.valid) {
      this.authServ.register(form.value).pipe(
        switchMap(regResponse => {
          const regMessage = regResponse as string;

          if (regResponse !== Messages.REG_SUCCESS) {
            this.alertServ.showErrorAlert(regResponse);
            return EMPTY;
          } else {
            return this.alertServ.showInfoAlert(Messages.EML_CONFIRM)
            .then((result) => {
              if (result.isConfirmed) {
                window.open(Messages.LIN_GMAIL, '_blank');
              }
              return this.emailServ.sendEmail(form.value);
            });
          }
        })
      ).subscribe();
    }
  }

  login(form: NgForm) {
    this.movieSer.userNameLogged = form.value.username;
    form.control.markAllAsTouched();
    if (form.valid) {
      this.authServ.login(form.value).subscribe({
        next: (response) => {

          this.alertServ.showAutoDestroyAlert(
            Messages.ICO_SUCCESS,
            Messages.LOG_SUCCESS,
            response,
            1500
          );

          this.authServ.saveUserInLocalStorage(response);
          this.router.navigateByUrl(Messages.ROT_HOME);
        },
        error: (error) => {
          this.alertServ.showErrorAlert(error.error.message);
        }
      });
    }
  }

  goToRecoverPass() {
    this.isPassToRecover = true;
    this.regLogChecked = true;
  }

  backToLogin() {
    this.regLogChecked = false;
    setTimeout(() => {
      this.isPassToRecover = false;
    }, 500);
  }

  recoverPass(form: NgForm) {
    if (form.valid) {
      this.emailServ.passRecovery(form.value.email).subscribe({
        next: (res) => {
          console.log(res);
          this.alertServ.showInfoAlert(res)
        },
        error: (error) => {
          this.alertServ.showErrorAlert(error.error.text);
        }
      });
    }
  }
}