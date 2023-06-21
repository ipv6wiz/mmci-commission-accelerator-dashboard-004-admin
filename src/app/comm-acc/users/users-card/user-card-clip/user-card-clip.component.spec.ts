import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardClipComponent } from './user-card-clip.component';

describe('UserCardClipComponent', () => {
  let component: UserCardClipComponent;
  let fixture: ComponentFixture<UserCardClipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardClipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
