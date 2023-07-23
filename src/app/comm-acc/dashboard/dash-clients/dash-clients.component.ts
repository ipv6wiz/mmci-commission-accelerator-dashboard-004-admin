import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {TblClientsComponent} from "../../table/tbl-clients/tbl-clients.component";
import {ClientVerifyComponent} from "../../pages/client-verify/client-verify.component";

@Component({
  selector: 'app-dash-clients',
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        TblClientsComponent,
        ClientVerifyComponent,
    ],
  templateUrl: './dash-clients.component.html',
  styleUrls: ['./dash-clients.component.scss']
})
export default class DashClientsComponent {
    public clientVerifyData: any;

    verifyClientData(clientData: any) {
        this.clientVerifyData = clientData;
        console.log('DashClientsComponent - verifyClient - clientData: ', this.clientVerifyData);
    }

}

