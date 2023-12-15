import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatingReviewComponent } from './add-rating-review.component';

describe('AddRatingReviewComponent', () => {
  let component: AddRatingReviewComponent;
  let fixture: ComponentFixture<AddRatingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRatingReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRatingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
