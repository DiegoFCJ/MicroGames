import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-fav-card-iscorrect',
  templateUrl: './fav-card-iscorrect.component.html',
  styleUrls: ['./fav-card-iscorrect.component.scss']
})
export class FavCardIscorrectComponent implements OnInit {
  @Input() i: any;
  @Input() movieElement: any;

  constructor() { }

  ngOnInit(): void {
  }

}
