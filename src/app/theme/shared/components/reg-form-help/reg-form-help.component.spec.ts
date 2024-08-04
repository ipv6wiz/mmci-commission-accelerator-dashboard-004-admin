import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFormHelpComponent } from './reg-form-help.component';

describe('RegFormHelpComponent', () => {
  let component: RegFormHelpComponent;
  let fixture: ComponentFixture<RegFormHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegFormHelpComponent]
    });
    fixture = TestBed.createComponent(RegFormHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
