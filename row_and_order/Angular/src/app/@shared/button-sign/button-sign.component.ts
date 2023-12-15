
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-button-sign',
  templateUrl: './button-sign.component.html',
  styleUrls: ['./button-sign.component.scss']
})

export class ButtonSignComponent implements OnInit {

  @Input() btn_text: any;

  constructor() { }

  ngOnInit(): void {
  }

}
