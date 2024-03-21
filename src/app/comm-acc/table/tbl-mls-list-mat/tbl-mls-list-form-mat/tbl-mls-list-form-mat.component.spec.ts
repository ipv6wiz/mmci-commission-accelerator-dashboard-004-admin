import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblMlsListFormMatComponent } from './tbl-mls-list-form-mat.component';

describe('TblMlsListFormMatComponent', () => {
  let component: TblMlsListFormMatComponent;
  let fixture: ComponentFixture<TblMlsListFormMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblMlsListFormMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblMlsListFormMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
