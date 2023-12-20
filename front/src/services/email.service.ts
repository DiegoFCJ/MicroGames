import { Injectable } from '@angular/core';
import { RecoverDTO, UserForEmailService } from 'src/models/user';
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

  sendRecoveryMail(userForEmailService: UserForEmailService): Observable<any> {
    return this.http.post(`${this.springBootUrl}/sendRecoveryMail`, userForEmailService, { responseType: 'text' });
  }
  
  changePassword(user: UserForEmailService): Observable<any> {
    return this.http.get(`${this.springBootUrl}/getUserByEmail/${user}`);
  }
  
  confirmRecoverPassword(token: string): Observable<any> {
    return this.http.post(`${this.springBootUrl}/confirmRecoverPassword`, token, { responseType: 'text' });
  }
  
}
