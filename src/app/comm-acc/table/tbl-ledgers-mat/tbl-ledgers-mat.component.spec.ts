import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblLedgersMatComponent } from './tbl-ledgers-mat.component';

describe('TblLedgersMatComponent', () => {
  let component: TblLedgersMatComponent;
  let fixture: ComponentFixture<TblLedgersMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblLedgersMatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblLedgersMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
