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
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';
import { LedgerBalanceDto } from '../../../dtos/ledger-balance.dto';
import { PromoCodeDto } from '../../../dtos/promo-code.dto';
import { AdvanceUpdateDto } from '../../../dtos/advance-update.dto';
import { mmciFormModeChangeSignal } from '../../mmci-form-mat/signals/mmci-form-mode-change.signal';
import { AdvanceHelpersService } from '../../../service/advance-helpers.service';
import { FundingEmailSettingsDto } from '../../../dtos/funding-email-settings.dto';
import { AdvanceWorkflowDialogConfigEntity } from '../../../entities/advance-workflow-dialog-config.entity';

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
  private fundingEmailSettings!: FundingEmailSettingsDto
  formUUID: string;
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  promoCodes!: PromoCodeDto[];
  creditObj!: LedgerBalanceDto;
  dataTypeTag: string = 'kb-pending-escrow-dialog';
  formConfig!: SelectDto[];
  formMode: string = 'edit';
  editButtonText: string = "View";
  wfConfig!: AdvanceWorkflowDialogConfigEntity;

  constructor(
    public modal: MatDialog,
    private helpers: HelpersService,
    private emailSendService: EmailSendService,
    private service: AdvanceService,
    private advanceHelpers: AdvanceHelpersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formUUID = this.helpers.getUUID();
    effect(() => {
      const formModeChangeSignal = mmciFormModeChangeSignal();
      if(
        formModeChangeSignal.dataTypeTag === this.dataTypeTag
        && formModeChangeSignal.action === 'change'
        && formModeChangeSignal.formUUID === this.formUUID
      ) {
        this.setFormMode(formModeChangeSignal.mode);
      }
    });

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
      {key: 'formTag', value: 'Create Advance Offer'},
      {key: 'justTag', value: 'true'},
      {key: 'formUUID', value: this.formUUID},
      {key: 'showToolbar', value: 'false'},
      {key: 'topSubmit', value: 'true'}
    ];
    this.chipListArr = [];
    console.log('PendingEscrowDialogComponent - constructor - data: ', this.data);
    this.promoCodes = this.data.promoCodes;
    console.log('PendingEscrowDialogComponent - constructor - Promo Codes: ', this.promoCodes);
    this.creditObj = this.data.creditObj;
    console.log('PendingEscrowDialogComponent - constructor - creditObj: ', this.creditObj);
    this.wfConfig = this.data.wfConfig;
  }

 async ngOnInit() {
    console.log('PendingEscrowDialogComponent - ngOnInit - data: ', this.data);
    if(this.data.item.advanceFee && this.data.item.amountApproved) {
      this.setFormMode('view');
    } else {
      this.setFormMode('edit');
    }
    this.fieldsArr = this.populateFormFields();
   this.fundingEmailSettings = await this.advanceHelpers.getFundingEmailSettings();

  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
    let response: ApiResponse = {statusCode: 999, msg: 'Placeholder'};
    if(event.formType === 'update') {
      try {
        response = await this.service.updateItem(event.formData.uid, event.formData);
        console.log('PendingEscrowDialogComponent - onSubmit - response: ', response);
        if([200, 201].includes(response.statusCode)) {
          this.updateFormData(response.data.item);
        } else {
          throw new Error(response.msg);
        }
      } catch (err: any) {
        throw new Error(err.message);
      }
    }
    this.setFormMode('view');
    advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
  }

  updateFormData(resData: AdvanceUpdateDto) {
    const keys = Object.keys(resData);
    keys.forEach((key: string) => {
      this.data.item[key] = resData[key as keyof AdvanceUpdateDto];
    });
  }

  private setFormMode(type: string) {
    switch(type) {
      case 'edit':
        this.formMode = 'edit';
        this.editButtonText = 'View';
        break;
      case 'view':
        this.formMode = 'view';
        this.editButtonText = 'Edit';
        break;
    }
  }

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
      width: 50, // percentage
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
      width: 50, // percentage
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
      required: false,
      disabled: false,
      validators: [],
      width: 50,
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
      width: 50,
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

    fields.push({
      fieldLabel: 'Advance UID' ,
      placeholder: 'Advance UID',
      fcn: 'uid',
      type: 'hidden',
      hide: true,
      required: false,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '999.1',
    });


    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }

  async clickConfirmed(event: any) {
    console.log('PendingEscrowDialogComponent - clickConfirmed - event: ', event);
    console.log('PendingEscrowDialogComponent - clickConfirmed - this.data.item: ', this.data.item);
    const dialogRef = this.helpers.openConfirmDialog({
      message: 'Are you sure that you want to send an Offer Approval email to the Client ?',
      buttonText: {ok: 'Yes - Send Email to Client', cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.updateAdvanceStatus(this.data.item.uid, 'PENDING-APPROVAL').then((updRes: ApiResponse) => {
            console.log('PendingEscrowDialogComponent - clickConfirmed - dialogRef - updRes: ', updRes);
            console.log('PendingEscrowDialogComponent - clickConfirmed - dialogRef - this.data.item: ', this.data.item);
            this.sendClientApprovalEmail(this.data.item).then((response) => {
              console.log('sendClientApprovalEmail - response: ', response);
              this.setFormMode('view');
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

  clickEdit(event: any) {
    console.log('PendingEscrowDialogComponent - clickEdit - event: ', event);
    if(this.editButtonText === 'Edit') {
      this.setFormMode('edit')
    } else {
      this.setFormMode('view');
    }
  }

  async sendClientApprovalEmail(item: AdvanceEntity): Promise<ApiResponse> {
    let promoCodeDesc: string = '';
    if(item.promoCode && item.promoCode != '') {
      promoCodeDesc = `(code: ${item.promoCode} ${item.promoCodeDetailsRaw})`
    }
    const email: MailOutWithTemplateEntity = {
      to: item.currClient.email,
      replyTo: this.fundingEmailSettings.ReplyTo,
      bcc: [this.fundingEmailSettings.BCC],
      template: {
        name: 'client-approval',
        data: {
          agreementNumber: item.agreementNumber,
          advanceName: item.advanceName,
          displayName: item.currClient.displayName,
          amountRequested: this.helpers.formatCurrencyField(item.amountRequested),
          amountApproved: this.helpers.formatCurrencyField(item.amountApproved),
          advanceFee: this.helpers.formatCurrencyField(item.advanceFee),
          feeDiscountAmount:this.helpers.formatCurrencyField(item.advanceFeeDiscount),
          promoCodeDesc,
          amountToClient: this.helpers.formatCurrencyField(item.amountToClient),
          amountToCommAcc: this.helpers.formatCurrencyField(item.amountToCommAcc)
        }
      }
    };
    const response: ApiResponse = await this.emailSendService.sendEmailWithTemplate(email);
    return response;
  }

  clickReject(event: any) {
    console.log('PendingEscrowDialogComponent - clickReject - event: ', event);
    this.advanceHelpers.handleRejectClick(this.data.item, this.dataTypeTag);
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
