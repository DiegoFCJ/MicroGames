import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { Observable } from "rxjs";


const SBUrl = "http://localhost:8080/api/public";

@Injectable({
    providedIn:'root'
  })
export class ScoreService
{
    constructor(private http: HttpClient) {}

    getAllUsersOrdered(): Observable<any> {
        return this.http.get<User[]>(`${SBUrl}"/allUsersDescending"`);
    }
  
}