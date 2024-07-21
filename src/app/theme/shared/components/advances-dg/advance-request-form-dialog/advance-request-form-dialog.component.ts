import { Component, effect, Inject, OnInit } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EscrowCompanyDto } from '../../../dtos/escrow-company.dto';
import { MlsListDto } from '../../../dtos/mls-list.dto';
import { HelpersService } from '../../../service/helpers.service';
import { FormBuilder } from '@angular/forms';
import { AddressClass } from '../../../entities/address.class';
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';
import { dataGridRefreshSignal } from '../../../signals/data-grid-refresh.signal';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { AdvanceService } from '../../../service/advance.service';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { AuthenticationService } from '../../../service';

@Component({
  selector: 'app-advance-request-form',
  standalone: true,
  imports: [
    MmciFormMatComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './advance-request-form-dialog.component.html',
  styleUrl: './advance-request-form-dialog.component.scss'
})
export class AdvanceRequestFormDialogComponent implements OnInit {
  formUUID: string;
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  dataTypeTag: string = 'advances';
  formConfig!: SelectDto[];

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
      {key: 'fieldIdPrefix', value: 'advance'},
      {key: 'dataTypeTag', value: 'advances'},
      {key: 'formTag', value: 'Commission Advance'},
      {key: 'formUUID', value: this.formUUID}
    ];
    this.chipListArr = [];
  }

  ngOnInit() {
    this.escrow = this.data.escrow;
    this.mls = this.data.mls;
    console.log('ngOnInit - Escrow Companies: ', this.escrow);
    console.log('ngOnInit - MLS Systems: ', this.mls);
    this.fieldsArr = this.populateFormFields();
  }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
      // fields.push({
      //   fieldLabel: '',
      //   placeholder: '',
      //   fcn: '',
      //   type: '',
      //   required: true,
      //   disabled: false,
      //   validators: [],
      //   width: 0, // percentage
      //   rowCol: '',
      //   autoCapitalize: '',
      //   mask: '',
      //   addrObj: null,
      //   pickerId: '',
      //   startView: 'month',
      //   storedFormat: '',
      //   options: [],
      //   conditional: false, // if true precede the field with a checkbox
      //   defaultCondition: true, // render the field
      //   condFieldLabel: '',
      //   condPlaceholder: '',
      //   condFcn: '',
      // });



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
      addrObj: new AddressClass(this.formBuilder, this.helpers)
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
      fieldLabel: 'Advance Name',
      placeholder: 'If left Empty will be replaced with Address Line 1',
      fcn: 'name',
      type: 'text',
      required: false,
      disabled: false,
      validators: [],
      width: 100, // percentage
      rowCol: '8.1',
      default: '#propertyAddress.Address1'
    });
    return fields;
  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
    let response;
    if(event.formType === 'new') {
      const clientId = ''; // this.authService.getLocalClientData().uid;
      console.log('clientId : ', clientId);
      event.formData.clientId = clientId;
      event.formData.advanceStatus = 'pending';
      response = await this.service.createItem(event.formData);
    } else if(event.formType === 'update') {
      response = await this.service.updateItem(event.formData.uid, event.formData);
    }
    dataGridRefreshSignal.set({refresh: true, dataType: this.dataTypeTag })
    console.log('onSubmit - response: ', response);
  }
}
