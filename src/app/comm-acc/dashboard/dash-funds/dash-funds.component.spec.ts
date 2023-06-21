import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFundsComponent } from './dash-funds.component';

describe('DashFundsComponent', () => {
  let component: DashFundsComponent;
  let fixture: ComponentFixture<DashFundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashFundsComponent]
    });
    fixture = TestBed.createComponent(DashFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
