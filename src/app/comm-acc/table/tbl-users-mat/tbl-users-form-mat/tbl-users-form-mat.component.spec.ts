import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUsersFormMatComponent } from './tbl-users-form-mat.component';

describe('TblUsersFormMatComponent', () => {
  let component: TblUsersFormMatComponent;
  let fixture: ComponentFixture<TblUsersFormMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUsersFormMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblUsersFormMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
