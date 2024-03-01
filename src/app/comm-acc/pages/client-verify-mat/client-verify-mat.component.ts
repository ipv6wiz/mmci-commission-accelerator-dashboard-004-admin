import { Component, effect, EffectRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ClientService } from '../../../theme/shared/service/client.service';
import { NGXLogger } from 'ngx-logger';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CleanVerifyItemNamePipe } from '../../../theme/shared/pipes/clean-verify-item-name.pipe';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { FileManagerComponent } from '../../../theme/shared/components/file-manager/file-manager.component';
import {
  fileVerifyStatusSignal
} from '../../../theme/shared/components/file-manager/signals/file-verify-status.signal';
import { FileVerifyStatusDto } from '../../../theme/shared/components/file-manager/dtos/file-verify-status.dto';
import { ClientVerifyService } from '../../../theme/shared/service/client-verify.service';
import { FileItem } from '../../../theme/shared/components/file-manager/dtos/file-item.interface';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { MatFormField } from '@angular/material/form-field';
import { SharedModule } from '../../../theme/shared/shared.module';
import { MatInput } from '@angular/material/input';
import {
  clientVerifyStatusSignal
} from '../../../theme/shared/components/file-manager/signals/clientVerifyStatus.signal';
import { clientRefreshSignal } from '../../../theme/shared/components/file-manager/signals/client-refresh.signal';
import { AuthenticationService } from '../../../theme/shared/service';

@Component({
  selector: 'app-client-verify-mat',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    CleanVerifyItemNamePipe,
    MatProgressSpinnerModule,
    MatTooltip,
    FileManagerComponent,
    MatFormField,
    SharedModule,
    MatInput
  ],
  templateUrl: './client-verify-mat.component.html',
  styleUrl: './client-verify-mat.component.scss'
})
export class ClientVerifyMatComponent implements OnInit, OnChanges {
  @Input() clientData: any = null;
  @ViewChild('adminInput') adminInput!: MatInput
  verifyDataSource: any[] = [];
  verifyData: any;
  verifyDocInfo: any;
  loadingVerification: boolean = false;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  private fileVerifyStatusRef: EffectRef;
  private clientVerifyStatusRef: EffectRef;
  verifyStatus: any[] = [
    { // 0
      status: 'Processing',
      hint: 'Verification item being processed',
      icon: 'bi-clipboard2-pulse-fill',
      iconColor: 'cornflowerblue'
    },
    { // 1
      status: 'Auto Accept',
      hint: 'Client entered data exactly matches research data',
      icon: 'bi-check-circle-fill',
      iconColor: 'darkgreen'
    },
    { // 2
      status: 'Auto Warn',
      hint: 'Client entered data almost matches research data, check & Override',
      icon: 'bi-exclamation-triangle-fill',
      iconColor: 'orange'
    },
    { // 3
      status: 'Auto Reject',
      hint: 'Client entered data does not match research data, check & override',
      icon: 'bi-x-circle-fill',
      iconColor: 'red'
    },
    { // 4
      status: 'Override Accept',
      hint: 'Data checked and deemed acceptable',
      icon: 'bi-clipboard2-check-fill',
      iconColor: 'darkgreen'
    },
    { // 5
      status: 'Override Reject',
      hint: 'Data checked and deemed unacceptable',
      icon: 'bi-clipboard2-x-fill',
      iconColor: 'red'
    },
    { // 6
      status: 'Request more Info',
      hint: 'Data checked & more information requested',
      icon: 'bi-info-circle-fill',
      iconColor: 'orange'
    },
    { // 7
      status: 'Admin Override',
      hint: 'Admin entered data takes precedence',
      icon: 'bi-keyboard-fill',
      iconColor: 'orange'
    }
  ];

  private verifyStatusAcceptLst: number[] = [1,4,7];

  constructor(
    private helpers: HelpersService,
    private clientService: ClientService,
    private clientVerifyService: ClientVerifyService,
    private authService: AuthenticationService,
    private logger: NGXLogger) {
    console.log('ClientVerifyMatComponent - constructor');
    this.fileVerifyStatusRef = effect(async () => {
      const fvs: FileVerifyStatusDto = fileVerifyStatusSignal();
      if(fvs.action !== 'none' && fvs.item) {
        console.log(`fileVerifyStatusSignal - action: ${fvs.action} - file name: ${fvs.item!.name} - status: ${fvs.item!.verifyStatus}`);
        await this.updateClientVerifyDocStatus(fvs);
        await this.updateClientDocItem(fvs);
      } else {
        console.log(`fileVerifyStatusSignal - NO ITEM`);
      }
    });
    this.clientVerifyStatusRef = effect(async () => {
      const vsm = clientVerifyStatusSignal();
      const overallStatus = vsm.overall;
      console.log('clientVerifyStatus - verifyStatusMap: ', vsm.statusMap);
      console.log('clientVerifyStatus - overallStatus: ', overallStatus);
      console.log('clientVerifyStatus - effect - clientData: ', this.clientData);
      if(vsm.statusMap.size > 0) {
        console.log('clientVerifyStatusSignal - effect - vsm.statusMap.size: ', vsm.statusMap.size);
        console.log('clientVerifyStatusSignal - effect - roles: ', this.clientData.roles);
        if(vsm.overall && !this.clientData.roles.includes('CLIENT-VERIFIED')) {
          console.log('clientVerifyStatusSignal - effect - about to update to CLIENT-VERIFIED');
          await this.clientUpdateRole(vsm.clientId, 'CLIENT-VERIFIED');
        }
        else if(!vsm.overall && !this.clientData.roles.includes('CLIENT-PENDING-VERIFICATION')) {
          console.log('clientVerifyStatusSignal - effect - about to update to CLIENT-PENDING-VERIFICATION');
          await this.clientUpdateRole(vsm.clientId, 'CLIENT-PENDING-VERIFICATION');
        }

      }
    });
  }

