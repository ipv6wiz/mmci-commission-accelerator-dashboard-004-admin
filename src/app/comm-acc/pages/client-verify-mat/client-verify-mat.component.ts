import { Component, effect, EffectRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
    FileManagerComponent
  ],
  templateUrl: './client-verify-mat.component.html',
  styleUrl: './client-verify-mat.component.scss'
})
export class ClientVerifyMatComponent implements OnInit, OnChanges {
  @Input() clientData: any = null;
  verifyDataSource: any[] = [];
  verifyData: any;
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
    }
  ];

  constructor(private clientsService: ClientService, private logger: NGXLogger) {
    console.log('ClientVerifyMatComponent - constructor');
    this.fileVerifyStatusRef = effect(() => {
      const fvs: FileVerifyStatusDto = fileVerifyStatusSignal();
      if(fvs.item) {
        console.log(`fileVerifyStatusSignal - action: ${fvs.action} - file name: ${fvs.item!.name} - status: ${fvs.item!.verifyStatus}`);
        // set doc file upload status
        // set Client Documents status based on composite of individual file verify Status
        console.log('verifyDataSource datatype : ', typeof this.verifyDataSource);
        this.updateClientDocsStatus();
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
    } else if(btn === 'reject') {
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
      } else if(changes['clientData'].currentValue !== null) {
        if(!this.verifyData ) {
          this.loadingVerification = true;
          await this.loadClientVerifyData();
          this.verifyDataSource = this.verifyData.items;
        } else if(this.clientData.uid !== this.verifyData.clientId) {
          this.loadingVerification = true;
          await this.loadClientVerifyData();
          this.verifyDataSource = this.verifyData.items;
        }
      }
    }
  }

  private async loadClientVerifyData(refresh: string = 'false') {
    console.log('>>>>>> loadClientVerifyData - enter <<<<<<');

    this.verifyData = await lastValueFrom(this.clientsService.getClientVerification(this.clientData.uid, refresh), {defaultValue: []})
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

  async refreshVerifcationData() {
    this.loadingVerification = true;
    await this.loadClientVerifyData('true');
    this.verifyDataSource = this.verifyData.items;
  }

  updateClientDocsStatus() {
    const docIndex = this.findItemIndex('CLIENT_DOCUMENTS');
    console.log('updateClientDocsStatus - docIndex: ', docIndex);

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
