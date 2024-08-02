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
import { CompanyInfoDto } from '../../../dtos/company-info.dto';
import { FundingEmailSettingsDto } from '../../../dtos/funding-email-settings.dto';

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
  fundingEmailSettings!: FundingEmailSettingsDto;

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
        await this.sendFundedEmail(this.data.item);
        await this.sendEscrowDemandEmail(this.data.item);
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
      message: `Are you sure that you want to send a Funding Reminder email ?`,
      buttonText: {ok: `Yes - Send a Funding Reminder Email `, cancel: 'No'}
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

  async sendEscrowDemandEmail(item: AdvanceEntity): Promise<ApiResponse> {
    const companyInfo: CompanyInfoDto = await this.advanceHelpers.getCompanyInfo();
    const email: MailOutWithTemplateEntity = {
      to: item.escrowEmail,
      cc: [item.currClient.email, item.currClient.brokerage.brokerEmail],
      bcc: [this.fundingEmailSettings.FundsAdminEmail],
      template: {
        name: 'escrow-demand',
        data: {
          advanceName: item.advanceName,
          escrowTransactionNumber: item.escrowTransactionNumber,
          escrowOfficer: item.escrowOfficer,
          brokerageName: item.currClient.brokerage.brokerageName,
          displayName: item.currClient.displayName,
          amount: item.amountToCommAcc,
          bankAccountName: companyInfo.bankAccountName,
          bankName: companyInfo.bankName,
          bankRoutingNumber: companyInfo.bankRoutingNumber,
          bankAccountNumber: companyInfo.bankAccountNumber,
          companyName: companyInfo.companyName,
          Address1: companyInfo.companyAddress.Address1,
          City: companyInfo.companyAddress.City,
          State: companyInfo.companyAddress.State,
          Zip5: companyInfo.companyAddress.Zip5
        }
      }
    }
    const response: ApiResponse = await this.emailSendService.sendEmailWithTemplate(email);
    return response;
  }

  async sendFundingReminderEmail(item: AdvanceEntity): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to:  this.fundingEmailSettings.FundsSourceEmail,
      bcc: [this.fundingEmailSettings.FundsAdminEmail],
      template: {
        name: 'funding-reminder',
        data: {
          salutation: this.fundingEmailSettings.FundsSourceSalutation,
          agreementNumber: item.agreementNumber,
          displayName: item.currClient.displayName,
          amountToClient: this.helpers.formatCurrencyField(item.amountToClient),
        }
      }
    }
    const response: ApiResponse = await this.emailSendService.sendEmailWithTemplate(email);
    return response;
  }

  async sendFundedEmail(item: AdvanceEntity): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to: item.currClient.email,
      cc: [item.currClient.brokerage.brokerEmail],
      bcc: [this.fundingEmailSettings.FundsAdminEmail],
      template: {
        name: 'funded-advance',
        data: {
          displayName: item.currClient.displayName
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
