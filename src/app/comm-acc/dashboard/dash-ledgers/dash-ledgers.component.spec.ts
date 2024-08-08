import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLedgersComponent } from './dash-ledgers.component';

describe('DashLedgersComponent', () => {
  let component: DashLedgersComponent;
  let fixture: ComponentFixture<DashLedgersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashLedgersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashLedgersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
