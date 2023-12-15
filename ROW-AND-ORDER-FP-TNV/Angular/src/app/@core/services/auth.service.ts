import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginDTO, RegisterDTO, User, UserLocalSt } from "../../models/user"
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBootUrl = "http://localhost:8080/api/public";

  constructor(private router: Router, private http: HttpClient) {}

  login(loginData: LoginDTO) {
    console.log("auth service.ts", loginData);
    return this.http.post<Partial<LoginDTO>>(`${this.springBootUrl}/signIn`, loginData);
  }
    
  saveUserInLocalStorage(loginData: Partial<LoginDTO>){
    
    localStorage.setItem("user", JSON.stringify(loginData));
    return of('login ok');
  }

  register(registerData: RegisterDTO) {

    this.router.navigateByUrl("/");
    return this.http.post<RegisterDTO>(`${this.springBootUrl}/signUp`, registerData);
  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || "") as UserLocalSt;
    return user;
  }
}