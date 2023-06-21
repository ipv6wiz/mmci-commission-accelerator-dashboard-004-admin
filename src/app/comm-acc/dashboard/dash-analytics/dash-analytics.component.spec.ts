import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAnalyticsComponent } from './dash-analytics.component';

describe('DashAnalyticsComponent', () => {
  let component: DashAnalyticsComponent;
  let fixture: ComponentFixture<DashAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashAnalyticsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
