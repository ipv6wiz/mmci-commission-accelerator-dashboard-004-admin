import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsDgComponent } from './options-dg.component';

describe('OptionsDgComponent', () => {
  let component: OptionsDgComponent;
  let fixture: ComponentFixture<OptionsDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsDgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
