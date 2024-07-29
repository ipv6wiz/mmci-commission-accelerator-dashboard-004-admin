import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UccFiledDialogComponent } from './ucc-filed-dialog.component';

describe('UccFiledDialogComponent', () => {
  let component: UccFiledDialogComponent;
  let fixture: ComponentFixture<UccFiledDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UccFiledDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UccFiledDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
