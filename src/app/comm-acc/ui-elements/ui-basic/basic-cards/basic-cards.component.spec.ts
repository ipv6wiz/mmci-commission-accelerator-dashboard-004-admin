import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCardsComponent } from './basic-cards.component';

describe('BasicCardsComponent', () => {
  let component: BasicCardsComponent;
  let fixture: ComponentFixture<BasicCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCardsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
