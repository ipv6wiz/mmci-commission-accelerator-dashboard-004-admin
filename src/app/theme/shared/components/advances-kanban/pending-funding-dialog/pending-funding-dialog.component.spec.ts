import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFundingDialogComponent } from './pending-funding-dialog.component';

describe('PendingFundingDialogComponent', () => {
  let component: PendingFundingDialogComponent;
  let fixture: ComponentFixture<PendingFundingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingFundingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingFundingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
