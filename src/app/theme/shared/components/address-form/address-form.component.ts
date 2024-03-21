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
    NgStyle
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit{
  @Input() addressFormGroup!: any;
  @Input() addrField!: any
  fields!: Map<string, FormFieldDto>
  fieldIdPrefix: string = 'addr';

  constructor(private formBuilder: FormBuilder, private helpers: HelpersService) {

  }

  ngOnInit() {
    console.log('AddressFormComponent - addressFormGroup: ', this.addressFormGroup);
    this.fields = this.addrField.addrObj.fields;
    console.log('AddressFormComponent - addressFormFields: ', this.fields);
  }

  onFieldChange(event:any) {

  }

  onDateChange(event: any) {

  }

}
