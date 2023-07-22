import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {TblClientsComponent} from "../../table/tbl-clients/tbl-clients.component";

@Component({
  selector: 'app-dash-clients',
    standalone: true,
    imports: [CommonModule, SharedModule, TblClientsComponent],
  templateUrl: './dash-clients.component.html',
  styleUrls: ['./dash-clients.component.scss']
})
export default class DashClientsComponent {

}
