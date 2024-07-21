import { Component, effect, Inject, OnInit } from '@angular/core';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { EscrowCompanyDto } from '../../../dtos/escrow-company.dto';
import { MlsListDto } from '../../../dtos/mls-list.dto';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HelpersService } from '../../../service/helpers.service';
import { AdvanceService } from '../../../service/advance.service';
import { AuthenticationService } from '../../../service';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';

@Component({
  selector: 'app-request-pending-dialog',
  standalone: true,
  imports: [],
  templateUrl: './request-pending-dialog.component.html',
  styleUrl: './request-pending-dialog.component.scss'
})
export class RequestPendingDialogComponent implements OnInit{
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  dataTypeTag: string = 'kb-request-pending-dialog';
  formConfig!: SelectDto[];

  constructor(
    public modal: MatDialog,
    private formBuilder: FormBuilder,
    private helpers: HelpersService,
    private service: AdvanceService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      if(formSubmitSignal.dataType === this.dataTypeTag && formSubmitSignal.action === 'submit') {
        this.onSubmit(formSubmitSignal).then();
      }
    });
    this.formConfig = [
      {key: 'fieldIdPrefix', value: 'request-pending'},
      {key: 'dataTypeTag', value: 'kb-request-pending-dialog'},
      {key: 'formTag', value: 'Request Pending Verification'},
    ];
    this.chipListArr = [];
  }

  ngOnInit() {
    this.fieldsArr = this.populateFormFields();
  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
  }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    return fields;
  }
}
