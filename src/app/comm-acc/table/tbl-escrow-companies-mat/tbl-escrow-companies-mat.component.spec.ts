import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblEscrowCompaniesMatComponent } from './tbl-escrow-companies-mat.component';

describe('EscrowCompaniesMatComponent', () => {
  let component: TblEscrowCompaniesMatComponent;
  let fixture: ComponentFixture<TblEscrowCompaniesMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblEscrowCompaniesMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblEscrowCompaniesMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
