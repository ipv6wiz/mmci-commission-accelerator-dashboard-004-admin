import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblNavComponent } from './tbl-nav.component';

describe('TblNavComponent', () => {
  let component: TblNavComponent;
  let fixture: ComponentFixture<TblNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TblNavComponent]
    });
    fixture = TestBed.createComponent(TblNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
