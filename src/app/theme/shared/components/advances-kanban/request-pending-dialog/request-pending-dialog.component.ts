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
    private formBuilder: FormBuilder,
    private helpers: HelpersService,

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
      {key: 'showToolbar', value: 'false'}
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
  }

  clickEdit(event: any) {
    console.log('RequestPendingDialogComponent - clickEdit - event: ', event);
    if(this.editButtonText === 'Edit') {
      this.formMode = 'edit';
      this.editButtonText = 'View'
    } else {
      this.formMode = 'view';
      this.editButtonText = 'Edit';
    }
  }

  clickReject(event: any) {
    console.log('RequestPendingDialogComponent - clickReject - event: ', event);
  }

  async onSubmit(event: any) {
    console.log('RequestPendingDialogComponent - onSubmit - event: ', event);
    console.log('RequestPendingDialogComponent - onSubmit - data.item: ', this.data.item);
    let response: ApiResponse = {statusCode: 999, msg: 'Placeholder'};
    if(event.formType === 'update') {
      response = await this.service.updateItem(this.data.item.uid, event.formData);
    }
    console.log('RequestPendingDialogComponent - onSubmit - response: ', response);
    advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
  }



  populateFormFields(item: any): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
    fields.push({
      fieldLabel: 'MLS #',
      placeholder: 'MLS # of property',
      fcn: 'mlsId',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '1.1',
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
      rowCol: '1.2',
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
      rowCol: '2.1',
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
      rowCol: '3.3',
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
      rowCol: '3.2',
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
      rowCol: '3.1',
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
      rowCol: '4.1',
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
      rowCol: '4.2',
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
      rowCol: '4.3',
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
      rowCol: '5.1',
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
      rowCol: '5.2',
    });

    fields.push({
      fieldLabel: 'Escrow Estimated Closing',
      placeholder: 'Estimated Closing Date',
      fcn: 'estimatedClosingDate',
      type: 'date',
      required: true,
      disabled: false,
      width: 50, // percentage
      rowCol: '6.1',
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
      rowCol: '6.2',
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
      rowCol: '7.1',
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
      rowCol: '8.1'
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
      rowCol: '9.1',
      bankObj: new BankInfoClass(this.formBuilder, this.helpers, item.bankInfo)
    });

    return fields;
  }
}
