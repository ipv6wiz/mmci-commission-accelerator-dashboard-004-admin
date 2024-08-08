import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgersDgComponent } from './ledgers-dg.component';

describe('LdegersDgComponent', () => {
  let component: LedgersDgComponent;
  let fixture: ComponentFixture<LedgersDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgersDgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgersDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
