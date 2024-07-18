import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionValueFormDialogComponent } from './option-value-form-dialog.component';

describe('OptionValueFormDialogComponent', () => {
  let component: OptionValueFormDialogComponent;
  let fixture: ComponentFixture<OptionValueFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionValueFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionValueFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
