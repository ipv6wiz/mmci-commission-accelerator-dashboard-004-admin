import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTypeFormDialogComponent } from './option-type-form-dialog.component';

describe('OptionTypeFormDialogComponent', () => {
  let component: OptionTypeFormDialogComponent;
  let fixture: ComponentFixture<OptionTypeFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionTypeFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionTypeFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
