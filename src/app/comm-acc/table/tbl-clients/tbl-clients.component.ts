import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {AuthenticationService} from "../../../theme/shared/service";
import {OptionsService} from "../../../theme/shared/service/options.service";
import CustomStore from "devextreme/data/custom_store";
import {lastValueFrom} from "rxjs";
import {ClientService} from "../../../theme/shared/service/client.service";

@Component({
  selector: 'app-tbl-clients',
    standalone: true,
    imports: [CommonModule, SharedModule],
  templateUrl: './tbl-clients.component.html',
  styleUrls: ['./tbl-clients.component.scss']
})
export class TblClientsComponent {
    dataSource: any;
    rolesDataSource: any;
    tagBoxOptions: any = {
        // @ts-ignore
        dataSource: this.rolesDataSource,
        displayExpr: 'key',
        valueExpr: 'value',
        hideSelectedItems: true,
        onValueChanged: (e: any) => {
            console.log('updateNewUserRoles - e: ', e);
        }

    };

    constructor(
        private authService: AuthenticationService,
        private optionsService: OptionsService,
        private clientsService: ClientService
    ) {
        this.dataSource = new CustomStore({
            key: 'uid',
            load: ():any => {
                return lastValueFrom(this.clientsService.getAll(), {defaultValue: []})
                    .then((response: any) => {
                        console.log('datasource - load - clients: ', response.data.clients);
                        // @ts-ignore
                        return response.data.clients;
                    })
                    .catch((err) => {
                        console.log('dataSource - load - error: ', err.message);
                        return [];
                    })
            },

        });

        this.rolesDataSource = new CustomStore({
            key: 'uid',
            load: (): any => {
                return this.optionsService.getOptionsByType('Role');
            }
        });
        this.tagBoxOptions.dataSource = this.rolesDataSource;
    }


    updateRoles(event: any, cellInfo: any) {
        console.log('updateRoles - event: ', event);
        console.log('updateRoles - cellInfo: ', cellInfo);
        cellInfo.setValue(event.value);
    }
}
