import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblClientsComponent } from './tbl-clients.component';

describe('TblClientsComponent', () => {
  let component: TblClientsComponent;
  let fixture: ComponentFixture<TblClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TblClientsComponent]
    });
    fixture = TestBed.createComponent(TblClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
