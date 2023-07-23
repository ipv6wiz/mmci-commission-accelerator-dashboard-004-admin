import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVerifyComponent } from './client-verify.component';

describe('ClientVerifyComponent', () => {
  let component: ClientVerifyComponent;
  let fixture: ComponentFixture<ClientVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientVerifyComponent]
    });
    fixture = TestBed.createComponent(ClientVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
