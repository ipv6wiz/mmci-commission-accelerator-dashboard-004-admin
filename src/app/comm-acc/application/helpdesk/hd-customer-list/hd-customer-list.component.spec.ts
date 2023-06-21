import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdCustomerListComponent } from './hd-customer-list.component';

describe('HdCustomerListComponent', () => {
  let component: HdCustomerListComponent;
  let fixture: ComponentFixture<HdCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdCustomerListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HdCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
