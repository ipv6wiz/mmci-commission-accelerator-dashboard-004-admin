// Angular Import
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvTreeViewComponent } from './adv-tree-view.component';

describe('AdvTreeViewComponent', () => {
  let component: AdvTreeViewComponent;
  let fixture: ComponentFixture<AdvTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvTreeViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
