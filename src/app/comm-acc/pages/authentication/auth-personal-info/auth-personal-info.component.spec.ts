import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPersonalInfoComponent } from './auth-personal-info.component';

describe('AuthPersonalInfoComponent', () => {
  let component: AuthPersonalInfoComponent;
  let fixture: ComponentFixture<AuthPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPersonalInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
