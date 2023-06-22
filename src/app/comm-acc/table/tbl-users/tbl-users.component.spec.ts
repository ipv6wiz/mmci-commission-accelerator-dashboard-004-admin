import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUsersComponent } from './tbl-users.component';

describe('TblUsersComponent', () => {
  let component: TblUsersComponent;
  let fixture: ComponentFixture<TblUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TblUsersComponent]
    });
    fixture = TestBed.createComponent(TblUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
