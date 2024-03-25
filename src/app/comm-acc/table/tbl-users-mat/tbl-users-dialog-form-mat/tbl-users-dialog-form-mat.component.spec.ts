import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUsersDialogFormMatComponent } from './tbl-users-dialog-form-mat.component';

describe('TblUsersDialogFormMatComponent', () => {
  let component: TblUsersDialogFormMatComponent;
  let fixture: ComponentFixture<TblUsersDialogFormMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUsersDialogFormMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblUsersDialogFormMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
