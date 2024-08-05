import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { HelpersService } from '../../service/helpers.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { AuthenticationService } from '../../service';
import { lastValueFrom } from 'rxjs';
import { ClientService } from '../../service/client.service';
import { ApiResponse } from '../../dtos/api-response.dto';
import { NGXLogger } from 'ngx-logger';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { UserNameLookupPipe } from '../../pipes/userNameLookup.pipe';
import { clientRefreshSignal } from '../../signals/client-refresh.signal';

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
    ReactiveFormsModule,
    MatDialogActions,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    NgxMaskPipe,
    UserNameLookupPipe,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './advance-limit.component.html',
  styleUrl: './advance-limit.component.scss'
})
export class AdvanceLimitComponent implements OnInit {
  creditFormGroup: FormGroup;
  fields: any[] = [];
  activeTab: number = 1;
  creditLimitHistoryColumnsToDisplay: string[] = ['limit', 'active', 'activeDate', 'setBy', 'setDate'];
  creditLimitHistoryColumnNamesToDisplay: string[] = ['Limit', 'Active', 'Active Date', 'Set By', 'Date Set'];

  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private clientService: ClientService,
    private helpers: HelpersService,
    private logger: NGXLogger
  ) {
    this.creditFormGroup = this.formBuilder.group({
      limit: ['', Validators.required],
      activeDate: [{value: '', disabled: true}, [Validators.required]]
    });
    this.fields.push({
      fieldLabel: 'Advance Limit',
      placeholder: 'Advance Limit',
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
    console.log('AdvanceLimitComponent - modal - data: ', this.data);
    console.log('AdvanceLimitComponent - modal - displayName: ', this.data.client.displayName);
    if(this.data.client['creditLimit']){
      this.creditFormGroup.controls['limit'].setValue(this.data.client['creditLimit'].limit);
      this.creditFormGroup.controls['activeDate'].setValue(this.data.client['creditLimit'].activeDate + 'T00:00:00');
    }
  }

  async onSubmit(event:any) {
    console.log('Credit limit Form Submit - event: ', event);
    console.log('Credit limit Form Submit - limit: ',  this.creditFormGroup.controls['limit'].value);
    console.log('Credit limit Form Submit - activeDate: ',  this.creditFormGroup.controls['activeDate'].value);
    const user = this.authService.getLocalUser();
    const activeDate: string = this.creditFormGroup.controls['activeDate'].value.split('T')[0];
    const setDate: string = this.helpers.makeIsoDate(new Date(Date.now()).toLocaleDateString(), false)
    const creditLimitObj = {
      limit: this.creditFormGroup.controls['limit'].value,
      activeDate,
      setDate,
      setBy: user ?  user.uid : 'SYSTEM',
      active: activeDate === setDate
    }
    console.log('----> onSubmit - creditLimitObj: ', creditLimitObj);
    await lastValueFrom(this.clientService.updateClientCreditLimit(this.data.client.uid, creditLimitObj))
      .then((response: ApiResponse) => {
        console.log('updateClientCreditLimit - response: ', response);
        if(response.statusCode === 200) {
          clientRefreshSignal.set({refresh: true, clientId: this.data.client.uid});
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
      .catch((err) => {
        // this.logger.log('updateClientCreditLimit - error: ', err.message);
        return null;
      });
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
    // console.log('******* >>> onDateChange - event: ', event);
    const date = event.value;
    console.log('onDateChange - date: ', date);
    // const : string = event.target._formField.ngControl.control.name;
    // const ngControl = event.target.
    const ctrlId: string = event.targetElement.id;
    console.log('******* >>> onDateChange - ctrlId: ', ctrlId);
    const ctrlNameParts = ctrlId.split('-');
    const formControlName = ctrlNameParts[1];
    console.log(`******* >>> onDateChange - formGroup: ${this.creditFormGroup} - control: ${formControlName}`);
    const localDate = date.toLocaleDateString();
    console.log('******* >>> onDateChange - date: ', localDate);
    const isoDate = this.helpers.makeIsoDate(localDate, false);
    console.log('******* >>> onDateChange - isoDate: ', isoDate);
    this.creditFormGroup.controls[formControlName].setValue(isoDate+'T00:00:00');
  }

}
