import { Component, effect, Inject, OnInit } from '@angular/core';
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OptionsService } from '../../../service/options.service';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { dataGridRefreshSignal } from '../../../signals/data-grid-refresh.signal';

@Component({
  selector: 'app-option-value-form-dialog',
  standalone: true,
  imports: [
    MmciFormMatComponent
  ],
  templateUrl: './option-value-form-dialog.component.html',
  styleUrl: './option-value-form-dialog.component.scss'
})
export class OptionValueFormDialogComponent implements OnInit {
  dataTypeTag: string = 'optionValue';
  fieldsArr!: FormFieldDto[];
  formConfig!: SelectDto[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modal: MatDialog,
    private service: OptionsService
  ) {
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      if(formSubmitSignal.dataType === this.dataTypeTag && formSubmitSignal.action === 'submit') {
        this.onSubmit(formSubmitSignal).then();
      }
    });
    this.formConfig = [
      {key: 'fieldIdPrefix', value: 'optionValue'},
      {key: 'dataTypeTag', value: 'optionValue'},
      {key: 'formTag', value: 'Option Value'},
    ];

  }

  ngOnInit() {
    this.fieldsArr = this.populateFormFields();
  }

  async onSubmit(event: any) {
    console.log('OptionValueFormDialogComponent - onSubmit - event: ', event);
    console.log('OptionValueFormDialogComponent - onSubmit - typeId: ', this.data.data.optionId);
    let response: ApiResponse;
    const formData = event.formData;
    formData.typeId = this.data.data.optionId;
    if(event.formType === 'new') {
      response = await this.service.createOptionValueItem(formData.typeId, formData);
      if(response.statusCode !== 201) {
        throw new Error(`Create Option Value failed: ${response.msg}`);
      }
    } else if(event.formType === 'update') {
      response = await this.service.updateOptionValueItem(formData.typeId, formData.key, formData);
      if(response.statusCode !== 200) {
        throw new Error(`Update Option Value failed: ${response.msg}`);
      }
    }
    dataGridRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
  }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
    fields.push({
      fieldLabel: 'Key',
      placeholder: 'Option Value Key - must be unique',
      fcn: 'key',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '1.1'
    });
    fields.push({
      fieldLabel: 'Value',
      placeholder: 'Option Value',
      fcn: 'value',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '1.2'
    });
    fields.push({
      fieldLabel: 'Sort Order',
      placeholder: 'Sort Order - inc by 10',
      fcn: 'sortOrder',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '2.1'
    });
    fields.push({
      fieldLabel: 'Display Value',
      placeholder: 'Option Display Value',
      fcn: 'displayValue',
      type: 'text',
      required: false,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '2.2'
    });
    fields.push({
      fieldLabel: 'Description',
      placeholder: 'Option Type description for documentation',
      fcn: 'description',
      type: 'text',
      required: false,
      disabled: false,
      validators: [],
      width: 100,
      rowCol: '3.1'
    });
    fields.push({
      fieldLabel: 'Data',
      placeholder: 'Option Type data in JSON format',
      fcn: 'data',
      type: 'textarea',
      required: false,
      disabled: false,
      validators: [],
      width: 100,
      rowCol: '4.1'
    });
    return fields;
  }
}
