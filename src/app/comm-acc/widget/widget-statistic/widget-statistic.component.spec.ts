import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStatisticComponent } from './widget-statistic.component';

describe('WidgetStatisticComponent', () => {
  let component: WidgetStatisticComponent;
  let fixture: ComponentFixture<WidgetStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetStatisticComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
