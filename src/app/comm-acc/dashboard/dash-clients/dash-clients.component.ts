import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {TblClientsComponent} from "../../table/tbl-clients/tbl-clients.component";
import { ClientVerifyMatComponent } from '../../pages/client-verify-mat/client-verify-mat.component';
import { TblClientsMatComponent } from '../../table/tbl-clients-mat/tbl-clients-mat.component';

@Component({
  selector: 'app-dash-clients',
    standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TblClientsComponent,
    ClientVerifyMatComponent,
    TblClientsMatComponent
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

