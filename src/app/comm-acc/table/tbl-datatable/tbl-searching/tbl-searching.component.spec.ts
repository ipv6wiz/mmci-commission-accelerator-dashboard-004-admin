import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblSearchingComponent } from './tbl-searching.component';

describe('TblSearchingComponent', () => {
  let component: TblSearchingComponent;
  let fixture: ComponentFixture<TblSearchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblSearchingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TblSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
