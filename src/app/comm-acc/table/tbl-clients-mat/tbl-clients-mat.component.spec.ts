import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblClientsMatComponent } from './tbl-clients-mat.component';

describe('TblClientsMatComponent', () => {
  let component: TblClientsMatComponent;
  let fixture: ComponentFixture<TblClientsMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblClientsMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblClientsMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
