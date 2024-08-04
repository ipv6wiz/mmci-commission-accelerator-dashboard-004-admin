import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNavBarComponent } from './reg-nav-bar.component';

describe('RegNavBarComponent', () => {
  let component: RegNavBarComponent;
  let fixture: ComponentFixture<RegNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegNavBarComponent]
    });
    fixture = TestBed.createComponent(RegNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
