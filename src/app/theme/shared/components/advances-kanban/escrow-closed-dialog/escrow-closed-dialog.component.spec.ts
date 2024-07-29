import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowClosedDialogComponent } from './escrow-closed-dialog.component';

describe('EscrowClosedDialogComponent', () => {
  let component: EscrowClosedDialogComponent;
  let fixture: ComponentFixture<EscrowClosedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscrowClosedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscrowClosedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
