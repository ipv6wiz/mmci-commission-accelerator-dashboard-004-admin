import { Component, effect, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { OptionsService } from '../../../service/options.service';
import { dataGridRefreshSignal } from '../../../signals/data-grid-refresh.signal';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';

@Component({
  selector: 'app-option-type-form-dialog',
  standalone: true,
  imports: [
    MmciFormMatComponent
  ],
  templateUrl: './option-type-form-dialog.component.html',
  styleUrl: './option-type-form-dialog.component.scss'
})
export class OptionTypeFormDialogComponent implements OnInit {
  dataTypeTag: string = 'options';
  fieldsArr!: FormFieldDto[];
  formConfig!: SelectDto[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modal: MatDialog,
    private service: OptionsService
  ) {
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      if(formSubmitSignal.action === 'submit') {
        this.onSubmit(formSubmitSignal).then();
      }
    });
    this.formConfig = [
      {key: 'fieldIdPrefix', value: 'optionType'},
      {key: 'dataTypeTag', value: 'options'},
      {key: 'formTag', value: 'Option Type'},
    ];
  }

  ngOnInit() {
    this.fieldsArr = this.populateFormFields();
  }

  async onSubmit(event: any) {
    console.log('Option Type Form Submit - event: ', event);
    let response: ApiResponse;
    if(event.formType === 'new') {
      response = await this.service.createOptionItem(event.formData);
      if(response.statusCode !== 201) {
        throw new Error(`Create Option Type failed: ${response.msg}`);
      }
    } else if(event.formType === 'update') {
      response = await this.service.updateOptionItem(event.formData.id, event.formData);
      if(response.statusCode !== 201) {
        throw new Error(`Update Option Type failed: ${response.msg}`);
      }
    }
    dataGridRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
  }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
    fields.push({
      fieldLabel: 'Option Name',
      placeholder: 'Option Name - must be unique',
      fcn: 'optionName',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '1.1'
    });
    fields.push({
      fieldLabel: 'Type',
      placeholder: 'Option Type - must be unique',
      fcn: 'type',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '1.2'
    });
    fields.push({
      fieldLabel: 'Data Type',
      placeholder: 'Data Type for the Option Values - default text',
      fcn: 'dataType',
      type: 'text',
      required: false,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '2.1'
    });
    fields.push({
      fieldLabel: 'Slug',
      placeholder: 'No spaces version of the Option Type',
      fcn: 'slug',
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
