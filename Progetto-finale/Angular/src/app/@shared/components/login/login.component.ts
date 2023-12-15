import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { R3ExpressionFactoryMetadata } from "@angular/compiler/src/render3/r3_factory";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";

@Component({
  selector: "tnv-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  errorLoginMessage: string = "Username o password errati";
  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }

  login(form: NgForm) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.authService.login(form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.authService.saveUserInLocalStorage(res);
          this.router.navigateByUrl('/welcome');
        },
        error: () => this.showError = true
      })
    }
  }
}
