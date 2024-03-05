import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblOptionsMatComponent } from './tbl-options-mat.component';

describe('TblOptionsMatComponent', () => {
  let component: TblOptionsMatComponent;
  let fixture: ComponentFixture<TblOptionsMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblOptionsMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblOptionsMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
