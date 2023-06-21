import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdCustomerDetailComponent } from './hd-customer-detail.component';

describe('HdCustomerDetailComponent', () => {
  let component: HdCustomerDetailComponent;
  let fixture: ComponentFixture<HdCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdCustomerDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HdCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
