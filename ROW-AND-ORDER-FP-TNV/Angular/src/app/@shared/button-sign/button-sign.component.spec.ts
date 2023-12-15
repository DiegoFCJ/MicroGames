import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSignComponent } from './button-sign.component';

describe('ButtonSignComponent', () => {
  let component: ButtonSignComponent;
  let fixture: ComponentFixture<ButtonSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
