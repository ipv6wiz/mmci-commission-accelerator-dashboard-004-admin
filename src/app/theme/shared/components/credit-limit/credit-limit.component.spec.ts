import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLimitComponent } from './credit-limit.component';

describe('CreditlimitComponent', () => {
  let component: CreditLimitComponent;
  let fixture: ComponentFixture<CreditLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditLimitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
