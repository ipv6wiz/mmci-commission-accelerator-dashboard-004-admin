import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUsersMatComponent } from './tbl-users-mat.component';

describe('TblUsersMatComponent', () => {
  let component: TblUsersMatComponent;
  let fixture: ComponentFixture<TblUsersMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUsersMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblUsersMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
