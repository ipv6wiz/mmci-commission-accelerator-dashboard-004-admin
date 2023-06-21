import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblBasicComponent } from './tbl-basic.component';

describe('TblBasicComponent', () => {
  let component: TblBasicComponent;
  let fixture: ComponentFixture<TblBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblBasicComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TblBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
