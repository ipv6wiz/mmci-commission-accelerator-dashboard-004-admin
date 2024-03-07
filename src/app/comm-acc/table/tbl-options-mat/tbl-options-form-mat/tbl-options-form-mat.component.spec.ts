import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblOptionsFormMatComponent } from './tbl-options-form-mat.component';

describe('TblOptionsFormMatComponent', () => {
  let component: TblOptionsFormMatComponent;
  let fixture: ComponentFixture<TblOptionsFormMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblOptionsFormMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblOptionsFormMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
