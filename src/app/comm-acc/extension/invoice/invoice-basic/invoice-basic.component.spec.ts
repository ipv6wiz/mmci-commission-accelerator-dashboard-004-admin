import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBasicComponent } from './invoice-basic.component';

describe('InvoiceBasicComponent', () => {
  let component: InvoiceBasicComponent;
  let fixture: ComponentFixture<InvoiceBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceBasicComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
