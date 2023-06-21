import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeFixedComponent } from './theme-fixed.component';

describe('ThemeFixedComponent', () => {
  let component: ThemeFixedComponent;
  let fixture: ComponentFixture<ThemeFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeFixedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
