import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblEscrowCompanyFormMatComponent } from './tbl-escrow-company-form-mat.component';

describe('TblEscrowCompanyFormMatComponent', () => {
  let component: TblEscrowCompanyFormMatComponent;
  let fixture: ComponentFixture<TblEscrowCompanyFormMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblEscrowCompanyFormMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblEscrowCompanyFormMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
