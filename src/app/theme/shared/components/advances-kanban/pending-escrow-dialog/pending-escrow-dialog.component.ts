import { Component, effect, Inject, OnInit } from '@angular/core';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { HelpersService } from '../../../service/helpers.service';
import { AdvanceService } from '../../../service/advance.service';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { EmailSendService } from '../../../service/email-send.service';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { AdvanceEntity } from '../../../entities/advance.entity';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { MailOutWithTemplateEntity } from '../../../entities/mail-out-with-template.entity';
import { advanceKanbanRefreshSignal } from '../../../signals/advance-kanban-refresh.signal';
import { OptionValue } from '../../../entities/option-values.interface';
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';
import { LedgerService } from '../../../service/ledger.service';
import { LedgerBalanceDto } from '../../../dtos/ledger-balance.dto';
import { PromoCodeDto } from '../../../dtos/promo-code.dto';

@Component({
  selector: 'app-pending-escrow-dialog',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatToolbar,
    MatDialogClose,
    MmciFormMatComponent
  ],
  templateUrl: './pending-escrow-dialog.component.html',
  styleUrl: './pending-escrow-dialog.component.scss'
})
export class PendingEscrowDialogComponent implements OnInit{
  formUUID: string;
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  promoCodes!: PromoCodeDto[];
  promoCodeOptions!: OptionValue[];
  creditObj!: LedgerBalanceDto;
  dataTypeTag: string = 'kb-pending-escrow-dialog';
  formConfig!: SelectDto[];
  formMode: string = 'edit';
  editButtonText: string = "View";

  constructor(
    public modal: MatDialog,
    private helpers: HelpersService,
    private emailSendService: EmailSendService,
    private service: AdvanceService,
    private ledgerService: LedgerService,
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
      {key: 'showToolbar', value: 'false'},
      {key: 'topSubmit', value: 'true'}
    ];
    this.chipListArr = [];
    console.log('PendingEscrowDialogComponent - constructor - data: ', this.data);
    this.promoCodes = this.data.promoCodes;
    this.promoCodeOptions = this.data.promoOptions;
    console.log('PendingEscrowDialogComponent - constructor - Promo Codes: ', this.promoCodes);
    this.creditObj = this.data.creditObj;
    console.log('PendingEscrowDialogComponent - constructor - creditObj: ', this.creditObj);
  }

 async ngOnInit() {
    // console.log('PendingEscrowDialogComponent - ngOnInit');
    // console.log('PendingEscrowDialogComponent - ngOnInit - data: ', this.data);
    this.fieldsArr = this.populateFormFields();
  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
  }

  // calcFeeDiscount(): number {
  //
  // }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    fields.push({
      fieldLabel: 'Amount Requested',
      placeholder: 'Amount Client Requested (RO)',
      fcn: 'amountRequested',
      type: 'currency',
      readOnly: true,
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '10.1'
    });

    fields.push({
      fieldLabel: 'Available Credit',
      placeholder: 'Available Credit',
      fcn: 'availableCredit',
      type: 'currency',
      readOnly: true,
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '10.2',
      injectValue: this.creditObj.availableCredit
    });

    fields.push({
      fieldLabel: 'Gross Commission',
      placeholder: 'Commission To your broker',
      fcn: 'grossCommission',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '20.1',
    });

    fields.push({
      fieldLabel: 'Agent Commission',
      placeholder: 'Commission due to you',
      fcn: 'agentCommission',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '20.2',
    });

    fields.push({
      fieldLabel: 'Amount Approved' ,
      placeholder: 'Advance Amount Approved',
      fcn: 'amountApproved',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '30.1',
      calculated: true,
      associatedToField: 'advanceFeeDiscount',
      associatedFromField: 'promoCode'
    });

    fields.push({
      fieldLabel: 'Advance Fee' ,
      placeholder: 'Advance Fee',
      fcn: 'advanceFee',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '30.2',
      calculated: true,
      associatedToField: 'advanceFeeDiscount',
      associatedFromField: 'promoCode'
    });

    fields.push({
      fieldLabel: 'Promo Code' ,
      placeholder: 'Promo Code',
      fcn: 'promoCode',
      type: 'select',
      required: true,
      disabled: false,
      validators: [],
      width: 30,
      rowCol: '40.1',
      options: this.promoCodes,
      selectValueField: 'code',
      selectKeyField: 'code',
      linkedField: 'promoCodeDetailsRaw',
      linkedFieldSource: 'PromoCode',
      linkedFieldSourceField: 'details'
    });

    fields.push({
      fieldLabel: 'Promo Code Details' ,
      placeholder: 'Promo Code Details',
      fcn: 'promoCodeDetailsRaw',
      type: 'text',
      readOnly: true,
      required: false,
      disabled: false,
      validators: [],
      width: 70,
      rowCol: '40.2',
      associatedFromField: 'promoCode'
    });

    fields.push({
      fieldLabel: 'Fee Discount Amount' ,
      placeholder: 'Fee Discount Amount (calc\'d)',
      fcn: 'advanceFeeDiscount',
      type: 'currency',
      readOnly: true,
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '50.1',
    });

    fields.push({
      fieldLabel: 'Fee Amount after Discount' ,
      placeholder: 'Fee Amount after Discount (calc\'d)',
      fcn: 'advanceFeeAfterDiscount',
      type: 'currency',
      readOnly: true,
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '50.1',
    });

    fields.push({
      fieldLabel: 'Amount to Client' ,
      placeholder: "Amount to Client (calc'd)",
      fcn: 'amountToClient',
      type: 'currency',
      readOnly: true,
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '60.2',
    });

    fields.push({
      fieldLabel: 'Amount to CA' ,
      placeholder: "Amount to CA (calc'd)",
      fcn: 'amountToCommAcc',
      type: 'currency',
      readOnly: true,
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '60.1',
    });


    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
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
