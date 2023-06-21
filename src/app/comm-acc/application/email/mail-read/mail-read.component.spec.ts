import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailReadComponent } from './mail-read.component';

describe('MailReadComponent', () => {
  let component: MailReadComponent;
  let fixture: ComponentFixture<MailReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailReadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MailReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
