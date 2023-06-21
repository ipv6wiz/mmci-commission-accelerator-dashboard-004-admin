import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeCollapseMenuComponent } from './theme-collapse-menu.component';

describe('ThemeCollapseMenuComponent', () => {
  let component: ThemeCollapseMenuComponent;
  let fixture: ComponentFixture<ThemeCollapseMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeCollapseMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeCollapseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
