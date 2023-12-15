import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../@core/services/auth.service";
import { MovieAPIService } from "../../@core/services/movie-api.service";


@Component({
  selector: "tnv-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

export class LoginComponent implements OnInit {
  constructor(protected authService: AuthService, private router: Router, protected movieApiSer: MovieAPIService) {}

  ngOnInit(): void {
/*     if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    } */
  }

  login(form: NgForm) {
    console.log(form.value.username)
    
    this.movieApiSer.userNameLogged = form.value.username;
    console.log(this.movieApiSer.userNameLogged);


     form.control.markAllAsTouched();

    if (form.valid) {

      this.authService.login(form.value).subscribe({
        next: (response) => {
          console.log(response);

          this.authService.saveUserInLocalStorage(response);
          this.router.navigate(['main-page']);
        }
      })
    }
  }
}