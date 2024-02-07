import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {AuthenticationService} from "../../../theme/shared/service";
import {OptionsService} from "../../../theme/shared/service/options.service";
import CustomStore from "devextreme/data/custom_store";
import {lastValueFrom} from "rxjs";
import {ClientService} from "../../../theme/shared/service/client.service";
import {NGXLogger} from "ngx-logger";


@Component({
  selector: 'app-tbl-clients',
    standalone: true,
    imports: [CommonModule, SharedModule],
  templateUrl: './tbl-clients.component.html',
  styleUrls: ['./tbl-clients.component.scss']
})
export class TblClientsComponent {

    private clientDataFromGrid: any;
    dataSource: any;
    rolesDataSource: any;
    verifyDataSource: any;
    verifyIconVisible: boolean = true;
    verifyIconDisabled: boolean = false;
    tagBoxOptions: any = {
        // @ts-expect-error dataSource may be empty
        dataSource: this.rolesDataSource,
        displayExpr: 'key',
        valueExpr: 'value',
        hideSelectedItems: true,
        onValueChanged: (e: any) => {
            this.logger.log('updateNewUserRoles - e: ', e);
        }

    };

    @Output() clientVerifySelected: EventEmitter<any> = new EventEmitter();

    constructor(
        private authService: AuthenticationService,
        private optionsService: OptionsService,
        private clientsService: ClientService,
        private logger: NGXLogger
    ) {
        this.dataSource = new CustomStore({
            key: 'uid',
            load: ():any => {
                return lastValueFrom(this.clientsService.getAll(), {defaultValue: []})
                    .then((response: any) => {
                        // this.logger.log('datasource - load - clients: ', response.data.clients);
                        return response.data.clients;
                    })
                    .catch((err) => {
                        this.logger.log('dataSource - load - error: ', err.message);
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
        this.verifyClientClick = this.verifyClientClick.bind(this);
        // this.clientVerifySelected = new EventEmitter<any>();
        // this.logger.log('constructor - clientVerifySelected: ', this.clientVerifySelected)
    }

    verifyClientClick(e: any) {
        const clonedItem = { ...e.row.data};
        e.event.preventDefault();
        console.log('verifyClientEvent - clonedItem: ', clonedItem);
        this.clientDataFromGrid = clonedItem;
        this.clientVerifySelected.emit(this.clientDataFromGrid);
    }

    lostFocus() {
        console.log('TblClientsComponent >>>>>>>>>>>> lostFocus <<<<<<<<<<<<<<<<<<<<')
    }


    updateRoles(event: any, cellInfo: any) {
        this.logger.log('updateRoles - event: ', event);
        this.logger.log('updateRoles - cellInfo: ', cellInfo);
        cellInfo.setValue(event.value);
    }
}
