import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardFooterComponent } from './user-card-footer.component';

describe('UserCardFooterComponent', () => {
  let component: UserCardFooterComponent;
  let fixture: ComponentFixture<UserCardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardFooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
