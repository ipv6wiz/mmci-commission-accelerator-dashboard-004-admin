import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSpinnerComponent } from './basic-spinner.component';

describe('BasicSpinnerComponent', () => {
  let component: BasicSpinnerComponent;
  let fixture: ComponentFixture<BasicSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
