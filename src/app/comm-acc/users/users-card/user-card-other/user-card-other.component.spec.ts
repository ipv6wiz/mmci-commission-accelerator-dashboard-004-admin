import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardOtherComponent } from './user-card-other.component';

describe('UserCardOtherComponent', () => {
  let component: UserCardOtherComponent;
  let fixture: ComponentFixture<UserCardOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardOtherComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
