import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblBorderComponent } from './tbl-border.component';

describe('TblBorderComponent', () => {
  let component: TblBorderComponent;
  let fixture: ComponentFixture<TblBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblBorderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TblBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
