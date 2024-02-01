import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {DxAccordionModule} from "devextreme-angular";
import CustomStore from "devextreme/data/custom_store";
import {ClientService} from "../../../theme/shared/service/client.service";
import {lastValueFrom} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {CleanVerifyItemNamePipe} from "../../../theme/shared/pipes/clean-verify-item-name.pipe";

@Component({
  selector: 'app-client-verify',
  standalone: true,
    imports: [CommonModule, SharedModule, DxAccordionModule, CleanVerifyItemNamePipe],
  templateUrl: './client-verify.component.html',
  styleUrls: ['./client-verify.component.scss']
})
export class ClientVerifyComponent implements OnInit, OnChanges {
    @Input() clientData: any = {data: 'Some Data'};
    verifyDataSource: any;
    verifyStatus: any[] = [
      {
        status: 'Processing',
        hint: 'Verification item being processed'
      },
      {
        status: 'Auto Accept',
        hint: 'Client entered data exactly matches research data'
      },
      {
        status: 'Auto Warn',
        hint: 'Client entered data almost matches research data, check & Override'
      },
      {
        status: 'Auto Reject',
        hint: 'Client entered data does not match research data, check & override'
      },
      {
        status: 'Override Accept',
        hint: 'Data checked and deemed acceptable'
      },
      {
        status: 'Override Reject',
        hint: 'Data checked and deemed unacceptable'
      },
      {
        status: 'Request more Info',
        hint: 'Data checked & more information requested'
      }
    ];

    constructor(private clientsService: ClientService, private logger: NGXLogger) {}

    ngOnInit() {
      console.log('ClientVerifyComponent - ngOnInit - Just so this method does not feel lonely')
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['clientData'] && this.clientData !== undefined) {
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
