import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblOptionValuesFormMatComponent } from './tbl-option-values-form-mat.component';

describe('TblOptionValuesFormMatComponent', () => {
  let component: TblOptionValuesFormMatComponent;
  let fixture: ComponentFixture<TblOptionValuesFormMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblOptionValuesFormMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblOptionValuesFormMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
