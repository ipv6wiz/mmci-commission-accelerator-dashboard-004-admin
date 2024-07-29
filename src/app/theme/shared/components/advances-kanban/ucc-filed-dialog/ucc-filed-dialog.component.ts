import { Component, effect, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HelpersService } from '../../../service/helpers.service';
import { AdvanceHelpersService } from '../../../service/advance-helpers.service';
import { EmailSendService } from '../../../service/email-send.service';
import { LedgerService } from '../../../service/ledger.service';
import { FormBuilder } from '@angular/forms';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { advanceKanbanRefreshSignal } from '../../../signals/advance-kanban-refresh.signal';
import { AdvanceUpdateDto } from '../../../dtos/advance-update.dto';
import { AdvanceService } from '../../../service/advance.service';

@Component({
  selector: 'app-ucc-filed-dialog',
  standalone: true,
  imports: [],
  templateUrl: './ucc-filed-dialog.component.html',
  styleUrl: './ucc-filed-dialog.component.scss'
})
export class UccFiledDialogComponent implements OnInit {
  dataTypeTag: string = 'kb-ucc-filed-dialog';
  formUUID: string;
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  formConfig!: SelectDto[];
  formMode: string = 'view';
  editButtonText: string = "Edit";

  constructor(
    public modal: MatDialog,
    private formBuilder: FormBuilder,
    private helpers: HelpersService,
    private advanceHelpers: AdvanceHelpersService,
    private emailSendService: EmailSendService,
    private ledgerService: LedgerService,
    private service: AdvanceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formUUID = this.helpers.getUUID();
    this.chipListArr = [];
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      if(
        formSubmitSignal.dataType === this.dataTypeTag
        && formSubmitSignal.action === 'submit'
        && formSubmitSignal.formUUID === this.formUUID
      ) {
        this.onSubmit(formSubmitSignal).then();
      }
    });
    this.formConfig = [
      {key: 'fieldIdPrefix', value: 'ucc-filed'},
      {key: 'dataTypeTag', value: 'kb-ucc-filed-dialog'},
      {key: 'formTag', value: 'Funds from Escrow Verification'},
      {key: 'formUUID', value: this.formUUID},
      {key: 'showToolbar', value: 'false'},
      {key: 'topSubmit', value: 'false'}
    ];
  }

  async ngOnInit() {
    this.fieldsArr = this.populateFormFields(this.data.item);
    this.data.item.amountReceivedFromEscrow = this.data.item.amountToCommAcc;
  }

  async onSubmit(event: any) {
    let response: ApiResponse = {statusCode: 999, msg: 'Placeholder'};
    if(event.formType === 'update') {
      try {
        response = await this.service.updateItem(this.data.item.uid, event.formData);
        console.log('UccFiledDialog - onSubmit - response: ', response);
        if([200, 201].includes(response.statusCode)) {
          this.updateFormData(response.data.item);
        } else {
          throw new Error(response.msg);
        }
      } catch (err: any) {
        throw new Error(err.message);
      }
    }
    this.setFormMode('view');
    advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
  }

  updateFormData(resData: AdvanceUpdateDto) {
    const keys = Object.keys(resData);
    keys.forEach((key: string) => {
      this.data.item[key] = resData[key as keyof AdvanceUpdateDto];
    });
  }

  private setFormMode(type: string) {
    switch(type) {
      case 'edit':
        this.formMode = 'edit';
        this.editButtonText = 'View';
        break;
      case 'view':
        this.formMode = 'view';
        this.editButtonText = 'Edit';
        break;
    }
  }

  populateFormFields(item: any): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
    fields.push({
      fieldLabel: 'Amount Received from Escrow',
      placeholder: 'Amount Received from Escrow',
      fcn: 'amountReceivedFromEscrow',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '10.1'
    });

    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }


}
