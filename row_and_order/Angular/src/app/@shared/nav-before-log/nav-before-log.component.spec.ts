import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBeforeLogComponent } from './nav-before-log.component';

describe('NavBeforeLogComponent', () => {
  let component: NavBeforeLogComponent;
  let fixture: ComponentFixture<NavBeforeLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBeforeLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBeforeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
