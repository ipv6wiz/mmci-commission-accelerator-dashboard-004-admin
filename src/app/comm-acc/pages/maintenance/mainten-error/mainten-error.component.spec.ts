import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenErrorComponent } from './mainten-error.component';

describe('MaintenErrorComponent', () => {
  let component: MaintenErrorComponent;
  let fixture: ComponentFixture<MaintenErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
