import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApprovalDialogComponent } from './pending-approval-dialog.component';

describe('PendingApprovalComponent', () => {
  let component: PendingApprovalDialogComponent;
  let fixture: ComponentFixture<PendingApprovalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingApprovalDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
