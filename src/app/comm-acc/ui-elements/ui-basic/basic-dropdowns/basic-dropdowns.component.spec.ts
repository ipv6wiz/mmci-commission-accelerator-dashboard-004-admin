import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDropdownsComponent } from './basic-dropdowns.component';

describe('BasicDropdownsComponent', () => {
  let component: BasicDropdownsComponent;
  let fixture: ComponentFixture<BasicDropdownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDropdownsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicDropdownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
