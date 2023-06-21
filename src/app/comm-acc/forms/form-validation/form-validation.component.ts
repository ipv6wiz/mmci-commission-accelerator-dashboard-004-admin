// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NarikCustomValidatorsModule } from '@narik/custom-validators';

export class FormInput {
  email!: string;
  password!: string;
  confirmPassword!: string;
  requiredInput!: string;
  url!: string;
  phone!: string;
  cmbGear!: string;
  address!: string;
  file!: string;
  switcher!: string;
}

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export default class FormValidationComponent implements OnInit {
  // private props
  formInput!: FormInput;
  form: undefined;
  isSubmit: boolean;

  // constructor
  constructor() {
    this.isSubmit = false;
  }

  // life cycle event
  ngOnInit() {
    this.formInput = {
      email: '',
      password: '',
      confirmPassword: '',
      requiredInput: '',
      url: '',
      phone: '',
      cmbGear: '',
      address: '',
      file: '',
      switcher: ''
    };
  }

  // public  method
  save(form: { valid: undefined }) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }
  }
}
