import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {TblUsersComponent} from "../../table/tbl-users/tbl-users.component";

@Component({
  selector: 'app-dash-users',
    standalone: true,
    imports: [CommonModule, SharedModule, TblUsersComponent],
  templateUrl: './dash-users.component.html',
  styleUrls: ['./dash-users.component.scss']
})
export default class DashUsersComponent {

}
