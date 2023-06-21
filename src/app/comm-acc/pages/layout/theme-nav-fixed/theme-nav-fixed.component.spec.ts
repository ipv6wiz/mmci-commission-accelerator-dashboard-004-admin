import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeNavFixedComponent } from './theme-nav-fixed.component';

describe('ThemeNavFixedComponent', () => {
  let component: ThemeNavFixedComponent;
  let fixture: ComponentFixture<ThemeNavFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeNavFixedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeNavFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
