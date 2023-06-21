import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeHorizontalL2Component } from './theme-horizontal-l2.component';

describe('ThemeHorizontalL2Component', () => {
  let component: ThemeHorizontalL2Component;
  let fixture: ComponentFixture<ThemeHorizontalL2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeHorizontalL2Component]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeHorizontalL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
