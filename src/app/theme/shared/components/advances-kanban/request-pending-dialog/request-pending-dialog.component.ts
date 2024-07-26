import { Component, effect, Inject, OnInit } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
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
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';
import { AddressClass } from '../../../entities/address.class';
import { BankInfoClass } from '../../../entities/bankInfo.class';
import { advanceKanbanRefreshSignal } from '../../../signals/advance-kanban-refresh.signal';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { MatCard } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { EmailSendService } from '../../../service/email-send.service';
import { MailOutWithTemplateEntity } from '../../../entities/mail-out-with-template.entity';
import { AdvanceEntity } from '../../../entities/advance.entity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvanceUpdateDto } from '../../../dtos/advance-update.dto';

@Component({
  selector: 'app-request-pending-dialog',
  standalone: true,
  imports: [
    MmciFormMatComponent,
    MatCard,
    MatToolbar,
    MatDialogClose,
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './request-pending-dialog.component.html',
  styleUrl: './request-pending-dialog.component.scss'
})
export class RequestPendingDialogComponent implements OnInit{
  formUUID: string;
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  dataTypeTag: string = 'kb-request-pending-dialog';
  formConfig!: SelectDto[];
  formMode: string = 'view';
  editButtonText: string = "Edit";

  constructor(
    public modal: MatDialog,
    public snackBar: MatSnackBar,
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
      {key: 'fieldIdPrefix', value: 'request-pending'},
      {key: 'dataTypeTag', value: 'kb-request-pending-dialog'},
      {key: 'formTag', value: 'Request Pending Verification'},
      {key: 'formUUID', value: this.formUUID},
      {key: 'showToolbar', value: 'false'},
      {key: 'topSubmit', value: 'true'}
    ];
    this.chipListArr = [];
  }

  async ngOnInit() {
    console.log('ngOnInit');
    this.escrow = this.data.escrow;
    this.mls = this.data.mls;
    console.log('RequestPendingDialogComponent - ngOnInit - Escrow Companies: ', this.escrow);
    console.log('RequestPendingDialogComponent - ngOnInit - MLS Systems: ', this.mls);
    this.fieldsArr = this.populateFormFields(this.data.item);
  }

  clickAccept(event: any) {
    console.log('RequestPendingDialogComponent - clickAccept - event: ', event);
    if(!this.data.item.agreementNumber) {
      this.helpers.openSnackBar('Agreement Number can not be empty - switching to Edit Mode')
      this.clickEdit({});
    } else {
      const dialogRef = this.helpers.openConfirmDialog({
        message: 'Are you sure that you want to Accept this Advance Request and send a verification email to Escrow ?',
        buttonText: {ok: 'Yes - Send Email to Escrow', cancel: 'No'}
      });
      dialogRef.afterClosed().subscribe({
        next: (confirmed) => {
          if(confirmed) {
            this.updateAdvanceStatus(this.data.item.uid, 'PENDING-ESCROW').then((updRes: ApiResponse) => {
              console.log('clickAccept - dialogRef - updRes: ', updRes);
              console.log('clickAccept - dialogRef - this.data.item: ', this.data.item);
              this.sendEmailToEscrow(this.data.item).then((response) => {
                console.log('sendEmailToEscrow - response: ', response);
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
      })
    }

  }

  async sendEmailToEscrow(item: AdvanceEntity): Promise<ApiResponse> {
    const email: MailOutWithTemplateEntity = {
      to: item.escrowEmail,
      cc: [item.currClient.email],
      template: {
        name: 'escrow-confirm',
        data: {
          escrowOfficer: item.escrowOfficer,
          escrowEmail: item.escrowEmail,
          escrowTransactionNumber: item.escrowTransactionNumber,
          Address1: item.propertyAddress.Address1,
          displayName: item.currClient.displayName,
          fullAddress: this.helpers.makeFullAddress(item.propertyAddress)
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
      console.log('RequestPendingDialogComponent - onSubmit - response: ', response);
      if([200, 201].includes(response.statusCode)) {
        return response;
      } else {
        throw new Error(response.msg);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }



  clickEdit(event: any) {
    console.log('RequestPendingDialogComponent - clickEdit - event: ', event);
    if(this.editButtonText === 'Edit') {
      this.setFormMode('edit')
    } else {
      this.setFormMode('view');
    }
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

  clickReject(event: any) {
    console.log('RequestPendingDialogComponent - clickReject - event: ', event);
    console.log('RequestPendingDialogComponent - clickReject - event: ', event);
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

  async onSubmit(event: any) {
    console.log('RequestPendingDialogComponent - onSubmit - event: ', event);
    console.log('RequestPendingDialogComponent - onSubmit - data.item: ', this.data.item);
    let response: ApiResponse = {statusCode: 999, msg: 'Placeholder'};
    if(event.formType === 'update') {
      try {
        response = await this.service.updateItem(this.data.item.uid, event.formData);
        console.log('RequestPendingDialogComponent - onSubmit - response: ', response);
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



  populateFormFields(item: any): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
    fields.push({
      fieldLabel: 'Advance Name',
      placeholder: 'Name for the Advance Request',
      fcn: 'advanceName',
      type: 'readonly',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '10.1'
    });

    fields.push({
      fieldLabel: 'Agreement Number',
      placeholder: 'Format YYYYMMDD-999',
      fcn: 'agreementNumber',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '10.2'
    });

    fields.push({
      fieldLabel: 'MLS #',
      placeholder: 'MLS # of property',
      fcn: 'mlsId',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '20.1',
    });

    fields.push({
      fieldLabel: 'MLS System',
      placeholder: 'Choose',
      fcn: 'mlsSystem',
      type: 'select',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '20.2',
      options: this.mls
    });

    fields.push({
      fieldLabel: 'Property Address',
      placeholder: 'Address of property in escrow',
      fcn: 'propertyAddress',
      type: 'address',
      required: true,
      disabled: false,
      validators: [],
      width: 100, // percentage
      rowCol: '30.1',
      addrObj: new AddressClass(this.formBuilder, this.helpers, item.propertyAddress)
    });

    fields.push({
      fieldLabel: 'Requested Amount',
      placeholder: 'Amount of Commission you want',
      fcn: 'amountRequested',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '40.3',
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
      rowCol: '40.2',
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
      rowCol: '40.1',
    });

    fields.push({
      fieldLabel: 'Escrow Company',
      placeholder: 'Choose the Escrow Company',
      fcn: 'escrowCompany',
      type: 'select',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '50.1',
      options: this.escrow
    });

    fields.push({
      fieldLabel: 'Escrow Officer',
      placeholder: 'Escrow Officer for this escrow',
      fcn: 'escrowOfficer',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '50.2',
      autoCapitalize: 'words',
    });

    fields.push({
      fieldLabel: 'Escrow Officer Phone',
      placeholder: 'Escrow Officer Phone Number',
      fcn: 'escrowPhone',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '50.3',
      mask: '(000) 000-0000',
      options: [
        ['pattern', '^[0-9]*$'],
        ['minLength', 10],
        ['maxlength', 10]
      ]
    });

    fields.push({
      fieldLabel: 'Escrow Officer Email',
      placeholder: 'Escrow Officer Email Address',
      fcn: 'escrowEmail',
      type: 'text',
      required: true,
      disabled: false,
      validators: [['email']],
      width: 50, // percentage
      rowCol: '60.1',
    });

    fields.push({
      fieldLabel: 'Escrow Transaction #',
      placeholder: 'Escrow Transaction Number',
      fcn: 'escrowTransactionNumber',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50, // percentage
      rowCol: '60.2',
    });

    fields.push({
      fieldLabel: 'Escrow Estimated Closing',
      placeholder: 'Estimated Closing Date',
      fcn: 'estimatedClosingDate',
      type: 'date',
      required: true,
      disabled: false,
      width: 50, // percentage
      rowCol: '70.1',
      pickerId: 'escrow-estimatedClosingDate',
      startView: 'month',
      storedFormat: 'ISO Local',
      validators: []
    });

    fields.push({
      fieldLabel: 'Escrow Actual Closing',
      placeholder: 'Actual Closing Date',
      fcn: 'actualClosingDate',
      type: 'date',
      required: false,
      disabled: false,
      width: 50, // percentage
      rowCol: '70.2',
      pickerId: 'escrow-actualClosingDate',
      startView: 'month',
      storedFormat: 'ISO Local',
      validators: []
    });

    fields.push({
      fieldLabel: 'Remaining Contingencies Release Date',
      placeholder: 'Date remaining Contingencies are released',
      fcn: 'contingencyReleaseDate',
      type: 'date',
      pickerId: 'escrow-contingencyReleaseDate',
      startView: 'month',
      storedFormat: 'ISO Local',
      rowCol: '80.1',
      hide: true,
      required: false,
      disabled: false,
      conditional: true,
      defaultCondition: false,
      condFieldLabel: 'Remaining Contingencies',
      condFcn: 'remainingContingencies',
      condRequired: false,
      condWidth: 50,
      validators: [],
      width: 50,
    });

    fields.push({
      fieldLabel: 'Notes',
      placeholder: 'Add Notes/Comments',
      fcn: 'notes',
      type: 'textarea',
      required: false,
      disabled: false,
      validators: [],
      width: 100,
      rowCol: '90.1'
    });

    fields.push({
      fieldLabel: 'Your Bank Info',
      placeholder: 'Your Bank Information',
      fcn: 'bankInfo',
      type: 'bank',
      required: true,
      disabled: false,
      validators: [],
      width: 100,
      rowCol: '100.1',
      bankObj: new BankInfoClass(this.formBuilder, this.helpers, item.bankInfo)
    });
    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }
}
