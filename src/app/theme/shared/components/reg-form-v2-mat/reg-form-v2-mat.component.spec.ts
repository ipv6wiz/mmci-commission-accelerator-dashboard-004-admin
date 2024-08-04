import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFormV2MatComponent } from './reg-form-v2-mat.component';

describe('RegFormV2Component', () => {
  let component: RegFormV2MatComponent;
  let fixture: ComponentFixture<RegFormV2MatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegFormV2MatComponent]
    });
    fixture = TestBed.createComponent(RegFormV2MatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
