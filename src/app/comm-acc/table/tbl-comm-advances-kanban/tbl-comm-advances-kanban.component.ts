import { Component } from '@angular/core';
import { AdvancesKanbanComponent } from '../../../theme/shared/components/advances-kanban/advances-kanban.component';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-tbl-comm-advances-kanban',
  standalone: true,
  imports: [
    AdvancesKanbanComponent,
    MatCard,
    MatCardContent
  ],
  templateUrl: './tbl-comm-advances-kanban.component.html',
  styleUrl: './tbl-comm-advances-kanban.component.scss'
})
export class TblCommAdvancesKanbanComponent {

}
