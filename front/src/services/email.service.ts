import { Injectable } from '@angular/core';
import { RecoverDTO } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService{
  port: string = "8093";
  type: string = "/api/email";
  springBootUrl: string = environment.APIEndpoint + this.port + this.type;

  constructor(private http: HttpClient) {}

  sendEmail(userForEmailService: any): Observable<any> {
    return this.http.post(`${this.springBootUrl}/sendEmail`, userForEmailService, { responseType: 'text' });
  }

  activation(token: string): Observable<any> {
    return this.http.post(`${this.springBootUrl}/activation?token=${token}`, { responseType: 'text' });
  }

  passRecovery(email: string): Observable<any> {
    return this.http.post(`${this.springBootUrl}/passRecovery?email=${email}`, { responseType: 'text' });
  }

  recoverPassword(mailPass: RecoverDTO, token: string): Observable<any> {
    return this.http.post(`${this.springBootUrl}/recoverPassword?token=${token}`, mailPass, { responseType: 'text' });
  }
  
}
