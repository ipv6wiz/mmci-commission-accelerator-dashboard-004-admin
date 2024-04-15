import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancesDgComponent } from './advances-dg.component';

describe('AdvancesDgCurrentComponent', () => {
  let component: AdvancesDgComponent;
  let fixture: ComponentFixture<AdvancesDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancesDgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancesDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
