import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashClientsComponent } from './dash-clients.component';

describe('DashClientsComponent', () => {
  let component: DashClientsComponent;
  let fixture: ComponentFixture<DashClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashClientsComponent]
    });
    fixture = TestBed.createComponent(DashClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
