import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardSocialComponent } from './user-card-social.component';

describe('UserCardSocialComponent', () => {
  let component: UserCardSocialComponent;
  let fixture: ComponentFixture<UserCardSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardSocialComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
