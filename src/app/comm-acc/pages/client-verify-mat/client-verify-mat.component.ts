import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClientService } from '../../../theme/shared/service/client.service';
import { NGXLogger } from 'ngx-logger';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CleanVerifyItemNamePipe } from '../../../theme/shared/pipes/clean-verify-item-name.pipe';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-client-verify-mat',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    CleanVerifyItemNamePipe,
    MatProgressSpinnerModule
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
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate'
  public loadSpinnerDiameter: string = '50'
  verifyStatus: any[] = [
    {
      status: 'Processing',
      hint: 'Verification item being processed',
      icon: 'bi-clipboard2-pulse-fill',
      iconColor: 'cornflowerblue'
    },
    {
      status: 'Auto Accept',
      hint: 'Client entered data exactly matches research data',
      icon: 'bi-check-circle-fill',
      iconColor: 'darkgreen'
    },
    {
      status: 'Auto Warn',
      hint: 'Client entered data almost matches research data, check & Override',
      icon: 'bi-exclamation-triangle-fill',
      iconColor: 'orange'
    },
    {
      status: 'Auto Reject',
      hint: 'Client entered data does not match research data, check & override',
      icon: 'bi-x-circle-fill',
      iconColor: 'red'
    },
    {
      status: 'Override Accept',
      hint: 'Data checked and deemed acceptable',
      icon: 'bi-clipboard2-check-fill',
      iconColor: 'darkgreen'
    },
    {
      status: 'Override Reject',
      hint: 'Data checked and deemed unacceptable',
      icon: 'bi-clipboard2-x-fill',
      iconColor: 'red'
    },
    {
      status: 'Request more Info',
      hint: 'Data checked & more information requested',
      icon: 'bi-info-circle-fill',
      iconColor: 'orange'
    }
  ];

  constructor(private clientsService: ClientService, private logger: NGXLogger) {
    console.log('ClientVerifyMatComponent - constructor');
  }

  ngOnInit() {
    console.log('ClientVerifyComponent - ngOnInit - Just so this method does not feel lonely');
    this.verifyDataSource = [];
    this.verifyData = null;
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log('ClientVerifyMatComponent - ngOnChanges - changes: ',changes);
    console.log('ClientVerifyMatComponent - ngOnChanges - clientData: ', this.clientData);
    console.log('ClientVerifyMatComponent - ngOnChanges - verifyData: ', this.verifyData);
    console.log('ClientVerifyMatComponent - ngOnChanges - loading: ', this.loadingVerification);
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

  private async loadClientVerifyData() {
    console.log('>>>>>> loadClientVerifyData - enter <<<<<<');

    this.verifyData = await lastValueFrom(this.clientsService.getClientVerification(this.clientData.uid), {defaultValue: []})
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

}
