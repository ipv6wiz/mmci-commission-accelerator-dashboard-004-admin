import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {DxAccordionModule} from "devextreme-angular";
import CustomStore from "devextreme/data/custom_store";
import {ClientService} from "../../../theme/shared/service/client.service";
import {lastValueFrom} from "rxjs";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-client-verify',
  standalone: true,
    imports: [CommonModule, SharedModule, DxAccordionModule],
  templateUrl: './client-verify.component.html',
  styleUrls: ['./client-verify.component.scss']
})
export class ClientVerifyComponent implements OnInit, OnChanges {
    @Input() clientData: any = {data: 'Some Data'};
    verifyDataSource: any;

    constructor(private clientsService: ClientService, private logger: NGXLogger) {}

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['clientData']) {
            this.loadClientVerifyData();
        }
    }
    loadClientVerifyData() {
        console.log('ClientVerifyComponent - clientData: ', this.clientData);
        this.verifyDataSource = new CustomStore({
            load: ():any => {
                return lastValueFrom(this.clientsService.getClientVerification(this.clientData.uid), {defaultValue: []})
                    .then((response: any) => {
                        console.log('loadClientVerifyData - items: ', response.data.items);
                        return response.data.items;
                    })
                    .catch((err) => {
                        this.logger.log('verifyDataSource - load - error: ', err.message);
                        return [];
                    })
            }
        });
    }


    protected readonly JSON = JSON;
}
