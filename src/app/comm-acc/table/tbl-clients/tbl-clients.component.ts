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

    constructor(
        private authService: AuthenticationService,
        private optionsService: OptionsService,
        private clientsService: ClientService
    ) {
        this.dataSource = new CustomStore({
            key: 'uid',
            load: ():any => {
                return lastValueFrom(this.clientsService.getAll(), {defaultValue: []})
            },

        });
    }
}
