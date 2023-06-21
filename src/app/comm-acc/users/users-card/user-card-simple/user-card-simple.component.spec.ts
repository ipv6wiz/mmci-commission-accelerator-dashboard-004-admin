import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardSimpleComponent } from './user-card-simple.component';

describe('UserCardSimpleComponent', () => {
  let component: UserCardSimpleComponent;
  let fixture: ComponentFixture<UserCardSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardSimpleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
