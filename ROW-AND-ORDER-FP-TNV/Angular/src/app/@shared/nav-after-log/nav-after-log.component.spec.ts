import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAfterLogComponent } from './nav-after-log.component';

describe('NavAfterLogComponent', () => {
  let component: NavAfterLogComponent;
  let fixture: ComponentFixture<NavAfterLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAfterLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAfterLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
