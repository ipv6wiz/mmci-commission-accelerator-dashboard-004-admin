import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../../theme/shared/service';
import { HelpersService } from '../../../../theme/shared/service/helpers.service';
import { NGXLogger } from 'ngx-logger';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { MatOption, MatSelect } from '@angular/material/select';
import { AddressFormComponent } from '../../../../theme/shared/components/address-form/address-form.component';
import { FormFieldDto } from '../../../../theme/shared/dtos/form-field.dto';
import { EscrowCompanyService } from '../../../../theme/shared/service/escrow-company.service';
import { dataGridRefreshSignal } from '../../../../theme/shared/signals/data-grid-refresh.signal';

@Component({
  selector: 'app-tbl-escrow-company-form-mat',
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
    AddressFormComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './tbl-escrow-company-form-mat.component.html',
  styleUrl: './tbl-escrow-company-form-mat.component.scss'
})
export class TblEscrowCompanyFormMatComponent implements OnInit{
  @Output() refreshRequestEvent = new EventEmitter<string>();
  escrowCompanyFormGroup: FormGroup;
  fields: Map<string, FormFieldDto>;
  controls: {[p: string]: FormControl};
  fieldIdPrefix: string = 'escrow';
  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private helpers: HelpersService,
    private ecService: EscrowCompanyService,
    private logger: NGXLogger
  ) {
    console.log('constructor - data: ', this.data);
    const fieldsArr: FormFieldDto[] = this.populateEscrowCompanyFormFields();
    this.fields = new Map<string, FormFieldDto>(fieldsArr.map((obj: FormFieldDto) => [obj.fcn, obj]));
    this.controls = this.helpers.createControls(this.fields, this.data);
    console.log('Escrow Form - constructor - controls: ', this.controls);
    console.log('Escrow Form - constructor - typeof controls: ', typeof this.controls);
    this.escrowCompanyFormGroup = this.formBuilder.group(this.controls);
  }

  populateEscrowCompanyFormFields(): FormFieldDto[] {
    const fields: any[] = [];
    fields.push({
      fieldLabel: 'Company Name',
      placeholder:'Escrow Company Name',
      fcn: 'companyName',
      autoCapitalize: 'words',
      type: 'text',
      required: true,
      disabled: false,
      validators: []
    });
    fields.push({
      fieldLabel: 'Company Phone',
      placeholder:'Escrow Company Main Phone',
      fcn: 'companyPhone',
      type: 'text',
      mask: '(000) 000-0000',
      required: false,
      disabled: false,
      validators: [['pattern', '^[0-9]*$']]
    });
    // fields.push({
    //   fieldLabel: 'Address',
    //   type: 'address',
    //   fcn: 'companyAddress',
    //   addrObj: new Address(this.formBuilder, this.helpers, this.data.item['companyAddress']),
    //   required: false,
    //   disabled: false
    // });
    return fields;
  }

  ngOnInit() {
    console.log('ngOnInit - data: ', this.data);
  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
    console.log('onSubmit - values: ', this.escrowCompanyFormGroup.value);
    let response;
    if(this.data.type === 'new') {
       response = await this.ecService.createItem(this.escrowCompanyFormGroup.value);
    } else if(this.data.type === 'update') {
      response = await this.ecService.updateItem(this.data.item.id, this.escrowCompanyFormGroup.value);
    }

    dataGridRefreshSignal.set({refresh: true, dataType: 'escrowCompanies' })

    console.log('onSubmit - response: ', response);
  }

  onDateChange(event: any) {
    console.log('onDateChange');
  }

}
