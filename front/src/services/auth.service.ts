import { Injectable } from '@angular/core';
import { LoginDTO, RegisterDTO, RegistrationResponse, SpringResponse, User, UserForEmailService } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  springBootUrl: string = 'http://localhost:8092/api/user';
  map!: SpringResponse;

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO): Observable<any> {
    return this.http.post(`${this.springBootUrl}/signIn`, loginData);
  }  

  register(registerData: RegisterDTO): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.springBootUrl}/signUp`, registerData);
  }  

  isEnabledByEmail(email: string): Observable<any> {
    return this.http.post(`${this.springBootUrl}/getUserByEmail`, email, { responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('user');
  } 

  isAuthenticated() {
    return localStorage.getItem('user');
  }

  getCurrentUser() {
    this.map = JSON.parse(localStorage.getItem('user') || '');
    return this.map.data;
  }

  saveUserInLocalStorage(loginData: Partial<LoginDTO>) {
    localStorage.setItem('user', JSON.stringify(loginData));
    return of('login ok');
  }

  setUserEnabledByUserId(userId: number): Observable<any> {
    return this.http.post(`${this.springBootUrl}/setUserEnabledByUserId`, userId, { responseType: 'text' });
  }  
  
  getUserByEmail(user: UserForEmailService): Observable<any> {
    return this.http.get(`${this.springBootUrl}/getUserByEmail/${user}`);
  }
  
  changePassword(user: UserForEmailService): Observable<any> {
    return this.http.post(`${this.springBootUrl}/getUserByEmail`, user);
  }

  
}
