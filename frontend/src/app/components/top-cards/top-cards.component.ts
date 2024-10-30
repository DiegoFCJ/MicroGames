import { Component, OnInit } from '@angular/core';

export interface topcard {
  bgcolor: string,
  icon: string,
  title: string,
  subtitle: string
}

export const topcards: topcard[] = [

  {
      bgcolor: 'success',
      icon: 'bi bi-wallet',
      title: '$21k',
      subtitle: 'Yearly Earning'
  },
  {
      bgcolor: 'danger',
      icon: 'bi bi-coin',
      title: '$1k',
      subtitle: 'Refund given'
  },
  {
      bgcolor: 'warning',
      icon: 'bi bi-basket3',
      title: '456',
      subtitle: 'Yearly Project'
  },
  {
      bgcolor: 'info',
      icon: 'bi bi-bag',
      title: '210',
      subtitle: 'Weekly Sales'
  },

] 

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards:topcard[];

  constructor() { 

    this.topcards=topcards;
  }

  ngOnInit(): void {
  }

}
