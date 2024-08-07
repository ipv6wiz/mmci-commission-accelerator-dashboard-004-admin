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
import { AdvanceHelpersService } from '../../../service/advance-helpers.service';
import { FundingEmailSettingsDto } from '../../../dtos/funding-email-settings.dto';
import { AdvanceWorkflowDialogConfigEntity } from '../../../entities/advance-workflow-dialog-config.entity';

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
  fundingEmailSettings!: FundingEmailSettingsDto;
  wfConfig!: AdvanceWorkflowDialogConfigEntity;

  constructor(
    public modal: MatDialog,
    private helpers: HelpersService,
    private advanceHelpers: AdvanceHelpersService,
    private emailSendService: EmailSendService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.wfConfig = this.data.wfConfig;
  }

  async ngOnInit() {
    this.fundingEmailSettings = await this.advanceHelpers.getFundingEmailSettings();

  }

  clickAllParties() {
    const dialogRef = this.helpers.openConfirmDialog({
      message: `Are you sure that you want to send the Funding email to ${this.fundingEmailSettings.FundsSourceSalutation} ?`,
      buttonText: {ok: `Yes - Send Email to ${this.fundingEmailSettings.FundsSourceSalutation}`, cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.advanceHelpers.updateAdvanceStatus(this.data.item.uid, 'PENDING-FUNDING').then((updRes: ApiResponse) => {
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
      bcc: [this.fundingEmailSettings.FundsAdminEmail],
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
      to: this.fundingEmailSettings.FundsSourceEmail,
      bcc: [this.fundingEmailSettings.FundsAdminEmail],
      template: {
        name: 'advance-funding',
        data: {
          salutation: this.fundingEmailSettings.FundsSourceSalutation,
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
    this.advanceHelpers.handleRejectClick(this.data.item, this.dataTypeTag);
  }

}
