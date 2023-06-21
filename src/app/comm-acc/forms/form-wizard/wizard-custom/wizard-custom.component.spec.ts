import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCustomComponent } from './wizard-custom.component';

describe('WizardCustomComponent', () => {
  let component: WizardCustomComponent;
  let fixture: ComponentFixture<WizardCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardCustomComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
