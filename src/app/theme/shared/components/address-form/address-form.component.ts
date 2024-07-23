import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HelpersService } from '../../service/helpers.service';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgStyle } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { FormFieldDto } from '../../dtos/form-field.dto';
import { MmciFormMatComponent } from '../mmci-form-mat/mmci-form-mat.component';
import { SelectDto } from '../mmci-form-mat/dtos/select.dto';
// import { FormFieldDto } from '../../dtos/form-field.dto';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
    NgStyle,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit{
  @Input() addressFormGroup!: any;
  @Input() addrField!: any
  @Input() formMode: string = 'edit'
  @Input() formConfig!: SelectDto[];
  fields!: Map<string, FormFieldDto>
  fieldsArr!: FormFieldDto[];
  subForm: boolean = true;
  fieldIdPrefix: string = 'addr';
  chipListArr!: string[];
  dataObj!: any;
  rows: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private helpers: HelpersService) {}

  ngOnInit() {
    console.log('AddressFormComponent - addressFormGroup: ', this.addressFormGroup);
    console.log('AddressFormComponent - addrField: ', this.addrField);
    this.fields = this.addrField.addrObj.fields;
    this.dataObj = this.addrField.addrObj.getPropsValues();
    console.log('AddressFormComponent - address Form Data: ', this.dataObj);
    console.log('AddressFormComponent - addressFormFields: ', this.fields);
    this.popAddrRows(this.fields);
  }

  popAddrRows(fieldsMap: Map<string, FormFieldDto>) {
    this.fieldsArr = this.helpers.mapToArray(fieldsMap);
    this.rows = this.helpers.populateRows(this.fieldsArr);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFieldChange(event:any) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDateChange(event: any) {}

}
