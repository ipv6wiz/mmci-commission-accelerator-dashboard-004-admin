import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormFieldDto } from '../../../../theme/shared/dtos/form-field.dto';
import { AuthenticationService } from '../../../../theme/shared/service';
import { HelpersService } from '../../../../theme/shared/service/helpers.service';

import { NGXLogger } from 'ngx-logger';
import { dataGridRefreshSignal } from '../../../../theme/shared/signals/data-grid-refresh.signal';
import { AddressFormComponent } from '../../../../theme/shared/components/address-form/address-form.component';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { UsersService } from '../../../../theme/shared/service/users.service';
import {  MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ChipListComponent } from '../../../../theme/shared/components/chip-list/chip-list.component';
import { OptionsService } from '../../../../theme/shared/service/options.service';
import { ListWithCountDto } from '../../../../theme/shared/dtos/list-with-count.dto';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-tbl-users-form-mat',
  standalone: true,
  imports: [
    MatDialogClose,
    MatToolbar,
    MatDialogTitle,
    MatDialogContent,
    NgxMaskPipe,
    SharedModule,
    MatSelect,
    MatOption,
    NgxMaskDirective,
    AddressFormComponent,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    ChipListComponent,
    MatProgressSpinner
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './tbl-users-form-mat.component.html',
  styleUrl: './tbl-users-form-mat.component.scss'
})
export class TblUsersFormMatComponent implements OnInit{
  formGroup!: FormGroup;
  fields!: Map<string, FormFieldDto>;
  controls!: {[p: string]: FormControl};
  fieldIdPrefix: string = 'user';
  dataTypeTag: string = 'users';
  formTag: string = 'User';
  roles: string[] = [];
  loadingForm: boolean = true;
  loadSpinnerColor: ThemePalette = 'primary';
  loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  loadSpinnerDiameter: string = '50';

  rows: any[] = [];

  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private helpers: HelpersService,
    private service: UsersService,
    private optionsService: OptionsService,
    private logger: NGXLogger
  ) {
    console.log('constructor - data: ', this.data);
    const fieldsArr: FormFieldDto[] = this.populateFormFields();
    console.log('constructor - fieldsArr: ', fieldsArr);
    this.populateRows(fieldsArr);
    this.fields = new Map<string, FormFieldDto>(fieldsArr.map((obj: FormFieldDto) => [obj.fcn, obj]));
    this.controls = this.helpers.createControls(this.fields, this.data);
    // console.log('Escrow Form - constructor - controls: ', this.controls);
    // console.log('Escrow Form - constructor - typeof controls: ', typeof this.controls);
    this.formGroup = this.formBuilder.group(this.controls);
    this.loadRolesList().then(() => {
      this.loadingForm = false;
    });

  }

  ngOnInit() {
    console.log('ngOnInit - data: ', this.data);
  }

  populateRows(fieldsArr: FormFieldDto[]) {
    // console.log('populateRows - fieldsArr: ', fieldsArr);
    fieldsArr.forEach((field: FormFieldDto) => {
      const rowColParts = field.rowCol.split('.');
      const row: number = parseInt(rowColParts[0], 10);
      const col: number = parseInt(rowColParts[1], 10);
      // console.log(`row: ${row} col: ${col} rows.length: ${this.rows.length}`);
      if(row > this.rows.length) {
        this.rows.push([]);
      }
      this.rows[row - 1].push(field);
    });
    // console.log('populateRows - rows: ', this.rows);
  }

  async loadRolesList() {
    const rolesObj: ListWithCountDto = await this.optionsService.loadValuesItemsForSelect('Roles');
    console.log('loadRolesList - rolesObj: ', rolesObj);
    rolesObj.items.forEach((item:any) => {this.roles.push(item.value)});
  }

  chipListChange(event: {key: string, value: any} ) {
    // console.log('chipListChange - event: ', event);
    this.formGroup.controls[event.key].setValue(event.value);
    // console.log('chipListChange - fcn - value: ', this.formGroup.controls[event.key].value);
    this.formGroup.controls[event.key].markAsDirty();
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
    fields.sort((a,b) => {
      if(a.rowCol < b.rowCol) {
        return -1;
      } else if(a.rowCol > b.rowCol) {
        return 1;
      }
      return 0;
    })

    return fields;
  }



  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
    console.log('onSubmit - values: ', this.formGroup.value);
    let response;
    if(this.data.type === 'new') {
      response = await this.service.createItem(this.formGroup.value);
    } else if(this.data.type === 'update') {
      response = await this.service.updateItem(this.data.item.id, this.formGroup.value);
    }
    dataGridRefreshSignal.set({refresh: true, dataType: this.dataTypeTag })
    console.log('onSubmit - response: ', response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDateChange(event: any) {
    console.log('onDateChange');
  }

  onFieldChange(event: any) {
    console.log('***** >>>>> fieldChange - event: ', event);
    console.log(`***** >>>>> fieldChange - id: ${event.target.id} - value: ${event.target.value}`);
    const text = event.target.value;
    const ctrlId = event.target.id;
    const ctrlNameParts = ctrlId.split('-');
    // const formGroup = ctrlNameParts[0];
    const fcn = ctrlNameParts[1];

    if(this.fields.has(fcn)) {
      const field: FormFieldDto | undefined = this.fields.get(fcn);
      if(field) {
        const doAutoCap: boolean = !!field.autoCapitalize;
        console.log('***** >>>>> fieldChange - doAutoCap: ', doAutoCap);
        if(doAutoCap) {
          const capFirst = this.helpers.autoCapitalize(text);
          this.formGroup.controls[fcn].setValue(capFirst);
        }
      }
    }
  }

  addChip(event: any) {
    console.log('addChip - event: ', event);
    event.chipInput!.clear();
  }

  selectChip(event: any){
    console.log('selectChip - event: ', event);
  }

  removeChip(chip: string) {
    console.log('removeChip - chip: ', chip);
  }

}
