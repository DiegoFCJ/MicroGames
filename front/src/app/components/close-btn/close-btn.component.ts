import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss']
})
export class CloseBtnComponent implements OnInit {
  @Input() movieElement: any;
  @Input() d!: Function;
  isFullText = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.isFullText = true;
    setTimeout(() => {
      this.isFullText = false;
    }, 3000); // Nasconde il testo dopo 3 secondi
  }

}
