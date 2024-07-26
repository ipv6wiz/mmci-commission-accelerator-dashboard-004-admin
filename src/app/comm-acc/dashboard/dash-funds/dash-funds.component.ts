import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import { TblCommAdvancesComponent } from '../../table/tbl-comm-advances/tbl-comm-advances.component';
import {
  TblCommAdvancesKanbanComponent
} from '../../table/tbl-comm-advances-kanban/tbl-comm-advances-kanban.component';

@Component({
  selector: 'app-dash-funds',
    standalone: true,
  imports: [CommonModule, SharedModule, TblCommAdvancesComponent, TblCommAdvancesKanbanComponent],
  templateUrl: './dash-funds.component.html',
  styleUrls: ['./dash-funds.component.scss']
})
export default class DashFundsComponent {

}
