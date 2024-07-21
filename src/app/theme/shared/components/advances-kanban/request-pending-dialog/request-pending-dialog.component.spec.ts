import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPendingDialogComponent } from './request-pending-dialog.component';

describe('RequestPendingDialogComponent', () => {
  let component: RequestPendingDialogComponent;
  let fixture: ComponentFixture<RequestPendingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestPendingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestPendingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
