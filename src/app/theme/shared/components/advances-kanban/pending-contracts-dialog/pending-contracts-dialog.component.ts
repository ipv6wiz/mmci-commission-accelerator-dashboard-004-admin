import { Component, Inject, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { AdvanceEntity } from '../../../entities/advance.entity';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { MailOutWithTemplateEntity } from '../../../entities/mail-out-with-template.entity';
import { advanceKanbanRefreshSignal } from '../../../signals/advance-kanban-refresh.signal';
import { HelpersService } from '../../../service/helpers.service';
import { EmailSendService } from '../../../service/email-send.service';
import { AdvanceService } from '../../../service/advance.service';
import { OptionsService } from '../../../service/options.service';
import { OptionValue } from '../../../entities/option-values.interface';

@Component({
  selector: 'app-pending-contracts-dialog',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatToolbar,
    MatDialogClose
  ],
  templateUrl: './pending-contracts-dialog.component.html',
  styleUrl: './pending-contracts-dialog.component.scss'
})
export class PendingContractsDialogComponent implements OnInit {
  dataTypeTag: string = 'kb-pending-contracts-dialog';
  fundingEmailSettings!: any;

  constructor(
    public modal: MatDialog,
    private helpers: HelpersService,
    private emailSendService: EmailSendService,
    private optionsService: OptionsService,
    private service: AdvanceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  async ngOnInit() {
    this.fundingEmailSettings = await this.getFundingEmailSettings();
    console.log('PendingContractsDialogComponent - ngOnInit - fundingEmailSettings: ', this.fundingEmailSettings)
  }

  clickAllParties() {
    const dialogRef = this.helpers.openConfirmDialog({
      message: `Are you sure that you want to send the Funding email to ${this.fundingEmailSettings.FundsAdminSalutation} ?`,
      buttonText: {ok: `Yes - Send Email to ${this.fundingEmailSettings.FundsAdminSalutation}`, cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.updateAdvanceStatus(this.data.item.uid, 'PENDING-FUNDING').then((updRes: ApiResponse) => {
            console.log('PendingEscrowDialogComponent - clickConfirmed - dialogRef - updRes: ', updRes);
            console.log('PendingEscrowDialogComponent - clickConfirmed - dialogRef - this.data.item: ', this.data.item);
            this.sendFundingEmail(this.data.item).then((response) => {
              console.log('sendFundingEmail - response: ', response);
              this.modal.closeAll();
              advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
            })
          });
        }

      },
      error: (err) => {
        console.log('clickAccept - dialogRef - error: ', err.message);
      }
    });
  }

  clickSendReminderEmail() {
    const dialogRef = this.helpers.openConfirmDialog({
      message: `Are you sure that you want to send a Contracts Reminder email to the Client & the Broker ?`,
      buttonText: {ok: `Yes - Send a Contracts Reminder Email `, cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.sendContractsReminderEmail(this.data.item).then((response) => {
            console.log('sendContractsReminderEmail - response: ', response);
            this.modal.closeAll();
            advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
          });
        }
      },
      error: (err) => {
        console.log('clickAccept - dialogRef - error: ', err.message);
      }
    });
  }

  async sendContractsReminderEmail(item: AdvanceEntity): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to: item.currClient.email,
      template: {
        name: 'contracts-reminder',
        data: {
          displayName: item.currClient.displayName
        }
      }
    }
    const response: ApiResponse = await this.emailSendService.sendEmailWithTemplate(email);
    return response;
  }

  async sendFundingEmail(item: AdvanceEntity): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to: this.fundingEmailSettings.FundsAdminEmail,
      template: {
        name: 'advance-funding',
        data: {
          salutation: this.fundingEmailSettings.FundsAdminSalutation,
          agreementNumber: item.agreementNumber,
          displayName: item.currClient.displayName,
          dreNumber: item.currClient.dreNumber,
          amountToClient: this.helpers.formatCurrencyField(item.amountToClient),
          bankName: item.bankInfo.bankName,
          bankAccountName: item.bankInfo.bankAccountName,
          bankRouting: item.bankInfo.bankWireRoutingNumber,
          bankAccountNumber: item.bankInfo.bankAccountNumber
        }
      }
    }
    const response: ApiResponse = await this.emailSendService.sendEmailWithTemplate(email);
    return response;
  }

  clickReject() {
    const dialogRef = this.helpers.openConfirmDialog({
      message: 'Are you sure that you want to Reject this Advance Request and send a rejection email to the Client ?',
      buttonText: {ok: 'Yes - Reject & Email Client', cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.updateAdvanceStatus(this.data.item.uid, 'REJECTED').then((updRes: ApiResponse) => {
            console.log('clickReject - dialogRef - updRes: ', updRes);
            console.log('clickReject - dialogRef - this.data.item: ', this.data.item);
            this.sendRejectedEmail(this.data.item).then((response) => {
              console.log('sendRejectedEmail - response: ', response);
              this.modal.closeAll();
              advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
            })
          });
        }

      },
      error: (err) => {
        console.log('clickAccept - dialogRef - error: ', err.message);
      }
    })
  }

  async sendRejectedEmail(item: AdvanceEntity): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to: item.currClient.email,
      template: {
        name: 'request-rejected',
        data: {
          displayName: item.currClient.displayName,
          advanceName: item.advanceName
        }
      }
    };
    const response: ApiResponse = await this.emailSendService.sendEmailWithTemplate(email);
    return response;
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

  async getFundingEmailSettings(): Promise<any>{
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
}
