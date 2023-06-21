// Angular Import
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullEventCalendarComponent } from './full-event-calendar.component';

describe('FullEventCalendarComponent', () => {
  let component: FullEventCalendarComponent;
  let fixture: ComponentFixture<FullEventCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullEventCalendarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FullEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
