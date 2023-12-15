import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingBestGamesComponent } from './ranking-best-games.component';

describe('RankingBestGamesComponent', () => {
  let component: RankingBestGamesComponent;
  let fixture: ComponentFixture<RankingBestGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingBestGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingBestGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
