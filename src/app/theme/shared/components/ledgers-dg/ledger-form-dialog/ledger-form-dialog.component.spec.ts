import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerFormDialogComponent } from './ledger-form-dialog.component';

describe('LedgerFormDialogComponent', () => {
  let component: LedgerFormDialogComponent;
  let fixture: ComponentFixture<LedgerFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
