import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";

import { TblUsersMatComponent } from '../../table/tbl-users-mat/tbl-users-mat.component';

@Component({
  selector: 'app-dash-users',
    standalone: true,
    imports: [CommonModule, SharedModule, TblUsersMatComponent],
  templateUrl: './dash-users.component.html',
  styleUrls: ['./dash-users.component.scss']
})
export default class DashUsersComponent {

}