  ngOnInit() {
    // console.log('ClientVerifyComponent - ngOnInit - Just so this method does not feel lonely');
    this.verifyDataSource = [];
    this.verifyData = null;
  }

  itemDisable(btn: string, item: any): boolean {
    if(btn == 'accept') {
      return item.value['status'] === 1 || item.value['status'] === 4;
    } else if(btn === 'reject' || btn === 'enter') {
      return item.value['status'] === 3 || item.value['status'] === 5;
    }
    return false;
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log('ClientVerifyMatComponent - ngOnChanges - clientData: ', this.clientData);
    if(!this.loadingVerification) {
      if(this.clientData === null) {
        this.verifyData = null;
        this.verifyDocInfo = null;
      } else if(changes['clientData'].currentValue !== null) {
        if(!this.verifyData || this.clientData.uid !== this.verifyData.clientId) {
          this.loadingVerification = true;
          await this.loadClientVerifyData();
          this.verifyDataSource = this.verifyData.items;
          const docIndex = this.findItemIndex('CLIENT_DOCUMENTS');
          this.verifyDocInfo = this.verifyDataSource[docIndex].value['researchData']['data'];
          this.setClientVerifyStatusSignal(this.clientData.uid)
        }
      }
    }
  }

  private setClientVerifyStatusSignal(clientId: string) {
    const statusMap = this.populateClientVerifyStatusMap();
    clientVerifyStatusSignal.set({statusMap, overall: this.calcClientOverallVerifyStatus(statusMap), clientId });
  }

  private calcClientOverallVerifyStatus(statusMap: Map<string, boolean>): boolean {
    const smi = statusMap.values();
    let overall = true;
    for(const v of smi) {
      if(overall && !v) {
        overall = v;
        break;
      }
    }
    return overall;
  }

  private populateClientVerifyStatusMap() {
    const verifyStatusMap = new Map<string, boolean>();
    this.verifyDataSource.forEach((item) => {
      const status = this.verifyStatusAcceptLst.includes(item.value.status);
      verifyStatusMap.set(item.key, status);
    });
    console.log('populateClientVerifyStatusMap - verifyStatusMap; ', verifyStatusMap);
    return verifyStatusMap;
  }

  adminDataEntryEdit(event: any, item:any) {
    console.log('adminDataEntryEdit - event: ', event);
    const itemIndex = this.findItemIndex(item.key);
    this.verifyDataSource[itemIndex].value['adminEnteredData']['editable'] = true;
    console.log('adminDataEntryEdit - item: ', this.verifyDataSource[itemIndex].value['adminEnteredData']);
    console.log('adminDataEntryEdit - adminInput: ', this.adminInput);
    this.adminInput.focus();

    // this.adminInput.focused = true;
  }

  adminDataEntrySave(event: any, item:any) {
    console.log('adminDataEntrySave - event: ', event);
    const itemIndex = this.findItemIndex(item.key);
    this.verifyDataSource[itemIndex].value['adminEnteredData']['editable'] = false;
    console.log('adminDataEntrySave - item: ', this.verifyDataSource[itemIndex].value['adminEnteredData']);
    this.adminInput.focused = false;
  }

  adminDataEntry(event: any, item: any) {
    console.log('adminDataEntry - event: ', event);
    const itemIndex = this.findItemIndex(item.key);
    if(!item.value['adminEnteredData']) {
      const adminInfo = {
        source: 'Admin entered data',
        infoType: item.key,
        data: 'My Placeholder',
        editable: false
      }
      this.verifyDataSource[itemIndex].value['adminEnteredData'] = adminInfo;
    }
    console.log('adminDataEntry - item: ', this.verifyDataSource[itemIndex].value);
  }

