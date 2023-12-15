import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/@core/services/auth.service";
import { User } from "src/app/models/user";

@Component({
  selector: "tnv-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  currentUser: Partial<User> = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
}
