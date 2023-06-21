import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardNavbarRightComponent } from './wizard-navbar-right.component';

describe('WizardNavbarRightComponent', () => {
  let component: WizardNavbarRightComponent;
  let fixture: ComponentFixture<WizardNavbarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardNavbarRightComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardNavbarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
