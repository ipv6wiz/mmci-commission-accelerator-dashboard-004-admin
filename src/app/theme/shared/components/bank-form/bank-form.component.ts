import { Component, Input, OnInit } from '@angular/core';
import { FormFieldDto } from '../mmci-form-mat/dtos/form-field.dto';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HelpersService } from '../../service/helpers.service';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgStyle } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-bank-form',
  standalone: true,
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgForOf,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './bank-form.component.html',
  styleUrl: './bank-form.component.scss'
})
export class BankFormComponent implements OnInit{
  @Input() bankFormGroup!: any;
  @Input() bankField!: any;
  fields!: Map<string, FormFieldDto>;
  fieldIdPrefix: string = 'bank';
  rows: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private helpers: HelpersService) {}

  ngOnInit() {
    console.log('BankFormComponent - addressFormGroup: ', this.bankFormGroup);
    console.log('BankFormComponent - addrField: ', this.bankField);
    this.fields = this.bankField.bankObj.fields;
    console.log('BankFormComponent - bankFormFields: ', this.fields);
    this.popRows(this.fields);
  }

  popRows(fieldsMap: Map<string, FormFieldDto>) {
    const fieldsArr = this.helpers.mapToArray(fieldsMap);
    this.rows = this.helpers.populateRows(fieldsArr);
  }

  onFieldChange(event:any) {}

  onDateChange(event: any) {}

}
