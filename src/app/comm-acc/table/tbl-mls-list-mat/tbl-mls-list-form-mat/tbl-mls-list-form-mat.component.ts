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
import { EscrowCompanyService } from '../../../../theme/shared/service/escrow-company.service';
import { NGXLogger } from 'ngx-logger';
import { dataGridRefreshSignal } from '../../../../theme/shared/signals/data-grid-refresh.signal';
import { AddressFormComponent } from '../../../../theme/shared/components/address-form/address-form.component';
import { MlsListService } from '../../../../theme/shared/service/mls-list.service';

@Component({
  selector: 'app-tbl-mls-list-form-mat',
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
  templateUrl: './tbl-mls-list-form-mat.component.html',
  styleUrl: './tbl-mls-list-form-mat.component.scss'
})
export class TblMlsListFormMatComponent implements OnInit{
  formGroup: FormGroup;
  fields: Map<string, FormFieldDto>;
  controls: {[p: string]: FormControl};
  fieldIdPrefix: string = 'mlsList';
  dataTypeTag: string = 'mlsList';
  formTag: string = 'MLS List Item';

  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private helpers: HelpersService,
    private service: MlsListService,
    private logger: NGXLogger
  ) {
    const fieldsArr: FormFieldDto[] = this.populateFormFields();
    this.fields = new Map<string, FormFieldDto>(fieldsArr.map((obj: FormFieldDto) => [obj.fcn, obj]));
    this.controls = this.helpers.createControls(this.fields, this.data);
    this.formGroup = this.formBuilder.group(this.controls);
  }

  populateFormFields(): FormFieldDto[] {
    const fields: any[] = [];
    fields.push({
      fieldLabel: 'MLS Name',
      placeholder: 'MLS Name',
      fcn: 'mlsName',
      autoCapitalize: 'words',
      type: 'text',
      required: true,
      disabled: false,
      validators: []
    });
    return fields;
  }

  ngOnInit() {
    console.log('ngOnInit - data: ', this.data);
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

}
