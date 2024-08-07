import { Injectable } from '@angular/core';
import { ApiResponse } from '../dtos/api-response.dto';
import { AdvanceService } from './advance.service';
import { OptionValue } from '../entities/option-values.interface';
import { OptionsService } from './options.service';
import { EmailSendService } from './email-send.service';
import { AdvanceEntity } from '../entities/advance.entity';
import { MailOutWithTemplateEntity } from '../entities/mail-out-with-template.entity';
import { advanceKanbanRefreshSignal } from '../signals/advance-kanban-refresh.signal';
import { HelpersService } from './helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyInfoDto } from '../dtos/company-info.dto';
import { AddressDto } from '../dtos/address.dto';
import { FundingEmailSettingsDto } from '../dtos/funding-email-settings.dto';
import { ColumnsModel } from '@syncfusion/ej2-angular-kanban';
import { AdvanceWorkflowDialogConfigEntity } from '../entities/advance-workflow-dialog-config.entity';
import { AdvanceStatusConfigDto } from '../dtos/advance-status-config.dto';

@Injectable({
  providedIn: 'root'
})
export class AdvanceHelpersService {

  constructor(
    private modal: MatDialog,
    private service: AdvanceService,
    private optionsService: OptionsService,
    private emailSendService: EmailSendService,
    private helpers: HelpersService
  ) { }

  async getAdvanceStatusFromOptions(): Promise<AdvanceStatusConfigDto> {
    const colMatIcons: string[] = [];
    let advanceOptionsItems: Map<string, AdvanceWorkflowDialogConfigEntity>;
    try {
      const statusListResponse: ApiResponse = await this.optionsService.loadValuesByType('AdvanceStatus');
      if(statusListResponse.statusCode === 200) {
        const items: OptionValue[] = statusListResponse.data.items;
        advanceOptionsItems = this.makeAdvanceOptionItems(items);
        const columnsList: ColumnsModel[] = [];
        items.forEach((item: OptionValue) => {
          if(item.displayValue) {
            console.log('getAdvanceStatusFromOptions - displayValue: ', item.displayValue);
            colMatIcons.push(item.displayValue);
          }
          const colItem: ColumnsModel = {
            headerText: item.value,
            keyField: item.key,
            allowToggle: true
          }
          columnsList.push(colItem);
        });
        return {
          columnsList,
          advanceOptionsItems,
          colMatIcons
        };
      } else {
        throw new Error('Error loading Advance Status list from Options')
      }
    } catch(err: any) {
      throw new Error(err.message);
    }
  }

  private makeAdvanceOptionItems(items: OptionValue[]): Map<string, AdvanceWorkflowDialogConfigEntity> {
    const optMap: Map<string, AdvanceWorkflowDialogConfigEntity> = new Map<string, AdvanceWorkflowDialogConfigEntity>();
    items.forEach((item: OptionValue) => {
      const optItem: AdvanceWorkflowDialogConfigEntity = {
        key: item.key,
        kanbanColumnLabel: item.value,
        kanbanColumnIcon: item.displayValue || '',
        dialogAcceptButtonText: item.description || '',
      };
      optMap.set(item.key, optItem);
    })
    return optMap;
  }

  async updateAdvanceStatus(uid: string, advanceStatus: string): Promise<ApiResponse> {
    const data: any = {advanceStatus};
    try {
      const response: ApiResponse = await this.service.updateItem(uid, data);
      console.log('PendingEscrowDialogComponent - onSubmit - response: ', response);
      if([200, 201].includes(response.statusCode)) {
        return response;
      } else {
        throw new Error(response.msg);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getFundingEmailSettings(): Promise<FundingEmailSettingsDto>{
    try {
      const response: ApiResponse = await this.optionsService.loadValuesByType('EmailOutSettings');
      if(response.statusCode === 200) {
        const items = response.data.items; // items & count
        const emailSettings: any = {};
        items.forEach((item: OptionValue) => {
          emailSettings[item.key] = item.value;
        });
        return emailSettings;
      } else {
        throw new Error(response.msg);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  handleRejectClick(item: AdvanceEntity, dataTypeTag: string, reason: string = '') {
    const dialogRef = this.helpers.openConfirmDialog({
      message: 'Are you sure that you want to Reject this Advance Request and send a rejection email to the Client ?',
      buttonText: {ok: 'Yes - Reject & Email Client', cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.updateAdvanceStatus(item.uid, 'REJECTED').then((updRes: ApiResponse) => {
            console.log('clickReject - dialogRef - updRes: ', updRes);
            console.log('clickReject - dialogRef - this.data.item: ', item);
            this.sendRejectedEmail(item, reason).then((response) => {
              console.log('sendRejectedEmail - response: ', response);
              this.modal.closeAll();
              advanceKanbanRefreshSignal.set({refresh: true, dataType: dataTypeTag});
            })
          });
        }

      },
      error: (err) => {
        console.log('clickAccept - dialogRef - error: ', err.message);
      }
    });
  }


  async sendRejectedEmail(item: AdvanceEntity, reason: string): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to: item.currClient.email,
      template: {
        name: 'request-rejected',
        data: {
          displayName: item.currClient.displayName,
          advanceName: item.advanceName,
          reason
        }
      }
    };
    const response: ApiResponse = await this.emailSendService.sendEmailWithTemplate(email);
    return response;
  }

  async getCompanyInfo(): Promise<CompanyInfoDto> {
    const nsy: string = 'Not Set Yet';
    try {
      const response: ApiResponse = await this.optionsService.loadValuesByType('CommAccConfig');
      if(response.statusCode === 200) {
        const values: OptionValue[] = response.data.items;
        const mapValues: Map<string, OptionValue> = new Map(values.map((item: OptionValue) => [item.key, item]));
        const info: CompanyInfoDto = {} as CompanyInfoDto;
        const addrOption: OptionValue | undefined = mapValues.get('COMPANY-ADDRESS');
        let address: AddressDto = {} as AddressDto;
        if(addrOption && addrOption.data) {
          if(addrOption.data.startsWith('{') && addrOption.data.endsWith('}')) {
            address = JSON.parse(addrOption.data);
          }
        }
        info.companyName = mapValues.get('COMPANY-NAME')!.value || nsy;
        info.companyAddress = address;
        info.bankName = mapValues.get('BANK-NAME')!.value || nsy;
        info.bankAccountName = mapValues.get('BANK-ACCOUNT-NAME')?.value || nsy;
        info.bankAccountNumber = mapValues.get('BANK_ACCOUNT_NUMBER')?.value || nsy;
        info.bankRoutingNumber = mapValues.get('BANK-ROUTING')?.value || nsy;
        return info;
      } else {
        throw new Error(response.msg);
      }
    } catch(err: any) {
      throw new Error(err.message);
    }
  }

}
