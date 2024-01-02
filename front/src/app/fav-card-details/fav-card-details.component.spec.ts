import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCardDetailsComponent } from './fav-card-details.component';

describe('FavCardDetailsComponent', () => {
  let component: FavCardDetailsComponent;
  let fixture: ComponentFixture<FavCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavCardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
