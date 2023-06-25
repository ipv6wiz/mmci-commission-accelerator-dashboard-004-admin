import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";

@Component({
  selector: 'app-tbl-nav',
    standalone: true,
    imports: [CommonModule,SharedModule,],
  templateUrl: './tbl-nav.component.html',
  styleUrls: ['./tbl-nav.component.scss']
})
export class TblNavComponent {

}
