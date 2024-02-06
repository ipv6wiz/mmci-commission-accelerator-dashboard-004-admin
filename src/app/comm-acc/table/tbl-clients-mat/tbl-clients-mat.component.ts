import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    MatBoolDisplayPipe
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
  clientColumnsToDisplay: string[] = ["displayName","emailVerified", "email", "roles", "status"];
  clientColumnNamesToDisplay: string[] = ['Display Name', 'Email Verified', 'Email',  'Roles', 'Process Status'];
  columnsToDisplayWithExpand = [...this.clientColumnsToDisplay, 'expand'];
  expandedClient: ClientVerifyItemDto | null = null;
  public clientVerifyData: any = null;
  public loadingClients: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate'
  public loadSpinnerDiameter: string = '50'


  constructor(
    private optionsService: OptionsService,
    private clientsService: ClientService,
    private logger: NGXLogger
  ) {
    // this.verifyClientClick = this.verifyClientClick.bind(this);
    this.expandedClient = null;
    this.clientVerifyData = null;
  }

  isColumnTypeBool(data: any): boolean {
    if(typeof data === 'string') {
      const dx: string = data;
      if(dx.toLowerCase() === 'true' || dx.toLowerCase() === 'false') {
        return true;
      }
    }
    return (typeof data === 'boolean');
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
    await this.loadClientData();
    this.expandedClient = null;
  }

  private async loadClientData() {
    this.clientDataSource = await lastValueFrom(this.clientsService.getAll(), {defaultValue: []})
      .then((response: any) => {
        // this.logger.log('datasource - load - clients: ', response.data.clients);
        this.loadingClients = false;
        return response.data.clients;
      })
      .catch((err) => {
        this.logger.log('dataSource - load - error: ', err.message);
        return [];
      })
  }

  private async loadClientRolesData() {
    this.rolesDataSource = await this.optionsService.getOptionsByType('ClientRole');
  }

  verifyClientClick(e: any) {
    const clonedItem = { ...e.row.data};
    e.event.preventDefault();
    console.log('verifyClientEvent - clonedItem: ', clonedItem);
    this.clientDataFromGrid = clonedItem;
    this.clientVerifySelected.emit(this.clientDataFromGrid);
  }

}
