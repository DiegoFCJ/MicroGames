import { AuthService } from './../../@core/services/auth.service';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { hasClassName } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.scss']
})

export class SignInUpComponent implements OnInit {
  choice!: number;

  constructor() {}

  ngOnInit(): void {
  }
}
