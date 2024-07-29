import { Component, Inject, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { HelpersService } from '../../../service/helpers.service';
import { EmailSendService } from '../../../service/email-send.service';
import { AdvanceEntity } from '../../../entities/advance.entity';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { MailOutWithTemplateEntity } from '../../../entities/mail-out-with-template.entity';
import { advanceKanbanRefreshSignal } from '../../../signals/advance-kanban-refresh.signal';
import { LedgerService } from '../../../service/ledger.service';
import { AdvanceLedgerPostDto } from '../../../dtos/advance-ledger-post.dto';
import { AdvanceHelpersService } from '../../../service/advance-helpers.service';

@Component({
  selector: 'app-pending-funding-dialog',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatToolbar,
    MatDialogClose
  ],
  templateUrl: './pending-funding-dialog.component.html',
  styleUrl: './pending-funding-dialog.component.scss'
})
export class PendingFundingDialogComponent implements OnInit {
  dataTypeTag: string = 'kb-pending-funding-dialog';
  fundingEmailSettings!: any;

  constructor(
    public modal: MatDialog,
    private helpers: HelpersService,
    private advanceHelpers: AdvanceHelpersService,
    private emailSendService: EmailSendService,
    private ledgerService: LedgerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  async ngOnInit() {
    this.fundingEmailSettings = await this.advanceHelpers.getFundingEmailSettings();
    console.log('PendingContractsDialogComponent - ngOnInit - data: ', this.data);
  }

  async clickFunded() {
    const postResponse = await this.postAdvanceToLedger(this.data.item);
    if([200, 201].includes(postResponse.statusCode)) {
      const statusResponse = await this.advanceHelpers.updateAdvanceStatus(this.data.item.uid, 'ADVANCE-FUNDED');
      if([200, 201].includes(statusResponse.statusCode)) {
        this.modal.closeAll();
        advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
      } else {
        throw new Error(statusResponse.msg);
      }
    } else {
      throw new Error(postResponse.msg);
    }
  }

  async postAdvanceToLedger(data: any): Promise<ApiResponse> {
    const item: AdvanceLedgerPostDto = {
      clientId: data.clientId,
      amountApproved: data.amountApproved,
      amountToClient: data.amountToClient,
      advanceFee: data.advanceFee,
      advanceFeeDiscount: data.advanceFeeDiscount,
      advanceName: data.advanceName,
      agreementNumber: data.agreementNumber,
      promoCodeDetailsRaw: data.promoCodeDetailsRaw,
      advanceId: data.advanceId,
      creator: 'WORKFLOW'
    };
    return await this.ledgerService.postAdvance(data.clientId, item);
  }

  clickSendReminderEmail() {
    const dialogRef = this.helpers.openConfirmDialog({
      message: `Are you sure that you want to send a Contracts Reminder email to the Client & the Broker ?`,
      buttonText: {ok: `Yes - Send a Contracts Reminder Email `, cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.sendFundingReminderEmail(this.data.item).then((response) => {
            console.log('sendFundingReminderEmail - response: ', response);
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

  async sendFundingReminderEmail(item: AdvanceEntity): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to:  this.fundingEmailSettings.FundsAdminEmail,
      template: {
        name: 'funding-reminder',
        data: {
          salutation: this.fundingEmailSettings.FundsAdminSalutation,
          agreementNumber: item.agreementNumber,
          displayName: item.currClient.displayName,
          amountToClient: this.helpers.formatCurrencyField(item.amountToClient),
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
          this.advanceHelpers.updateAdvanceStatus(this.data.item.uid, 'REJECTED').then((updRes: ApiResponse) => {
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

}
