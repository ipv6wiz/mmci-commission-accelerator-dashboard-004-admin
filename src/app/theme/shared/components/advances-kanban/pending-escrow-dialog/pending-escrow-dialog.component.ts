import { Component, effect, Inject, OnInit } from '@angular/core';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { EscrowCompanyDto } from '../../../dtos/escrow-company.dto';
import { MlsListDto } from '../../../dtos/mls-list.dto';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HelpersService } from '../../../service/helpers.service';
import { AdvanceService } from '../../../service/advance.service';
import { AuthenticationService } from '../../../service';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { EmailSendService } from '../../../service/email-send.service';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { AdvanceEntity } from '../../../entities/advance.entity';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { MailOutWithTemplateEntity } from '../../../entities/mail-out-with-template.entity';
import { advanceKanbanRefreshSignal } from '../../../signals/advance-kanban-refresh.signal';

@Component({
  selector: 'app-pending-escrow-dialog',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatToolbar,
    MatDialogClose
  ],
  templateUrl: './pending-escrow-dialog.component.html',
  styleUrl: './pending-escrow-dialog.component.scss'
})
export class PendingEscrowDialogComponent implements OnInit{
  formUUID: string;
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  dataTypeTag: string = 'kb-pending-escrow-dialog';
  formConfig!: SelectDto[];
  formMode: string = 'view';
  editButtonText: string = "Edit";

  constructor(
    public modal: MatDialog,
    private formBuilder: FormBuilder,
    private helpers: HelpersService,
    private emailSendService: EmailSendService,
    private service: AdvanceService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formUUID = this.helpers.getUUID();
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      if(
        formSubmitSignal.dataType === this.dataTypeTag
        && formSubmitSignal.action === 'submit'
        && formSubmitSignal.formUUID === this.formUUID
      ) {
        this.onSubmit(formSubmitSignal).then();
      }
    });
    this.formConfig = [
      {key: 'fieldIdPrefix', value: 'pending-escrow'},
      {key: 'dataTypeTag', value: 'kb-pending-escrow-dialog'},
      {key: 'formTag', value: 'Pending Escrow Confirmation'},
      {key: 'formUUID', value: this.formUUID},
      {key: 'showToolbar', value: 'false'}
    ];
    this.chipListArr = [];
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.escrow = this.data.escrow;
    this.mls = this.data.mls;
    console.log('PendingEscrowDialogComponent - ngOnInit - Escrow Companies: ', this.escrow);
    console.log('PendingEscrowDialogComponent - ngOnInit - MLS Systems: ', this.mls);
    this.fieldsArr = this.populateFormFields();
  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
  }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
    return fields;
  }

  async clickConfirmed(event: any) {
    console.log('PendingEscrowDialogComponent - clickConfirmed - event: ', event);
    // Do Advance calculations and send Email to Client for Approval

  }

  async clickChanges(event: any) {
    console.log('PendingEscrowDialogComponent - clickChanges - event: ', event);
    try {
      const response = await this.updateAdvanceStatus(this.data.item.uid, 'REQUEST-PENDING');
      if([200, 201].includes(response.statusCode)) {
        this.modal.closeAll();
        advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
      } else {
        throw new Error(response.msg);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }

  }

  clickReject(event: any) {
    console.log('PendingEscrowDialogComponent - clickReject - event: ', event);
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
