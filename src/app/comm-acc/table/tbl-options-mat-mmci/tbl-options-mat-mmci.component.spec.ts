import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblOptionsMatMmciComponent } from './tbl-options-mat-mmci.component';

describe('TblOptionsMatMmciComponent', () => {
  let component: TblOptionsMatMmciComponent;
  let fixture: ComponentFixture<TblOptionsMatMmciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblOptionsMatMmciComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblOptionsMatMmciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
