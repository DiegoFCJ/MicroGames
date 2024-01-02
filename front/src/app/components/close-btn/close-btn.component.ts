import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss']
})
export class CloseBtnComponent implements OnInit {
  @Input() movieElement: any;
  @Input() d!: Function;

  constructor() { }

  ngOnInit(): void {
  }

}
