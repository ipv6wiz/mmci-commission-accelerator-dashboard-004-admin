import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";


@Component({
  selector: 'app-dash-admin',
    standalone: true,
    imports: [CommonModule, SharedModule],
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.scss']
})
export default class DashAdminComponent {

}
