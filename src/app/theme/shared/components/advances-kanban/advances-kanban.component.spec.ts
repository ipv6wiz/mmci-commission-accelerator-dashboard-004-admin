import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancesKanbanComponent } from './advances-kanban.component';

describe('AdvancesKanbanComponent', () => {
  let component: AdvancesKanbanComponent;
  let fixture: ComponentFixture<AdvancesKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancesKanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancesKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
