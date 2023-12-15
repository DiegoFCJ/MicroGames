import { Injectable } from '@angular/core';
import { LoginDTO, RegisterDTO, SpringResponse, UserFull } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  springBootUrl: string = 'http://localhost:8080/api/public';
  map!: SpringResponse;

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO) {
    return this.http.post<Partial<LoginDTO>>(`${this.springBootUrl}/signIn`, loginData);
  }

  register(registerData: RegisterDTO) {
    window.location.reload();
    return this.http.post<RegisterDTO>(`${this.springBootUrl}/signUp`, registerData);
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
}
