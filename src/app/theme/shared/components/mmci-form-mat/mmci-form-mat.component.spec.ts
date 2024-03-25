import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmciFormMatComponent } from './mmci-form-mat.component';

describe('MmciFormMatComponent', () => {
  let component: MmciFormMatComponent;
  let fixture: ComponentFixture<MmciFormMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MmciFormMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MmciFormMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
