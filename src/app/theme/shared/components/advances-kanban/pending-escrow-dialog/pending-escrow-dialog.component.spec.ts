import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEscrowDialogComponent } from './pending-escrow-dialog.component';

describe('PendingEscrowDialogComponent', () => {
  let component: PendingEscrowDialogComponent;
  let fixture: ComponentFixture<PendingEscrowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingEscrowDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingEscrowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
