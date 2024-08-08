import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerItemsDgComponent } from './ledger-items-dg.component';

describe('LedgerItemsDgComponent', () => {
  let component: LedgerItemsDgComponent;
  let fixture: ComponentFixture<LedgerItemsDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerItemsDgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerItemsDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
