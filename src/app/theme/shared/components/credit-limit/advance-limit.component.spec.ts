import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceLimitComponent } from './advance-limit.component';

describe('CreditlimitComponent', () => {
  let component: AdvanceLimitComponent;
  let fixture: ComponentFixture<AdvanceLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceLimitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
