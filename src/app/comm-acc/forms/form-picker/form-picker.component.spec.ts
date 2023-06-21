import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPickerComponent } from './form-picker.component';

describe('FormPickerComponent', () => {
  let component: FormPickerComponent;
  let fixture: ComponentFixture<FormPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
