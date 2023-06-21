import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardBasicComponent } from './wizard-basic.component';

describe('WizardBasicComponent', () => {
  let component: WizardBasicComponent;
  let fixture: ComponentFixture<WizardBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardBasicComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
