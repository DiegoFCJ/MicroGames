import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";

@Component({
  selector: "tnv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    /*if (this.authService.isAuthenticated()) {
      alert("non puoi registrarti sei gia loggato")
      this.router.navigateByUrl("/");
    }*/
  }

  register(form: NgForm) {
    //form.control.markAllAsTouched();
    console.log(form.value)
    if (form.valid) {
      this.authService.register(form.value).subscribe( {
        next: () => this.router.navigate(['/'])
        
      });
      
    }
    
  }
}
