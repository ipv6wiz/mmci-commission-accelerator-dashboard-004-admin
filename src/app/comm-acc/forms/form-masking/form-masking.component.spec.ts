import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMaskingComponent } from './form-masking.component';

describe('FormMaskingComponent', () => {
  let component: FormMaskingComponent;
  let fixture: ComponentFixture<FormMaskingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMaskingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormMaskingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
