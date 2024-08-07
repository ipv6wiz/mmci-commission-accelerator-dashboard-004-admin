import { Component, effect, Inject, OnInit } from '@angular/core';
import { FormFieldDto } from '../../mmci-form-mat/dtos/form-field.dto';
import { SelectDto } from '../../mmci-form-mat/dtos/select.dto';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HelpersService } from '../../../service/helpers.service';
import { AdvanceHelpersService } from '../../../service/advance-helpers.service';
import { EmailSendService } from '../../../service/email-send.service';
import { LedgerService } from '../../../service/ledger.service';
import { AdvanceService } from '../../../service/advance.service';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { advanceKanbanRefreshSignal } from '../../../signals/advance-kanban-refresh.signal';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';
import { FundsReceivedFromEscrowDto } from '../../../dtos/funds-received-from-escrow.dto';
import { FundingEmailSettingsDto } from '../../../dtos/funding-email-settings.dto';
import { AdvanceWorkflowDialogConfigEntity } from '../../../entities/advance-workflow-dialog-config.entity';

@Component({
  selector: 'app-escrow-closed-dialog',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatToolbar,
    MmciFormMatComponent,
    MatDialogClose
  ],
  templateUrl: './escrow-closed-dialog.component.html',
  styleUrl: './escrow-closed-dialog.component.scss'
})
export class EscrowClosedDialogComponent implements OnInit {
  private fundingEmailSettings!: FundingEmailSettingsDto;
  dataTypeTag: string = 'kb-escrow-closed-dialog';
  formUUID: string;
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  formConfig!: SelectDto[];
  formMode: string = 'view';
  editButtonText: string = "Edit";
  wfConfig!: AdvanceWorkflowDialogConfigEntity;


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
      {key: 'fieldIdPrefix', value: 'escrow-closed'},
      {key: 'dataTypeTag', value: 'kb-escrow-closed-dialog'},
      {key: 'formTag', value: 'Funds from Escrow Verification'},
      {key: 'justTag', value: 'true'},
      {key: 'formUUID', value: this.formUUID},
      {key: 'showToolbar', value: 'false'},
      {key: 'topSubmit', value: 'false'}
    ];
    this.wfConfig = this.data.wfConfig;
  }

  async ngOnInit() {
    this.fieldsArr = this.populateFormFields();
    this.data.item.amountReceivedFromEscrow = this.data.item.amountToCommAcc;
    this.fundingEmailSettings = await this.advanceHelpers.getFundingEmailSettings();

  }

  async onSubmit(event: any) {
    console.log('EscrowClosedDialogComponent - onSubmit - event: ', event);
    // store eventFormData for use in Accept step
    this.data.item.amountReceivedFromEscrow = event.formData.amountReceivedFromEscrow;
    console.log('EscrowClosedDialogComponent - onSubmit - item: ', this.data.item);
    this.setFormMode('view');
  }

  clickAccept() {
    console.log('RequestPendingDialogComponent - clickAccept - event: ');
    const dialogRef = this.helpers.openConfirmDialog({
      message: `Are you sure that you want to Accept ${this.helpers.formatCurrencyField(this.data.item.amountReceivedFromEscrow)} from Escrow ?`,
      buttonText: {ok: `Yes - Accept ${this.helpers.formatCurrencyField(this.data.item.amountReceivedFromEscrow)} and update ledger`, cancel: 'No'}
    });
    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.postEscrowFundsToLedger(this.data.item).then((postResponse: ApiResponse) => {
            if([200, 201].includes(postResponse.statusCode)) {
              const balance: number = postResponse.data.balance;
              let status: string = 'CLEARED';
              if(balance !== 0) {
                status = 'OUTSTANDING-BALANCE';
              }
              this.advanceHelpers.updateAdvanceStatus(this.data.item.uid, status).then((statusResponse: ApiResponse) => {
                if([200, 201].includes(statusResponse.statusCode)) {
                  this.modal.closeAll();
                  advanceKanbanRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
                } else {
                  throw new Error(statusResponse.msg);
                }
              });
            } else {
              throw new Error(postResponse.msg);
            }
          });
        }

      },
      error: (err) => {
        console.log('clickAccept - dialogRef - error: ', err.message);
      }
    });
  }

  async postEscrowFundsToLedger(data: any): Promise<ApiResponse> {
    const item: FundsReceivedFromEscrowDto = {
      clientId: data.clientId,
      advanceId: data.advanceId,
      amountReceivedFromEscrow: data.amountReceivedFromEscrow,
      advanceName: data.advanceName,
      agreementNumber: data.agreementNumber,
      creator: 'WORKFLOW'
    };
    return await this.ledgerService.postEscrowFunds(data.clientId, item);
  }

  clickEdit() {
    console.log('RequestPendingDialogComponent - clickEdit - event: ');
    if(this.editButtonText === 'Edit') {
      this.setFormMode('edit')
    } else {
      this.setFormMode('view');
    }
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

  populateFormFields(): FormFieldDto[] {
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
