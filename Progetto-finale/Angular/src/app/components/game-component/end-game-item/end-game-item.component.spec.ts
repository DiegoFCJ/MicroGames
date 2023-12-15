import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameItemComponent } from './end-game-item.component';

describe('EndGameItemComponent', () => {
  let component: EndGameItemComponent;
  let fixture: ComponentFixture<EndGameItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndGameItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
