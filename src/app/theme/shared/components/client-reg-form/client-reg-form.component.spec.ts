import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRegFormComponent } from './client-reg-form.component';

describe('ClientRegFormComponent', () => {
  let component: ClientRegFormComponent;
  let fixture: ComponentFixture<ClientRegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientRegFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
