import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvLightboxComponent } from './adv-lightbox.component';

describe('AdvLightboxComponent', () => {
  let component: AdvLightboxComponent;
  let fixture: ComponentFixture<AdvLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvLightboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
