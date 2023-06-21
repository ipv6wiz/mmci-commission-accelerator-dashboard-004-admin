import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicProgressComponent } from './basic-progress.component';

describe('BasicProgressComponent', () => {
  let component: BasicProgressComponent;
  let fixture: ComponentFixture<BasicProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicProgressComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
