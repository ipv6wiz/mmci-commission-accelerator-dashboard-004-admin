import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicOffcanvasComponent } from './basic-offcanvas.component';

describe('BasicOffcanvasComponent', () => {
  let component: BasicOffcanvasComponent;
  let fixture: ComponentFixture<BasicOffcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicOffcanvasComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
