import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMovieItemComponent } from './favorite-movie-item.component';

describe('FavoriteMovieItemComponent', () => {
  let component: FavoriteMovieItemComponent;
  let fixture: ComponentFixture<FavoriteMovieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteMovieItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteMovieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
