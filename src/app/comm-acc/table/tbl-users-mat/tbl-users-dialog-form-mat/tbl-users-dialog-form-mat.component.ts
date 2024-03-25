import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MmciFormMatComponent } from '../../../../theme/shared/components/mmci-form-mat/mmci-form-mat.component';
import { FormFieldDto } from '../../../../theme/shared/dtos/form-field.dto';

@Component({
  selector: 'app-tbl-users-dialog-form-mat',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MmciFormMatComponent
  ],
  templateUrl: './tbl-users-dialog-form-mat.component.html',
  styleUrl: './tbl-users-dialog-form-mat.component.scss'
})
export class TblUsersDialogFormMatComponent {
  fieldsArr: FormFieldDto[];
  chipListArr: string[];
  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log('TblUsersDialogFormMatComponent constructor - data: ', this.data);
    this.fieldsArr = this.populateFormFields();
    this.chipListArr = ['roles'];
  }

  populateFormFields(): FormFieldDto[] {
    const fields: any[] = [];
    fields.push({
      fieldLabel: 'First Name',
      placeholder:'First Name',
      fcn: 'firstName',
      autoCapitalize: 'words',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 33,
      rowCol:'1.1'
    });
    fields.push({
      fieldLabel: 'Middle Name',
      placeholder:'Middle Name',
      fcn: 'middleName',
      autoCapitalize: 'words',
      type: 'text',
      required: false,
      disabled: false,
      width: 33,
      rowCol:'1.2',
      validators: []
    });
    fields.push({
      fieldLabel: 'Last Name',
      placeholder:'Last Name',
      fcn: 'lastName',
      autoCapitalize: 'words',
      type: 'text',
      required: true,
      disabled: false,
      width: 33,
      rowCol:'1.3',
      validators: []
    });
    fields.push({
      fieldLabel: 'Display Name',
      placeholder:'Display Name or auto generated',
      fcn: 'displayName',
      type: 'text',
      autoCapitalize: 'words',
      required: true,
      disabled: false,
      width: 33,
      rowCol:'2.1',
      validators: []
    });
    fields.push({
      fieldLabel: 'Email',
      placeholder:'Email Address',
      fcn: 'email',
      type: 'text',
      required: true,
      disabled: false,
      width: 33,
      rowCol:'2.2',
      validators: [['email']]
    });
    fields.push({
      fieldLabel: 'Email Verified',
      placeholder:'Email Verified',
      fcn: 'emailVerified',
      type: 'boolean',
      required: true,
      disabled: false,
      width: 33,
      rowCol:'2.3',
      validators: []
    });
    fields.push({
      fieldLabel: 'Roles',
      placeholder:'Role',
      fcn: 'roles',
      values: 'Option:Roles',
      type: 'chips',
      required: true,
      disabled: false,
      width: 100,
      rowCol:'3.1',
      validators: []
    });
    return fields;
  }
}
