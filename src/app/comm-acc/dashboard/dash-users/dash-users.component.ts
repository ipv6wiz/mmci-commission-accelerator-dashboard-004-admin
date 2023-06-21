import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";

@Component({
  selector: 'app-dash-users',
    standalone: true,
    imports: [CommonModule, SharedModule],
  templateUrl: './dash-users.component.html',
  styleUrls: ['./dash-users.component.scss']
})
export default class DashUsersComponent {

}
