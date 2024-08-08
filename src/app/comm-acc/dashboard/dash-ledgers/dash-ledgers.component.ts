import { Component } from '@angular/core';
import { TblLedgersMatComponent } from '../../table/tbl-ledgers-mat/tbl-ledgers-mat.component';

@Component({
  selector: 'app-dash-ledgers',
  standalone: true,
  imports: [
    TblLedgersMatComponent
  ],
  templateUrl: './dash-ledgers.component.html',
  styleUrl: './dash-ledgers.component.scss'
})
export default class DashLedgersComponent {

}
