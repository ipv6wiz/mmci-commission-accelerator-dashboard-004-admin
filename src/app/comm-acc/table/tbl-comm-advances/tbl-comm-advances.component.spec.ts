import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCommAdvancesComponent } from './tbl-comm-advances.component';

describe('TblCommAdvancesComponent', () => {
  let component: TblCommAdvancesComponent;
  let fixture: ComponentFixture<TblCommAdvancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCommAdvancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblCommAdvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
