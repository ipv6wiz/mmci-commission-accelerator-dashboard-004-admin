import { Component, effect, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { OptionsService } from '../../../theme/shared/service/options.service';
import { ClientService } from '../../../theme/shared/service/client.service';
import { NGXLogger } from 'ngx-logger';
import { lastValueFrom } from 'rxjs';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClientVerifyItemDto } from '../../../theme/shared/dtos/client-verify-item-dto';
import { ClientVerifyMatComponent } from '../../pages/client-verify-mat/client-verify-mat.component';
import {ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { MatBoolDisplayPipe } from '../../../theme/shared/pipes/mat-bool-display.pipe';
import { clientRefreshSignal } from '../../../theme/shared/signals/client-refresh.signal';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceLimitComponent } from '../../../theme/shared/components/credit-limit/advance-limit.component';
import { Client } from '../../../theme/shared/entities/client.interface';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { ClientRegFormComponent } from '../../../theme/shared/components/client-reg-form/client-reg-form.component';
import { RegFormV2MatComponent } from '../../../theme/shared/components/reg-form-v2-mat/reg-form-v2-mat.component';

@Component({
  selector: 'app-tbl-clients-mat',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CardComponent,
    ClientVerifyMatComponent,
    MatProgressSpinnerModule,
    MatBoolDisplayPipe,
    MatTooltip,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './tbl-clients-mat.component.html',
  styleUrl: './tbl-clients-mat.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TblClientsMatComponent implements OnInit{
  @Output() clientVerifySelected: EventEmitter<any> = new EventEmitter();
  private clientDataFromGrid: any;
  clientDataSource: any;
  rolesDataSource: any;
  clientColumnsToDisplay: string[] = ["displayName","emailVerified", "email", "status", "limit"];
  clientColumnsConfig: Map<string, any> = new Map<string, any>([
    ['limit', {type: 'currency', mask: 'separator', thousandSeparator: ',', prefix: '$'}]
  ]);
  clientColumnNamesToDisplay: string[] = ['Display Name', 'Email', 'Email Address', 'Process Status', 'Advance Limit'];
  columnsToDisplayWithExpand = [...this.clientColumnsToDisplay,  'expand'];
  expandedClient: ClientVerifyItemDto | null = null;
  public clientVerifyData: any = null;
  public loadingClients: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate'
  public loadSpinnerDiameter: string = '50'
  private clientVerifyStatusRef: any;
  dataTypeTag:string =  'clients';



  constructor(
    private optionsService: OptionsService,
    private clientsService: ClientService,
    public helpers: HelpersService,
    public modal: MatDialog,
    private logger: NGXLogger
  ) {
    // this.verifyClientClick = this.verifyClientClick.bind(this);
    this.expandedClient = null;
    this.clientVerifyData = null;
    this.clientVerifyStatusRef = effect(() => {
      console.log('********----> TblClientsMatComponent - effect - clientVerifyStatusSignal')
      const crs = clientRefreshSignal();
      if(crs.refresh) {
        this.refreshClientData().then();
      }
    });
  }

  openCreditLimitModal(client:any) {
    this.modal.open(AdvanceLimitComponent, {
      data: {
        client
      }
    });
  }

  openClientRegFormModal(client: any) {
    this.expandedClient = null;
    this.clientVerifyData = null;
    this.modal.open(RegFormV2MatComponent, {
      height: '100%',
      data: {
        client
      }
    })
  }

  onExpandRow(event: any, client: any) {
    event.stopPropagation();
    console.log('onExpandRow - event: ', event);
    console.log('onExpandRow - client: ', client);
    console.log('onExpandRow - expandedClient (before): ', this.expandedClient);
    if(this.expandedClient === null) {
      this.expandedClient = client;
      this.clientVerifyData = client;
    } else {
      this.expandedClient = null;
      this.clientVerifyData = null;
    }
    console.log('onExpandRow - expandedClient (after): ', this.expandedClient);
  }

  async ngOnInit() {
    await this.refreshClientData();
    // this.clientVerifyData = null;
  }

  async refreshClientData() {
    this.loadingClients = true;
    this.clientDataSource = await this.loadClientData();
    this.expandedClient = null;
  }

  private async loadClientData(): Promise<Client[]> {
    try {
      const clientsResponse: Client[] = await this.clientsService.getAll();
      console.log('TblClientsMatComponent - loadClientData - response: ', clientsResponse);
      this.loadingClients = false;
      const clientsRaw = clientsResponse || [];
      console.log('TblClientsMatComponent - loadClientData - clientsRaw: ', clientsRaw);
      const clients: Client[] = [];
      clientsRaw.forEach((client: Client) => {
        if(client['creditLimit']) {
          if(client['creditLimit'].active) {
            client.limit = client['creditLimit'].limit;
          }
        }
        clients.push(client);
      });
      console.log('TblClientsMatComponent - loadClientData - clients: ', clients);
      return clients;
    } catch(err: any)  {
        // this.logger.log('dataSource - load - error: ', err.message);
        return [];
      }
  }

  private async loadClientRolesData() {
    this.rolesDataSource = this.optionsService.getOptionsByType('ClientRole');
  }

  verifyClientClick(e: any) {
    const clonedItem = { ...e.row.data};
    e.event.preventDefault();
    console.log('verifyClientEvent - clonedItem: ', clonedItem);
    this.clientDataFromGrid = clonedItem;
    this.clientVerifySelected.emit(this.clientDataFromGrid);
  }

  // async updateClient(clientId: string, clientData: any){
  //
  // }

}
