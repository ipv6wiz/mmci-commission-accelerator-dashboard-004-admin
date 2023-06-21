import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthChangePasswordV2Component } from './auth-change-password-v2.component';

describe('AuthChangePasswordV2Component', () => {
  let component: AuthChangePasswordV2Component;
  let fixture: ComponentFixture<AuthChangePasswordV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthChangePasswordV2Component]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthChangePasswordV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
