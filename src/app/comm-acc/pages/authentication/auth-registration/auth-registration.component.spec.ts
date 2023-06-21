import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegistrationComponent } from './auth-registration.component';

describe('AuthRegistrationComponent', () => {
  let component: AuthRegistrationComponent;
  let fixture: ComponentFixture<AuthRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthRegistrationComponent]
    });
    fixture = TestBed.createComponent(AuthRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
