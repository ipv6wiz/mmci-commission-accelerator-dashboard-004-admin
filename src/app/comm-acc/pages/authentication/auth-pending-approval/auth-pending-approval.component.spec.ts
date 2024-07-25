import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPendingApprovalComponent } from './auth-pending-approval.component';

describe('AuthPendingApprovalComponent', () => {
  let component: AuthPendingApprovalComponent;
  let fixture: ComponentFixture<AuthPendingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPendingApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthPendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
