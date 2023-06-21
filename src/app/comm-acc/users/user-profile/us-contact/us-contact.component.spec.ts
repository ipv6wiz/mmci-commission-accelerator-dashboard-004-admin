import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsContactComponent } from './us-contact.component';

describe('UsContactComponent', () => {
  let component: UsContactComponent;
  let fixture: ComponentFixture<UsContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsContactComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
