import { Component, Inject, OnInit } from '@angular/core';
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
  optionTypeFormGroup: FormGroup;
  fields: any[] = [];

  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private clientService: ClientService,
    private helpers: HelpersService,
    private logger: NGXLogger
  ) {
    this.optionTypeFormGroup = this.formBuilder.group({
      type: ['', Validators.required],
      dataType: ['text'],
      slug: [''],
      description: [''],
      data: [''],
    });
    this.fields.push({
      fieldLabel: 'Type',
      placeholder: 'Option Type - must be unique',
      fcn: 'type',
      type: 'text',
      required: true,
      disabled: false
    });
    this.fields.push({
      fieldLabel: 'Data Type',
      placeholder: 'Data Type for the Option Values - default text',
      fcn: 'dataType',
      type: 'text',
      required: false,
      disabled: false
    });
    this.fields.push({
      fieldLabel: 'Slug',
      placeholder: 'No spaces version of the Option Type',
      fcn: 'slug',
      type: 'text',
      required: false,
      disabled: false
    });
    this.fields.push({
      fieldLabel: 'Description',
      placeholder: 'Option Type description for documentation',
      fcn: 'description',
      type: 'text',
      required: false,
      disabled: false
    });
    this.fields.push({
      fieldLabel: 'Data',
      placeholder: 'Option Type data in JSON format',
      fcn: 'data',
      type: 'text',
      required: false,
      disabled: false
    });
  }

  ngOnInit() {
    console.log('TblOptionsFormMatComponent - modal - data: ', this.data);
    if(this.data.option.type) {
      const keys = Object.keys(this.data.option);
      keys.forEach((key: string) => {
        console.log('ngOnInit - key: ', key);
        if(!['id', 'uid', 'optionId', 'values'].includes(key)) {
          this.optionTypeFormGroup.controls[key].setValue(this.data.option[key]);
        }
      });
    }
  }

  async onSubmit(event: any) {
    console.log('Option Type Form Submit - event: ', event);
    console.log('Option Type Form Submit - type: ',  this.optionTypeFormGroup.controls['type'].value);
    const user = this.authService.getLocalUser();
    console.log('Option Type Form Submit - user: ', user);
    // Update dataSource at index
    // update Options Collection at id
  }

  fieldChange(event: any) {
    console.log('***** >>>>> fieldChange - event: ', event);
    console.log(`***** >>>>> fieldChange - id: ${event.target.id} - value: ${event.target.value}`);
    const text = event.target.value;
    const ctrlId = event.target.id;
    const ctrlNameParts = ctrlId.split('-');
    const formGroup = ctrlNameParts[0];
    const formControlName = ctrlNameParts[1];
    console.log('***** >>>>> fieldChange - formGroup: ', formGroup);
    console.log('***** >>>>> fieldChange - formControlName: ', formControlName);
    console.log('***** >>>>> fieldChange - text: ', text);
  }

  onDateChange(event: any) {
    console.log('******* >>> onDateChange - event: ', event);
  }

}
