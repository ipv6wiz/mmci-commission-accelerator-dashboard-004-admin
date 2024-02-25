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

  constructor(
    private helpers: HelpersService,
    private clientService: ClientService,
    private clientVerifyService: ClientVerifyService,
    private logger: NGXLogger) {
    console.log('ClientVerifyMatComponent - constructor');
    this.fileVerifyStatusRef = effect(async () => {
      const fvs: FileVerifyStatusDto = fileVerifyStatusSignal();
      if(fvs.item) {
        console.log(`fileVerifyStatusSignal - action: ${fvs.action} - file name: ${fvs.item!.name} - status: ${fvs.item!.verifyStatus}`);
        await this.updateClientVerifyDocStatus(fvs);
        await this.updateClientDocItem(fvs)
      } else {
        console.log(`fileVerifyStatusSignal - NO ITEM`);
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
    // console.log('ClientVerifyMatComponent - ngOnChanges - changes: ',changes);
    console.log('ClientVerifyMatComponent - ngOnChanges - clientData: ', this.clientData);
    // console.log('ClientVerifyMatComponent - ngOnChanges - verifyData: ', this.verifyData);
    // console.log('ClientVerifyMatComponent - ngOnChanges - loading: ', this.loadingVerification);
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
        }
        // else if(this.clientData.uid !== this.verifyData.clientId) {
        //   this.loadingVerification = true;
        //   await this.loadClientVerifyData();
        //   this.verifyDataSource = this.verifyData.items;
        // }
      }
    }
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
  }

  async updateClientVerifyDocStatus(fvs: FileVerifyStatusDto) {
    const item: FileItem | undefined = fvs.item;
    const clientId: string | undefined = fvs.clientId;
    if(item && clientId) {
      const docIndex = this.findItemIndex('CLIENT_DOCUMENTS');
      const folderProp = item.meta.metadata.ctrlName;
      this.verifyDataSource[docIndex].value['researchData']['data'][folderProp]['status'] = item.verifyStatus;
      console.log('updateClientDocsStatus - updated status: ', this.verifyDataSource[docIndex].value['researchData']['data'][folderProp]);
      const infoItem = this.verifyDataSource[docIndex].value['researchData']['data'][folderProp];
      console.log('updateClientVerifyDocStatus - infoItem: ', infoItem);
      const allDocsOk = this.updateClientDocumentsVerifyStatus(docIndex);
      await lastValueFrom(this.clientVerifyService.updateClientVerifyDocItem(clientId, infoItem, allDocsOk))
        .then((response: any) => {
          console.log('updateClientDocsStatus - response: ', response);
          return response.data;
        })
        .catch((err) => {
          this.logger.log('updateClientDocsStatus - error: ', err.message);
          return null;
        });
      this.updateClientDocumentsVerifyStatus(docIndex);
    }
  }

  updateClientDocumentsVerifyStatus(docIndex: number) {
    let allDocsOk: boolean = true;
    const docs = this.verifyDataSource[docIndex].value['researchData']['data'];
    const keys = Object.keys(docs);
    console.log('==========>>>>>>>  docs - keys: ', keys);
    keys.forEach((key: any) => {
      const item = docs[key];
      // console.log(`=======>>>>> item - ctrlName: ${item.ctrlName} - status: ${item.status}`);
      if(allDocsOk) {
        allDocsOk = item.status === 4;
      }
      // console.log(`=======>>>>> allDockOK: ${allDocsOk ? 'TRUE' : 'FALSE'}`)
    });
    this.verifyDataSource[docIndex].value['status'] = allDocsOk ? 4 : 5; // 4 = Override Accept, 5 = Override Reject
    return allDocsOk;
  }

  // private convertFileItemToInfoItem(fileItem: FileItem): ClientDocInfoItemDto {
  //   const infoItem: ClientDocInfoItemDto = {
  //     fileName: fileItem.name,
  //     folder: fileItem.folder,
  //     status: fileItem.verifyStatus,
  //
  //   }
  // }

  async updateClientDocItem(fvs: FileVerifyStatusDto) {
    const item: FileItem | undefined = fvs.item;
    const clientId: string | undefined = fvs.clientId;
    console.log('updateClientDocItem - clientId: ', clientId);
    console.log('updateClientDocItem - item: ', item);
    if(item && clientId) {
      const updateResponse = await lastValueFrom(this.clientService.updateClientDocItem(clientId, item))
        .then((response: any) => {
          return response.data;
        })
        .catch((err) => {
          this.logger.log('updateClientDocItem - error: ', err.message);
          return null;
        });
      console.log('updateClientDocItem - updateResponse: ', updateResponse);
    }
  }

  // async saveRegistrantData() {
  //   try {
  //     if(!this.registrant.agentDreData) {
  //       this.registrant.agentDreData = this.dreLicenseData;
  //     }
  //     const response = await this.regService.saveRegForm(this.registrant);
  //     console.log('saveRegistrantData - response: ', response);
  //     return response;
  //   } catch (e: any) {
  //     throw new Error(e.message);
  //   }
  // }

  findItemIndex(key: string): number {
    return this.verifyDataSource.findIndex((item) => item.key === key);
  }

}
