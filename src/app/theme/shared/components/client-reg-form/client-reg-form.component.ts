import { Component, effect, Inject, Input, OnInit } from '@angular/core';
import { Registrant } from '../../entities/registrant.entity';
import { RegistrationService } from '../../service/registration.service';
import { AppConfig } from '../../../../app.config';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { HelpersService } from '../../service/helpers.service';
import { mmciFormSubmitSignal } from '../mmci-form-mat/signals/mmci-form-submit.signal';
import { SelectDto } from '../mmci-form-mat/dtos/select.dto';
import { FormFieldDto } from '../mmci-form-mat/dtos/form-field.dto';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MmciFormMatComponent } from '../mmci-form-mat/mmci-form-mat.component';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AddressClass } from '../../entities/address.class';
import { FormBuilder } from '@angular/forms';

export interface clientRegFormConfig {
  fieldsArr: FormFieldDto[],
  formConfig: SelectDto[];
  formUUID: string;
  dataTypeTag: string;
}

@Component({
  selector: 'app-client-reg-form',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatToolbar,
    MatDialogClose,
    MmciFormMatComponent,
    MatProgressSpinner
  ],
  templateUrl: './client-reg-form.component.html',
  styleUrl: './client-reg-form.component.scss'
})
export class ClientRegFormComponent implements OnInit {
  readonly version: string;
  readonly dataTypeTag: string = 'client-reg-form';
  private config: AppConfig = new AppConfig();
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate'
  public loadSpinnerDiameter: string = '50';
  loadingData: boolean = true;
  registrant!: Registrant;
  formConfig!: SelectDto[];
  agentDreDataFieldsArr!: FormFieldDto[];
  brokerageInfoFieldsArr!: FormFieldDto[];
  contactInfoFieldsArr!: FormFieldDto[];
  dreInfoFieldsArr!: FormFieldDto[];
  homeAddressFieldsArr!: FormFieldDto[];
  performanceInfoFieldsArr!: FormFieldDto[];
  docUploadInfoFieldsArr!: FormFieldDto[];
  regFormConfigs: Map<string, clientRegFormConfig> = new Map<string, clientRegFormConfig>();
  regFormDataTypes: string[] = [
    'agentDreData',
    'brokerageInfo',
    'contactInfo',
    'dreInfo',
    'homeAddress',
    'performanceInfo',
    'docUploadInfo'
  ];

  chipListArr: string[];
  formMode: string = 'view';
  editButtonText: string = "Edit";

  formData!: any;

