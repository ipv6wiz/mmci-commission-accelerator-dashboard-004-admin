import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { HelpersService } from '../../service/helpers.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-credit-limit',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatDialogTitle,
    MatDialogContent,
    MatToolbar,
    MatDialogClose,
    MatFormField,
    MatIcon,
    MatHint,
    MatLabel,
    NgxMaskDirective,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    ReactiveFormsModule
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './credit-limit.component.html',
  styleUrl: './credit-limit.component.scss'
})
export class CreditLimitComponent implements OnInit {
  creditFormGroup: FormGroup;
  fields: any[] = [];

  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private helpers: HelpersService
  ) {
    this.creditFormGroup = this.formBuilder.group({
      limit: ['', Validators.required],
      activeDate: [{value: '', disabled: true}, [Validators.required]]
    });
    this.fields.push({
      fieldLabel: 'Credit Limit',
      placeholder: 'Credit Limit',
      fcn: 'limit',
      type: 'currency',
      required: true,
      disabled: false
    });
    this.fields.push({
      fieldLabel: 'Active On',
      placeholder: 'Date limit becomes active',
      fcn: 'activeDate',
      type: 'date',
      pickerId: 'creditLimit-activeDate',
      startView: 'month',
      storedFormat: 'ISO Local',
      required: true,
      disabled: false
    });
  }

  ngOnInit() {
    console.log('CreditLimitComponent - modal - data: ', this.data);
    console.log('CreditLimitComponent - modal - displayName: ', this.data.client.displayName);
  }

  onSubmit(event:any) {

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
  }

  onDateChange(event: any) {
    // console.log('******* >>> onDateChange - event: ', event);
    const date = event.value;
    // const : string = event.target._formField.ngControl.control.name;
    // const ngControl = event.target.
    const ctrlId: string = event.targetElement.id;
    console.log('******* >>> onDateChange - ctrlId: ', ctrlId);
    const ctrlNameParts = ctrlId.split('-');
    const formControlName = ctrlNameParts[1];
    console.log(`******* >>> onDateChange - formGroup: ${this.creditFormGroup} - control: ${formControlName}`);
      const localDate = date.toLocaleDateString();
      // console.log('******* >>> onDateChange - date: ', localDate);
      const isoDate = this.helpers.makeIsoDate(localDate);
      // console.log('******* >>> onDateChange - isoDate: ', isoDate);
      this.creditFormGroup.controls[formControlName].setValue(isoDate);
      // console.log('onDateChange controls: ', this.f(stepIndex));

  }

}
