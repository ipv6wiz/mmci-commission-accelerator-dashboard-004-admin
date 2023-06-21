import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblSizingComponent } from './tbl-sizing.component';

describe('TblSizingComponent', () => {
  let component: TblSizingComponent;
  let fixture: ComponentFixture<TblSizingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblSizingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TblSizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
