import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicListGroupComponent } from './basic-list-group.component';

describe('BasicListGroupComponent', () => {
  let component: BasicListGroupComponent;
  let fixture: ComponentFixture<BasicListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicListGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
