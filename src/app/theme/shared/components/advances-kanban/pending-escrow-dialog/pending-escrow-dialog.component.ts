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
  selector: 'app-pending-escrow-dialog',
  standalone: true,
  imports: [],
  templateUrl: './pending-escrow-dialog.component.html',
  styleUrl: './pending-escrow-dialog.component.scss'
})
export class PendingEscrowDialogComponent implements OnInit{
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  dataTypeTag: string = 'kb-pending-escrow-dialog';
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
      {key: 'fieldIdPrefix', value: 'pending-escrow'},
      {key: 'dataTypeTag', value: 'kb-pending-escrow-dialog'},
      {key: 'formTag', value: 'Pending Escrow Confirmation'},
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
