import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingContractsDialogComponent } from './pending-contracts-dialog.component';

describe('PendingContractsDialogComponent', () => {
  let component: PendingContractsDialogComponent;
  let fixture: ComponentFixture<PendingContractsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingContractsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingContractsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
