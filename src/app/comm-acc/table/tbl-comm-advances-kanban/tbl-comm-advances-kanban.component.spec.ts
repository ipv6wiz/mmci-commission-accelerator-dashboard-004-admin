import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCommAdvancesKanbanComponent } from './tbl-comm-advances-kanban.component';

describe('TblCommAdvancesKanbanComponent', () => {
  let component: TblCommAdvancesKanbanComponent;
  let fixture: ComponentFixture<TblCommAdvancesKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCommAdvancesKanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TblCommAdvancesKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