  constructor(
    public modal: MatDialog,
    private formBuilder: FormBuilder,
    private regService: RegistrationService,
    private helpers: HelpersService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.version = this.config.version;
    this.chipListArr = [];

    // mmciFormSubmitSignal effect
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      if(this.regFormDataTypes.includes(formSubmitSignal.dataType)
        && formSubmitSignal.action === 'submit') {
        const formConfig = this.regFormConfigs.get(formSubmitSignal.dataType);
        if (formConfig && formSubmitSignal.formUUID === formConfig.formUUID) {
          this.onSubmit(formSubmitSignal).then();
        }
      }
    });
  }

  async ngOnInit(){
    this.loadingData = true;
    this.registrant = await this.regService.getOne(this.data.client.uid);
    this.formData = this.registrant;
    console.log('ClientRegFormComponent - ngOnInit - formData: ', this.formData);
    this.loadingData = false;
    this.populateFormConfigs();
    console.log('ClientRegFormComponent - ngOnInit - regFormConfigs: ', this.regFormConfigs);
    this.popAgentDreDataFields(this.registrant.agentDreData);
  }

  getFormConfig(dataType: string, itemType: string): any {
    const config: clientRegFormConfig | undefined = this.regFormConfigs.get(dataType);
    if (config) {
      if (config[itemType as keyof clientRegFormConfig]) {
        return config[itemType as keyof clientRegFormConfig];
      }
    }
    return null;
  }

  populateFormConfigs() {
    console.log('===========> populateFormConfigs <=============')
    this.regFormDataTypes.forEach((type: string) => {
      let UUID: string = '';
      let crfc: clientRegFormConfig = {} as clientRegFormConfig;
      switch(type) {
        case 'agentDreData':
           UUID = this.helpers.getUUID();
           crfc = {
              dataTypeTag: type,
              formUUID: UUID,
              fieldsArr: this.popAgentDreDataFields(this.registrant.agentDreData),
              formConfig: [
                {key: 'fieldIdPrefix', value: type},
                {key: 'dataTypeTag', value: type},
                {key: 'formTag', value: 'Agent DRE Data'},
                {key: 'formUUID', value: UUID},
                {key: 'showToolbar', value: 'false'},
                {key: 'topSubmit', value: 'true'},
                {key: 'justTag', value: 'true'},
                {key: 'dataObjType',  value: 'object'}
              ]
          }
          break;
        case 'brokerageInfo':
          UUID = this.helpers.getUUID();
           crfc = {
            dataTypeTag: type,
            formUUID: UUID,
            fieldsArr: this.popBrokerageInfoFields(),
            formConfig: [
              {key: 'fieldIdPrefix', value: type},
              {key: 'dataTypeTag', value: type},
              {key: 'formTag', value: 'Brokerage Info'},
              {key: 'formUUID', value: UUID},
              {key: 'showToolbar', value: 'false'},
              {key: 'topSubmit', value: 'false'},
              {key: 'dataObjType',  value: 'object'}
            ]
          }
          break;
      }
      this.regFormConfigs.set(type, crfc);
    });
  }



  async onSubmit(event: any) {

  }
  /*
  agentDreDataFieldsArr!: FormFieldDto[];
  brokerageInfoFieldsArr!: FormFieldDto[];
  contactInfoFieldsArr!: FormFieldDto[];
  dreInfoFieldsArr!: FormFieldDto[];
  homeAddressFieldsArr!: FormFieldDto[];
  performanceInfoFieldsArr!: FormFieldDto[];
  docUploadInfoFieldsArr!: FormFieldDto[];
   */

  populateFormFields(type: string) {
    this.agentDreDataFieldsArr = this.popAgentDreDataFields(this.registrant.agentDreData);
    this.brokerageInfoFieldsArr = this.popBrokerageInfoFields();
    this.contactInfoFieldsArr = this.popContactInfoFields();
    this.dreInfoFieldsArr = this.popDreInfoFields();
    this.homeAddressFieldsArr = this.popHomeAddressFields();
    this.performanceInfoFieldsArr = this.popPerformanceInfoFields();
    this.docUploadInfoFieldsArr = this.popDocUploadInfoFields();
  }

  popAgentDreDataFields(item: any): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    fields.push({
      fieldLabel: 'First Name',
      placeholder: 'First Name',
      fcn: 'firstName',
      type: 'text',
      readOnly: true,
      required: false,
      disabled: false,
      validators: [],
      width: 33,
      rowCol: '10.1',
    });

    fields.push({
      fieldLabel: 'Middle Name',
      placeholder: 'Middle Name',
      fcn: 'middleName',
      type: 'text',
      readOnly: true,
      required: false,
      disabled: false,
      validators: [],
      width: 33,
      rowCol: '10.2',
    });

    fields.push({
      fieldLabel: 'Last Name',
      placeholder: 'Last Name',
      fcn: 'lastName',
      type: 'text',
      readOnly: true,
      required: false,
      disabled: false,
      validators: [],
      width: 33,
      rowCol: '10.3',
    });

    fields.push({
      fieldLabel: 'License Number',
      placeholder: 'License Number',
      fcn: 'licenseId',
      type: 'text',
      readOnly: true,
      required: false,
      disabled: false,
      validators: [],
      width: 33,
      rowCol: '20.1',
    });

    fields.push({
      fieldLabel: 'License Status',
      placeholder: 'License Status',
      fcn: 'licenseStatus',
      type: 'text',
      readOnly: true,
      required: false,
      disabled: false,
      validators: [],
      width: 33,
      rowCol: '20.2',
    });

    fields.push({
      fieldLabel: 'License Expires',
      placeholder: 'License Expires',
      fcn: 'expirationDate',
      type: 'text',
      readOnly: true,
      required: false,
      disabled: false,
      validators: [],
      width: 33,
      rowCol: '20.3',
    });

    fields.push({
      fieldLabel: 'Agent Address',
      placeholder: 'Address of Client/Agent',
      fcn: 'mailingAddressObjValid',
      type: 'address',
      required: false,
      disabled: false,
      validators: [],
      width: 100, // percentage
      rowCol: '30.1',
      addrObj: new AddressClass(this.formBuilder, this.helpers, item.mailingAddressObjValid)
    });

    fields.push({
      fieldLabel: 'Brokerage',
      placeholder: 'Brokerage',
      fcn: 'responsibleBrokerObj.name',
      type: 'text',
      readOnly: true,
      required: false,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '40.1',
    });
    

    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }

  popBrokerageInfoFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }

  popContactInfoFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }

  popDreInfoFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }

  popHomeAddressFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }

  popPerformanceInfoFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }

  popDocUploadInfoFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];

    const seqFields: FormFieldDto[] = this.helpers.sequenceRowCol(fields);
    return seqFields;
  }


  clickEdit() {
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

}
