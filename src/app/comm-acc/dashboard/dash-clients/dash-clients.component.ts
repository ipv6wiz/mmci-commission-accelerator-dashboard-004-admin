import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";

@Component({
  selector: 'app-dash-clients',
    standalone: true,
    imports: [CommonModule, SharedModule],
  templateUrl: './dash-clients.component.html',
  styleUrls: ['./dash-clients.component.scss']
})
export default class DashClientsComponent {

}
