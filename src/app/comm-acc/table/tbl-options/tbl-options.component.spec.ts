import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblOptionsComponent } from './tbl-options.component';

describe('TblOptionsComponent', () => {
  let component: TblOptionsComponent;
  let fixture: ComponentFixture<TblOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TblOptionsComponent]
    });
    fixture = TestBed.createComponent(TblOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
