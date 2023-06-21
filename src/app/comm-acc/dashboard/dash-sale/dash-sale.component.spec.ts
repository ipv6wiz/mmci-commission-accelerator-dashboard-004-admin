import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSaleComponent } from './dash-sale.component';

describe('DashSaleComponent', () => {
  let component: DashSaleComponent;
  let fixture: ComponentFixture<DashSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashSaleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
