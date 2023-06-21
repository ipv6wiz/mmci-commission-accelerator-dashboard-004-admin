import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDataComponent } from './widget-data.component';

describe('WidgetDataComponent', () => {
  let component: WidgetDataComponent;
  let fixture: ComponentFixture<WidgetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetDataComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
