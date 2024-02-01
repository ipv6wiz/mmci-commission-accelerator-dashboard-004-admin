import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVerifyMatComponent } from './client-verify-mat.component';

describe('ClientVerifyMatComponent', () => {
  let component: ClientVerifyMatComponent;
  let fixture: ComponentFixture<ClientVerifyMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientVerifyMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientVerifyMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
