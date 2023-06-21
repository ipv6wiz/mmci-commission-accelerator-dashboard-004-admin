import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";

@Component({
  selector: 'app-dash-funds',
    standalone: true,
    imports: [CommonModule, SharedModule],
  templateUrl: './dash-funds.component.html',
  styleUrls: ['./dash-funds.component.scss']
})
export default class DashFundsComponent {

}
