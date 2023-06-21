import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProfileSettingsComponent } from './auth-profile-settings.component';

describe('AuthProfileSettingsComponent', () => {
  let component: AuthProfileSettingsComponent;
  let fixture: ComponentFixture<AuthProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthProfileSettingsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
