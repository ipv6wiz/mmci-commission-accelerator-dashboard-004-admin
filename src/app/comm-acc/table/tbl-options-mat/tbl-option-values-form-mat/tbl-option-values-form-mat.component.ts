import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../theme/shared/service';

@Component({
  selector: 'app-tbl-option-values-form-mat',
  standalone: true,
  imports: [
    MatDialogClose,
    MatToolbar,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './tbl-option-values-form-mat.component.html',
  styleUrl: './tbl-option-values-form-mat.component.scss'
})
export class TblOptionValuesFormMatComponent implements OnInit {
  optionValueFormGroup: FormGroup;
  fields: any[] = [];

  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
  ) {
    this.optionValueFormGroup = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      sortOrder: ['', Validators.required],
      displayValue: [''],
      description: [''],
      data: ['']
    });
    this.fields.push({
      fieldLabel: 'Key',
      placeholder: 'Option Value Key - must be unique',
      fcn: 'key',
      type: 'text',
      required: true,
      disabled: false
    });
    this.fields.push({
      fieldLabel: 'Value',
      placeholder: 'Option Value',
      fcn: 'value',
      type: 'text',
      required: true,
      disabled: false
    });
    this.fields.push({
      fieldLabel: 'Sort Order',
      placeholder: 'Sort Order - inc by 10',
      fcn: 'sortOrder',
      type: 'text',
      required: true,
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
      fieldLabel: 'Display Value',
      placeholder: 'Option Display Value',
      fcn: 'displayValue',
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
    console.log('TblOptionValuesFormMatComponent - modal - data: ', this.data);

  }

}
