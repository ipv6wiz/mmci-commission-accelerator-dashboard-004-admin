import { Component, Inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';

import { HelpersService } from '../../../service/helpers.service';
import { EmailSendService } from '../../../service/email-send.service';
import { AdvanceService } from '../../../service/advance.service';

import { AdvanceEntity } from '../../../entities/advance.entity';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { MailOutWithTemplateEntity } from '../../../entities/mail-out-with-template.entity';
import { advanceKanbanRefreshSignal } from '../../../signals/advance-kanban-refresh.signal';

@Component({
  selector: 'app-pending-approval',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatToolbar,
    MatDialogClose
  ],
  templateUrl: './pending-approval-dialog.component.html',
  styleUrl: './pending-approval-dialog.component.scss'
})
export class PendingApprovalDialogComponent {
  dataTypeTag: string = 'kb-pending-approval-dialog';

  constructor(
    public modal: MatDialog,
    private helpers: HelpersService,
    private emailSendService: EmailSendService,
    private service: AdvanceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  async clickCounter(event: any) {
    console.log('clickCounter - event: ', event);
    const dialogRef = this.helpers.openConfirmDialog({
      message: 'Are you sure that you want to make a Counter Advance Request Offer  ?',
      buttonText: {ok: 'Yes - Move to Pending Escrow', cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.updateAdvanceStatus(this.data.item.uid, 'PENDING-ESCROW').then((updRes: ApiResponse) => {
            console.log('clickCounter - updRes.statusCode: ', updRes.statusCode);
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

   clickApproved(event: any)  {
    console.log('PendingApprovalDialogComponent - clickApproved - event: ', event);
    console.log('PendingApprovalDialogComponent - clickApproved - this.data.item: ', this.data.item);
    const dialogRef = this.helpers.openConfirmDialog({
      message: 'Are you sure that you want to send a Contracts on their way email to the Client ?',
      buttonText: {ok: 'Yes - Send Email to Client', cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.updateAdvanceStatus(this.data.item.uid, 'PENDING-CONTRACTS').then((updRes: ApiResponse) => {
            console.log('PendingEscrowDialogComponent - clickConfirmed - dialogRef - updRes: ', updRes);
            console.log('PendingEscrowDialogComponent - clickConfirmed - dialogRef - this.data.item: ', this.data.item);
            this.sendClientContractsEmail(this.data.item).then((response) => {
              console.log('sendClientContractsEmail - response: ', response);
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

  async sendClientContractsEmail(item: AdvanceEntity): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to: item.currClient.email,
      template: {
        name: 'client-contracts',
        data: {
          agreementNumber: item.agreementNumber,
          advanceName: item.advanceName,
          displayName: item.currClient.displayName,
        }
      }
    }
    const response: ApiResponse = await this.emailSendService.sendEmailWithTemplate(email);
    return response;
  }

  clickReject(event: any) {
    console.log('PendingEscrowDialogComponent - clickReject - event: ', event);
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

}
