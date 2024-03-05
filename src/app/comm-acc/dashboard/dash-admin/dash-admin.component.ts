import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import { TblOptionsMatComponent } from '../../table/tbl-options-mat/tbl-options-mat.component';

@Component({
  selector: 'app-dash-admin',
    standalone: true,
    imports: [CommonModule, SharedModule, TblOptionsMatComponent],
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.scss']
})
export default class DashAdminComponent {

}
