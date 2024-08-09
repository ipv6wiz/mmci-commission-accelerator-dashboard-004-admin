import { Component, effect, Inject, OnInit } from '@angular/core';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { HelpersService } from '../../../service/helpers.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OptionsService } from '../../../service/options.service';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { OptionValue } from '../../../entities/option-values.interface';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { LedgerItemDto } from '../../../dtos/ledger-item.dto';
import { dataGridRefreshSignal } from '../../../signals/data-grid-refresh.signal';
import { LedgerService } from '../../../service/ledger.service';
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';
import { LedgerTransactionTypeDto } from '../../../dtos/ledger-transaction-type.dto';

@Component({
  selector: 'app-ledger-form-dialog',
  standalone: true,
  imports: [
    MmciFormMatComponent
  ],
  templateUrl: './ledger-form-dialog.component.html',
  styleUrl: './ledger-form-dialog.component.scss'
})
export class LedgerFormDialogComponent implements OnInit {
  private compName: string = 'LedgerFormDialogComponent';
  dataTypeTag: string = 'ledgerItem';
  fieldsArr!: FormFieldDto[];
  formConfig!: SelectDto[];
  formUUID: string;
  transTypes!: LedgerTransactionTypeDto[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modal: MatDialog,
    private service: LedgerService,
    private helpers: HelpersService
  ) {
    console.debug('LedgerFormDialogComponent - constructor - data: ', this.data);
    this.formUUID = this.helpers.getUUID();
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      const formData: LedgerItemDto = formSubmitSignal.formData as LedgerItemDto;
      console.log(`${this.compName} - data: `, this.data);
      console.log(`${this.compName} - formData: `, formData);
      if(
        formSubmitSignal.dataType === this.dataTypeTag
        && formSubmitSignal.action === 'submit'
        && formSubmitSignal.formUUID === this.formUUID
      ) {
        this.onSubmit(formSubmitSignal).then();
      }
    });
    this.formConfig = [
      {key: 'fieldIdPrefix', value: 'ledgerItem'},
      {key: 'dataTypeTag', value: 'ledgerItem'},
      {key: 'formTag', value: 'Ledger Transaction'},
      {key: 'formUUID', value: this.formUUID}
    ];

  }

  ngOnInit() {
    this.transTypes = this.data.transTypes;
    this.fieldsArr = this.populateFormFields();
  }

  async onSubmit(event: any) {
    console.log(`${this.compName} - onSubmit - event: `, event);
    console.log(`${this.compName} - onSubmit - typeId: `, this.data.clientId);
    let response: ApiResponse;
    const formData = event.formData;
    formData.typeId = this.data.optionId;
    if(event.formType === 'new') {
      response = await this.service.postTransaction(formData.clientId, formData);
      if(response.statusCode !== 201) {
        throw new Error(`Create Option Value failed: ${response.msg}`);
      }
    } else if(event.formType === 'update') {
      // response = await this.service.updateTransaction(formData.typeId, this.data.item.key, formData);
      // console.log(`${this.compName} - onSubmit - response: `, response);
      // if(response.statusCode !== 200) {
      //   throw new Error(`Update Option Value failed: ${response.msg}`);
      // }
      throw new Error('Transaction Update not supported')
    }
    this.modal.closeAll();
    dataGridRefreshSignal.set({refresh: true, dataType: this.dataTypeTag, dataId: formData.typeId});
  }

  populateFormFields() {
    const fields: FormFieldDto[] = [];
    fields.push({
      fieldLabel: 'Amount',
      placeholder: 'Transaction Amount',
      fcn: 'amount',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width:50,
      rowCol: '10.1'
    });

    fields.push({
      fieldLabel: 'Type',
      placeholder: 'Type of Transaction',
      fcn: 'transType',
      type: 'select',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '10.2',
      options: this.transTypes,
      selectValueField: 'key',
      selectKeyField: 'value'
    });

    fields.push({
      fieldLabel: 'Transaction Date',
      placeholder: 'Date of Transaction',
      fcn: 'transactionDate',
      type: 'date',
      required: true,
      disabled: false,
      default: this.helpers.makeNowIsoDate(true),
      validators: [],
      width: 50,
      rowCol: '20.1'
    });

    fields.push({
      fieldLabel: 'Transaction Description',
      placeholder: 'Description of Transaction',
      fcn: 'description',
      type: 'textarea',
      required: true,
      disabled: false,
      validators: [],
      width: 100,
      rowCol:'30.1'
    });


    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields
  }
}