  private async loadClientVerifyData(refresh: string = 'false') {
    console.log('>>>>>> loadClientVerifyData - enter <<<<<<');

    this.verifyData = await lastValueFrom(this.clientVerifyService.getClientVerification(this.clientData.uid, refresh), {defaultValue: []})
      .then((response: any) => {
        console.log('loadClientVerifyData - items: ', response.data.items);
        this.loadingVerification = false;
        return response.data;
      })
      .catch((err) => {
        this.logger.log('verifyDataSource - load - error: ', err.message);
        return [];
      })
  }

  async refreshVerificationData() {
    this.loadingVerification = true;
    await this.loadClientVerifyData('true');
    this.verifyDataSource = this.verifyData.items;
    const docIndex = this.findItemIndex('CLIENT_DOCUMENTS');
    this.updateClientDocumentsVerifyStatus(docIndex);
    this.setClientVerifyStatusSignal(this.clientData.uid);
  }

  async updateClientVerifyDocStatus(fvs: FileVerifyStatusDto) {
    console.log('>>>>>>>> Enter updateClientVerifyDocStatus <<<<<<<<<<<')
    const item: FileItem | undefined = fvs.item;
    const clientId: string | undefined = fvs.clientId;
    if(item && clientId) {
      const docIndex = this.findItemIndex('CLIENT_DOCUMENTS');
      if(docIndex !== -1) {
        const folderProp = item.meta.metadata.ctrlName;
        this.verifyDataSource[docIndex].value['researchData']['data'][folderProp]['status'] = item.verifyStatus;
        console.log('updateClientDocsStatus - updated status: ', this.verifyDataSource[docIndex].value['researchData']['data'][folderProp]);
        const infoItem = this.verifyDataSource[docIndex].value['researchData']['data'][folderProp];
        console.log('updateClientVerifyDocStatus - infoItem: ', infoItem);
        const allDocsOk = this.updateClientDocumentsVerifyStatus(docIndex);
        await lastValueFrom(this.clientVerifyService.updateClientVerifyDocItem(clientId, infoItem, allDocsOk))
          .then((response: any) => {
            console.log('updateClientDocsStatus - response: ', response);
            if(response.statusCode === 200) {
              return response.data;
            } else {
              throw new Error(response.msg);
            }
          })
          .catch((err) => {
            this.logger.log('updateClientDocsStatus - error: ', err.message);
            return null;
          });
        this.updateClientDocumentsVerifyStatus(docIndex);
      } else {
        console.log('@@@@@@@@---> CLIENT_DOCUMENTS NOT Found');
      }
    }
  }

  async clientUpdateRole(clientId: string, role: string) {
    const data = {roles: [role], status: this.setClientStatus(role)}
    await lastValueFrom(this.clientService.updateClient(clientId, data))
      .then((response: any) => {
        if(response.statusCode === 200) {
          clientRefreshSignal.set({refresh: true, clientId});
          return response.data
        }  else {
          clientRefreshSignal.set({refresh: false, clientId});
          throw new Error(response.msg);
        }
      })
      .catch((err: any) => {
        this.logger.log('clientUpdateRole - error: ', err.message);
        return null;
      });
  }

  setClientStatus(role: string): string {
    let status: string = '';
    switch(role) {
      case 'CLIENT-PENDING-REGISTRATION':
        status = 'Client Pending Registration';
        break;
      case 'CLIENT-PENDING-VERIFICATION':
        status = 'Client Pending Verification';
        break;
      case 'CLIENT-VERIFIED':
        status = 'Client Verified'
        break;
    }
    return status;
  }


  updateClientDocumentsVerifyStatus(docIndex: number) {
    let allDocsOk: boolean = true;
    const docs = this.verifyDataSource[docIndex].value['researchData']['data'];
    const keys = Object.keys(docs);
    console.log('==========>>>>>>>  docs - keys: ', keys);
    keys.forEach((key: any) => {
      const item = docs[key];
      if(allDocsOk) {
        allDocsOk = item.status === 4;
      }
    });
    this.verifyDataSource[docIndex].value['status'] = allDocsOk ? 4 : 5; // 4 = Override Accept, 5 = Override Reject
    return allDocsOk;
  }

  async updateClientDocItem(fvs: FileVerifyStatusDto) {
    const item: FileItem | undefined = fvs.item;
    const clientId: string | undefined = fvs.clientId;
    console.log('updateClientDocItem - clientId: ', clientId);
    console.log('updateClientDocItem - item: ', item);
    if(item && clientId) {
      const updateResponse = await lastValueFrom(this.clientService.updateClientDocItem(clientId, item))
        .then((response: any) => {
          if(response.statusCode === 200) {
            this.setClientVerifyStatusSignal(clientId);
            return response;
          } else {
            throw Error(response.msg);
          }
        })
        .catch((err) => {
          this.logger.log('updateClientDocItem - error: ', err.message);
          return null;
        });
      console.log('updateClientDocItem - updateResponse: ', updateResponse);
    }
  }

  findItemIndex(key: string): number {
    console.log('~~~~~~----> findItemIndex - verifyDataSource: ', this.verifyDataSource);
    return this.verifyDataSource.findIndex((item) => item.key === key);
  }

}
