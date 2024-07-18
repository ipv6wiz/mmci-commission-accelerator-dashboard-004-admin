import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionValuesDgComponent } from './option-values-dg.component';

describe('OptionValueDgComponent', () => {
  let component: OptionValuesDgComponent;
  let fixture: ComponentFixture<OptionValuesDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionValuesDgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionValuesDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
