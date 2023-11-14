import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';
import { MovieAPIService } from 'src/services/movie-api.service';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {
  submitted: boolean = false;
  isPassToRecover: boolean = false;
  regLogChecked: boolean = false;

  constructor(private authServ: AuthService, private router: Router, protected movieSer: MovieAPIService, private emailServ: EmailService) {}

  ngOnInit(): void {
    if (this.authServ.isAuthenticated()) {
      alert("Hai gia eseguito il login, non puoi registrarti o eseguirne un altro se prima non esegui il logout!")
      this.router.navigateByUrl("/home");
    }
  }
  
  register(form: NgForm) {
    const responseFromDB: string = "Email inviata correttamente, controlla la tua mail! (se non la trovi guarda in spam)";
    if (form.valid) {
      this.authServ.register(form.value).pipe(
        switchMap(regResponse => {
          const regMessage = regResponse as string;
          console.log(regMessage);
  
          if (regResponse !== "Account creato correttamente") {
            alert(regResponse);
            return EMPTY; // Interrompi il flusso dell'observable in caso di errore
          }else{
            const confirmation = confirm("Stiamo aprendo una nuova finestra dove dovrai accedere alla tua mail per attivare il tuo account!" +
                                         "\nPremi ok per continuare oppure cancel se vuoi attivarla dopo!");
            
            if (confirmation) {
              // L'utente ha cliccato "OK" nell'alert, quindi apri il link esterno
              window.open('https://mail.google.com/mail/u/0/?ogbl#inbox', '_blank'); // oppure usa window.location.href se vuoi reindirizzare l'intera pagina
            }
          }
          // Continua solo se la registrazione è riuscita
          return this.emailServ.sendEmail(form.value);
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
          if(this.movieSer.userNameLogged.includes("@")){
            alert("Ora sei loggato!");
            this.authServ.saveUserInLocalStorage(response); 
            this.router.navigateByUrl("/home");
          } else {
            alert("Ora sei loggato!");
            this.authServ.saveUserInLocalStorage(response); 
            this.router.navigateByUrl("/home");
          }
        },
        error: (error) => {
          alert(error.error.message)
        }
      })
    }
  }

  goToRecoverPass(){
    this.isPassToRecover = true;
    this.regLogChecked = true;
  }

  backToLogin(){
    this.regLogChecked = false;
    setTimeout(() => {
      this.isPassToRecover = false;
    }, 500);
  }

  recoverPass(form: NgForm){
    if (form.valid) {
      this.emailServ.passRecovery(form.value.email).subscribe({
        next: (res) => {
          console.log(res)
          alert(res);
        },
        error: (error) => {
          alert(error.error.text)
        }
      })
    }
  }

/*
  login(form: NgForm) {
    this.movieSer.userNameLogged = form.value.username;
    form.control.markAllAsTouched();
  
    if (form.valid) {
      this.authServ.login(form.value).subscribe({
        next: (response) => {
          alert(response.message);
          if (response.message === "Ora sei loggato!") {
            this.authServ.saveUserInLocalStorage(response.data);
            this.router.navigate(['home']);
          }  
        },
        error: (error) => {
          // Gestisci eventuali errori di rete o altri errori
          console.error(error);
          alert(error.error.message)
        }
      });
    }
  }
*/
/*
  login(form: NgForm) {
    this.movieSer.userNameLogged = form.value.username;
    form.control.markAllAsTouched();
    if (form.valid) {
      this.authServ.login(form.value).subscribe({
        next: (response) => {
          console.log(response)
          if (response !== "Account creato correttamente") {
            alert(response);
          }
          this.authServ.saveUserInLocalStorage(response); 
          this.router.navigateByUrl("/home");
        }
      })
    }
  }
*/

}