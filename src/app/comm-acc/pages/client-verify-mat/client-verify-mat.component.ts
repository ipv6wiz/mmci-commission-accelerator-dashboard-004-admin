import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClientService } from '../../../theme/shared/service/client.service';
import { NGXLogger } from 'ngx-logger';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CleanVerifyItemNamePipe } from '../../../theme/shared/pipes/clean-verify-item-name.pipe';

@Component({
  selector: 'app-client-verify-mat',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    CleanVerifyItemNamePipe
  ],
  templateUrl: './client-verify-mat.component.html',
  styleUrl: './client-verify-mat.component.scss'
})
export class ClientVerifyMatComponent implements OnInit, OnChanges {
  @Input() clientData: any = null;
  verifyDataSource: any[] = [];
  verifyData: any;
  loading: boolean = false;
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
    console.log('ClientVerifyMatComponent - ngOnChanges - loading: ', this.loading);
    if(!this.loading) {
      if(this.clientData === null) {
        this.verifyData = null;
      } else if(changes['clientData'].currentValue !== null) {
        if(!this.verifyData ) {
          this.loading = true;
          await this.loadClientVerifyData();
          this.verifyDataSource = this.verifyData.items;
        } else if(this.clientData.uid !== this.verifyData.clientId) {
          this.loading = true;
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
        this.loading = false;
        return response.data;
      })
      .catch((err) => {
        this.logger.log('verifyDataSource - load - error: ', err.message);
        return [];
      })
  }

}
