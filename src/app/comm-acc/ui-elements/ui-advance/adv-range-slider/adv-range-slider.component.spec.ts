import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvRangeSliderComponent } from './adv-range-slider.component';

describe('AdvRangeSliderComponent', () => {
  let component: AdvRangeSliderComponent;
  let fixture: ComponentFixture<AdvRangeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvRangeSliderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
