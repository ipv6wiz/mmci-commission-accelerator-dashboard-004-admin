import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNavBarRightComponent } from './reg-nav-bar-right.component';

describe('RegNavBarRightComponent', () => {
  let component: RegNavBarRightComponent;
  let fixture: ComponentFixture<RegNavBarRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegNavBarRightComponent]
    });
    fixture = TestBed.createComponent(RegNavBarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
