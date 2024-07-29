import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceFundedDialogComponent } from './advance-funded-dialog.component';

describe('AdvanceFundedDialogComponent', () => {
  let component: AdvanceFundedDialogComponent;
  let fixture: ComponentFixture<AdvanceFundedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceFundedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceFundedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
