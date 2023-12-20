import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, filter, switchMap, tap } from 'rxjs';
import { AlertsService } from 'src/mockup/alerts.service';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';
import { MovieAPIService } from 'src/services/movie-api.service';
import * as Messages from 'src/const-messages/messages'
import { RegistrationResponse, UserForEmailService } from 'src/models/user';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})

export class SignPageComponent implements OnInit {
  submitted: boolean = false;
  isPassToRecover: boolean = false;
  regLogChecked: boolean = false;
  userForEmailService!: UserForEmailService;
  userPlusMessage!: RegistrationResponse;

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
 
  /*register(form: NgForm) {
    if (form.valid) {
      this.authServ.register(form.value).pipe(
        switchMap(regResponse => {
          const regMessage = regResponse.message as string;
  
          if (regResponse.message !== Messages.REG_SUCCESS) {
            this.alertServ.showErrorAlert(regResponse.message);
            return EMPTY;
          } else {
            return this.alertServ.showInfoAlert(Messages.EML_CONFIRM);
          }
        }),
        filter((result: any) => result.isConfirmed), // Filtra solo se confermato
        tap(() => window.open(Messages.LIN_GMAIL, '_blank')), // Apri link dopo la conferma
        switchMap(() => this.emailServ.sendEmail(form.value)) // Invio dell'email
      ).subscribe();
    }
  }*/
  
  register(form: NgForm) {
    if (form.valid) {
      this.authServ.register(form.value).subscribe({
        next: (regResponse: RegistrationResponse) => {
          if (regResponse.user) {
            // Registrazione avvenuta con successo, gestisci i dettagli dell'utente
            this.alertServ.showInfoAlert(Messages.EML_CONFIRM).then((result) => {
              if (result.isConfirmed && form.value.email.includes("gmail")) {
                window.open(Messages.LIN_GMAIL, '_blank');
              }
              console.log(regResponse.user);
  
              this.userForEmailService = {
                id: regResponse.user.id,
                username: regResponse.user.username,
                email: regResponse.user.email
              };
  
              console.log(this.userForEmailService);
  
              // Invio dell'email con i dettagli dell'utente usando un Observer
              this.emailServ.sendEmail(this.userForEmailService).subscribe({
                next: (response) => {
                  // Gestisci la risposta dell'invio dell'email se necessario
                },
                error: (error) => {
                  // Gestisci gli errori dell'invio dell'email, se necessario
                }
              });
            });
          } else {
            // Errore durante la registrazione, mostra il messaggio di errore
            this.alertServ.showErrorAlert(regResponse.message);
          }
        },
        error: (error) => {
          // Gestisci gli errori della richiesta HTTP
          this.alertServ.showErrorAlert('Username gia in uso');
          // Puoi anche gestire l'errore in modo più specifico a seconda delle tue esigenze
        }
      });
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
  
  sendRecoveryMail(form: NgForm) {
    if (form.valid) {
      this.authServ.getUserByEmail(form.value.email).subscribe({

        next: (respFromEmailServ) => {
          if (respFromEmailServ.user) {
            this.emailServ.sendRecoveryMail(respFromEmailServ.user).subscribe({

              next: (res) => {
                this.alertServ.showInfoAlert(res);
              },

              error: (error) => {
                this.alertServ.showErrorAlert(error.error.text);
              }

            });
          } else {
            this.alertServ.showInfoAlert(Messages.ERR_GENERIC); 
          }
        },

        error: (error) => {
          this.alertServ.showErrorAlert(error.error.text);
        }

      });
    }
  }
}