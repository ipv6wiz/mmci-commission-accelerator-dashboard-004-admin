import { Component, effect, Inject, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../theme/shared/service';
import { ClientService } from '../../../../theme/shared/service/client.service';
import { HelpersService } from '../../../../theme/shared/service/helpers.service';
import { NGXLogger } from 'ngx-logger';
import { MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { optionTypeListChangeSignal } from '../../../../theme/shared/signals/option-type-list-change.signal';
import { OptionsEntity } from '../../../../theme/shared/entities/options.interface';
import { FormFieldDto } from '../../../../theme/shared/components/mmci-form-mat/dtos/form-field.dto';
import { OptionsService } from '../../../../theme/shared/service/options.service';
import {
  mmciFormSubmitSignal
} from '../../../../theme/shared/components/mmci-form-mat/signals/mmci-form-submit.signal';
import { ApiResponse } from '../../../../theme/shared/dtos/api-response.dto';
import { dataGridRefreshSignal } from '../../../../theme/shared/signals/data-grid-refresh.signal';

@Component({
  selector: 'app-tbl-options-form-mat',
  standalone: true,
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    MatToolbar,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './tbl-options-form-mat.component.html',
  styleUrl: './tbl-options-form-mat.component.scss'
})
export class TblOptionsFormMatComponent implements OnInit{
  fieldsArr!: FormFieldDto[];
  dataTypeTag: string = 'options';
  optionTypeFormGroup!: FormGroup;

  constructor(
    public modal: MatDialog,
    private formBuilder: FormBuilder,
    private helpers: HelpersService,
    private service: OptionsService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      if(formSubmitSignal.action === 'submit') {
        this.onSubmit(formSubmitSignal).then();
      }
    });
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
      fieldLabel: 'Type',
      placeholder: 'Option Type - must be unique',
      fcn: 'type',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '1.1'
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
      rowCol: '1.2'
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
      rowCol: '2.1'
    });
    fields.push({
      fieldLabel: 'Description',
      placeholder: 'Option Type description for documentation',
      fcn: 'description',
      type: 'text',
      required: false,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '2.2'
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
      rowCol: '3.1'
    });
    return fields;
  }

  fieldChange(event: any) {
    console.log(event);
  }

  onDateChange(event: any) {
    console.log(event);
  }

}
