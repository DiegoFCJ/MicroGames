import { Component, OnInit, Input } from '@angular/core';
import * as Messages from 'src/const-messages/messages';

@Component({
  selector: 'app-fav-card-details',
  templateUrl: './fav-card-details.component.html',
  styleUrls: ['./fav-card-details.component.scss']
})
export class FavCardDetailsComponent implements OnInit {
  @Input() movieElement: any;

  constructor() { }

  ngOnInit(): void {
  }
  
  adultsFilm(isAdultFilm: boolean) {
    return isAdultFilm ? Messages.ADULLT_YES : Messages.ADULT_NO;
  }

}
