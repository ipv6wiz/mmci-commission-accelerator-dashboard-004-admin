import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import TblOptionsComponent from "../../table/tbl-options/tbl-options.component";

@Component({
  selector: 'app-dash-admin',
    standalone: true,
    imports: [CommonModule, SharedModule, TblOptionsComponent],
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.scss']
})
export default class DashAdminComponent {

}
