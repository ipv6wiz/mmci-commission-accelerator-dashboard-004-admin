import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsProfileComponent } from './us-profile.component';

describe('UsProfileComponent', () => {
  let component: UsProfileComponent;
  let fixture: ComponentFixture<UsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
