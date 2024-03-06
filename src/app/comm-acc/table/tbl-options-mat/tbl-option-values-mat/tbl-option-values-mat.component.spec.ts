import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblOptionValuesMatComponent } from './tbl-option-values-mat.component';

describe('TblOptionValuesMatComponent', () => {
  let component: TblOptionValuesMatComponent;
  let fixture: ComponentFixture<TblOptionValuesMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblOptionValuesMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblOptionValuesMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
