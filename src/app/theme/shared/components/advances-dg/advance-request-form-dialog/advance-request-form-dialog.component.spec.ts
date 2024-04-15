import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceRequestFormDialogComponent } from './advance-request-form-dialog.component';

describe('AdvanceRequestFormComponent', () => {
  let component: AdvanceRequestFormDialogComponent;
  let fixture: ComponentFixture<AdvanceRequestFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceRequestFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceRequestFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
