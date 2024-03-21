import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblMlsListMatComponent } from './tbl-mls-list-mat.component';

describe('TblMlsListMatComponent', () => {
  let component: TblMlsListMatComponent;
  let fixture: ComponentFixture<TblMlsListMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblMlsListMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblMlsListMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
