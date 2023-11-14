import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDTO, RecoverDTO } from 'src/models/user';
import { EmailService } from 'src/services/email.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  token: string = "";
  email: string = "";
  user: RecoverDTO = { email: '', password: '' };

  constructor(private route: ActivatedRoute, private emailServ: EmailService, private router: Router) { }

  ngOnInit(): void {
    const tokenFromRoute = this.route.snapshot.paramMap.get('token');
    const emailFromRoute = this.route.snapshot.paramMap.get('email');
    if (tokenFromRoute !== null && emailFromRoute !== null) {
      this.token = tokenFromRoute;
      this.email = emailFromRoute; 
    }else{
      alert("Errore: Il link e' scaduto")
    }
  }

  recoverPassword(form: NgForm) {
    if (form.valid) {
      this.user.email = this.email;
      this.user.password = form.value.nuovaPassword;
      this.emailServ.recoverPassword(this.user, this.token).subscribe({
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

}