import { Component, Inject, Input, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {SharedModule} from "../../shared.module";
import {RegNavBarComponent} from "../reg-nav-bar/reg-nav-bar.component";
import {AuthenticationService} from '../../service';
import {ClientService} from "../../service/client.service";
import {RegistrationService} from "../../service/registration.service";
import {StorageService} from "../../service/storage.service";
import {DreLookupService} from "../../service/dre-lookup.service";
import {Client} from "../../entities/client.interface";
import {Registrant} from "../../entities/registrant.entity";
import {BehaviorSubject, Subscription} from "rxjs";
import {DocUploadFormDto} from "../../dtos/doc-upload-form.dto";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {ClientContactDto} from "../../dtos/client-contact.dto";
import {ClientDreInfoDto} from "../../dtos/client-dre-info.dto";
import {AddressDto} from "../../dtos/address.dto";
import {BrokerageDto} from "../../dtos/brokerage.dto";
import {AgentPerformanceDto} from "../../dtos/agent-performance.dto";
import {ApiResponse} from "../../dtos/api-response.dto";
import {DocUploadInfoDto} from "../../dtos/doc-upload-info.dto";
import {MatIconModule} from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import {RegFormHelpComponent} from "../reg-form-help/reg-form-help.component";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule, ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {ThemePalette} from "@angular/material/core";
import { HelpersService } from '../../service/helpers.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { FileManagerComponent } from '../file-manager/file-manager.component';
import { ClientUpdateDto } from '../../dtos/client-update.dto';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-reg-form-v2-mat',
  standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        RegNavBarComponent,
        NgxMaskDirective,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        FileManagerComponent,
        FileUploadComponent
    ],
    providers: [
        provideNgxMask()
    ],
  templateUrl: './reg-form-v2-mat.component.html',
  styleUrls: ['./reg-form-v2-mat.component.scss']
})
export class RegFormV2MatComponent implements OnInit {
    refreshRequest: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    clientBucketName: string = '';
    registrant: Registrant;
    currentClient: Client = {} as Client;
    dreLicenseData: any;
    dreBrokerLicenseData: any;
    agentData: any;
    formLoading: boolean = false;
    public loadSpinnerColor: ThemePalette = 'primary';
    public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
    public loadSpinnerDiameter: string = '50';

    docUploadMap: Map<string, DocUploadInfoDto> = new Map<string, DocUploadInfoDto>();

    docUploads: DocUploadFormDto[] = [
        {
            title: '12-month production report from MLS',
            text: 'More Report Info',
            folder: 'prod-report',
            ctrlName: 'prodReport',
            newFileName: '12-month-production-report-from-MLS',
            accept: 'image/png,image/jpg,image/jpeg,application/PDF',
            allowedExts: ['.jpg', '.jpeg', '.png', '.pdf'],
            uploadUrl: '',
            uploaded: false,
            status: 0
        },
        {
            title: 'DRE License (public view)',
            text: 'More DRE License Info',
            folder: 'dre-license',
            ctrlName: 'dreLicense',
            newFileName: 'CA-DRE-License',
            accept: 'image/png,image/jpg,image/jpeg,application/PDF',
            allowedExts: ['.jpg', '.jpeg', '.png', '.pdf'],
            uploadUrl: '',
            uploaded: false,
            status: 0
        },
        {
            title: 'California Drivers License (Front Side)',
            text: 'FRONT side of your Drivers License',
            folder: 'drivers-license',
            ctrlName: 'driversLicenseFront',
            newFileName: 'CA-Drivers-License-Front',
            accept: 'image/png,image/jpg,image/jpeg,application/PDF',
            allowedExts: ['.jpg', '.jpeg', '.png', '.pdf'],
            uploadUrl: '',
            uploaded: false,
            status: 0
        },
        {
            title: 'California Drivers License (Back Side)',
            text: 'BACK side of your Drivers License',
            folder: 'drivers-license',
            ctrlName: 'driversLicenseBack',
            newFileName: 'CA-Drivers-License-Back',
            accept: 'image/png,image/jpg,image/jpeg,application/PDF',
            allowedExts: ['.jpg', '.jpeg', '.png', '.pdf'],
            uploadUrl: '',
            uploaded: false,
            status: 0
        }
    ]

    isLinear = false; // @TODO set isLinear to true for production

    steps: any[] = [];
    docUploadComplete: boolean = false;
    docUploadGroup: any;
    regFormDoneGroup: any;
    clientId!: string;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
        private clientService: ClientService,
        private regService: RegistrationService,
        private storageService: StorageService,
        private dre: DreLookupService,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
        private helpers: HelpersService
    ) {

        this.registrant = new Registrant();
        // this.populateSteps();
        // console.log('RegFormV2MatComponent - constructor - after populateSteps');
        // this.setup().then(() => {
        //     console.log('RegFormV2MatComponent - constructor - after setup');
        // });
        console.log('RegFormV2MatComponent - constructor - end');
    }

    openDialog() {
        const dialogRef = this.dialog.open(RegFormHelpComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`RegFormV2MatComponent - Dialog result: ${result}`);
        });
    }

    async ngOnInit() {
        this.formLoading = true;
        this.clientId = this.data.client.uid;
        this.populateSteps();
        console.log('RegFormV2MatComponent - ngOnInit - data: ', this.data);

        await this.setup();
        console.log('RegFormV2MatComponent - ngOnInit - after setup');
        const docUploadControls = {};
        this.docUploads.forEach((du: DocUploadFormDto) => {
            // @ts-ignore
            docUploadControls[du.ctrlName] = ['', Validators.required];
            this.docUploadMap.set(du.ctrlName, {
                title: du.title,
                folder: du.folder,
                fileName: du.newFileName,
                uploaded: du.uploaded,
                ctrlName: du.ctrlName,
                status: 0,
                fullFileName: ''
            });
        });
        console.log('RegFormV2MatComponent - ngOnInit - docUploadControls: ', docUploadControls);
        console.log('RegFormV2MatComponent - ngOnInit - docUploadMap: ', this.docUploadMap);
        // this.docUploadGroup.controls = docUploadControls;
        // this.docUploadGroup.setErrors({noUploads: true});
        this.docUploadGroup = this._formBuilder.group(docUploadControls);
        console.log('RegFormV2MatComponent - ngOnInit - docUploadGroup: ', this.docUploadGroup);
        this.regFormDoneGroup = this._formBuilder.group({done: ['', Validators.required]});
        this.formLoading = false;
    }

    async setup(): Promise<any> {
        try {
            if(this.clientId) {
                try {
                    this.currentClient = this.data.client;
                    if(this.currentClient) {
                        console.log('RegFormV2MatComponent - setup - currentClient: ', this.currentClient);
                        if(!!this.currentClient.bucket) {
                            this.clientBucketName = this.currentClient.bucket;
                            this.makeFileUploaderUrls(this.currentClient.bucket);
                        } else {
                            throw new Error(`No bucket for Client ID: ${this.clientId}`)
                        }
                        // this.formLoading = true;
                        try {
                            const reg: Registrant = await this.regService.getOne(this.clientId);
                            if(reg) {
                                this.registrant = reg;
                                console.log('RegFormV2MatComponent - setup - reg: ', reg);
                                this.populateFormWithRegistrantData();
                            } else {
                                this.registrant.uid = this.clientId;
                            }
                        } catch (e) {
                            this.registrant.uid = this.clientId;
                        }
                        // this.formLoading = false;
                    }
                } catch (err: any) {
                    console.log('RegFormV2MatComponent - setup - currentClient & Registrant Error: ', err.message);
                    throw new Error('setup - get currentClient & Registrant Error:' + err.message);
                }
                console.log('RegFormV2MatComponent - setup - before dreAgentLicenseData');
                try {
                    this.dreLicenseData = await this.dre.checkDreLicense(this.currentClient.dreNumber)
                } catch (err: any) {
                    throw new Error(`checkDreLicense - error - msg: ${err.message}`);
                }
                console.log('RegFormV2MatComponent - setup - before dreBrokerLicenseData');
                try {
                    const brokerLicenseId: string = this.dreLicenseData.responsibleBrokerObj.brokerageLicenseId;
                    this.dreBrokerLicenseData = await this.dre.checkDreLicense(brokerLicenseId)
                } catch (err: any) {
                    throw new Error(`checkDreLicense - error - msg: ${err.message}`);
                }

            } else {
                throw new Error('Failed to load local client data');
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    makeFileUploaderUrls(bucketName: string) {
        this.docUploads.forEach((item) => {
            item.uploadUrl = this.storageService.makeFileUploaderUrl(bucketName, item.folder);
        });
        console.log('RegFormV2MatComponent - docUploads - after:', this.docUploads);
    }

    populateSteps() {
        console.log('RegFormV2MatComponent - =======> populateSteps <========');
        const contactInfoGroup = this._formBuilder.group({
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            cellPhone: ['', [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                    Validators.minLength(10),
                    Validators.maxLength(10)
                ]
            ],
            email: ['', [
                    Validators.required,
                    Validators.email
                    // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
                ]
            ]
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After contactInfoGroup');
        // const required = 'required';
        // contactInfoGroup.controls.middleName.addValidators(Validators['required'])

        const addressInfoGroup = this._formBuilder.group({
            Address1: ['', Validators.required],
            Address2: [''],
            City: ['', Validators.required],
            State: [{value: 'CA', readonly: true}, Validators.required],
            Zip5: ['', [
                    Validators.required,
                    Validators.pattern("^[0-9]{5}?$"),
                    Validators.minLength(5),
                    Validators.maxLength(5)
                ]
            ],
            Zip4: ['', [
                Validators.pattern("^[0-9]{4}?$"),
                Validators.maxLength(4),
                Validators.minLength(4)
            ]
            ]
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After addressInfoGroup');
        const dreInfoGroup = this._formBuilder.group({
            dreNumber: ['', [
                    Validators.required,
                    Validators.pattern("^[0-9]{8}?$"),
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ]
            ],
            issueDate: [{value: '', readonly: true}, [
                    Validators.required,
                ]
            ],
            expirationDate: [{value: '', readonly: true}, [
                    Validators.required,
                ]
            ],
            status: ['', [
                    Validators.required,
                ]
            ],
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After dreInfoGroup');
        const brokerageInfoGroup = this._formBuilder.group({
            brokerageName: ['', Validators.required],
            brokerageDreNumber: ['', [
                    Validators.required,
                    Validators.pattern("^[0-9]{8}?$"),
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ]
            ],
            brokerName: ['', Validators.required],
            brokerEmail: ['', [
                    Validators.required,
                    Validators.email
                    // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
                ]
            ],
            brokerOfficePhone: ['', [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                    Validators.minLength(10),
                    Validators.maxLength(10)
                ]
            ],
            brokerCellPhone: ['', [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                    Validators.minLength(10),
                    Validators.maxLength(10)
                ]
            ],
            brokerDreNumber: ['', [
                    Validators.required,
                    Validators.pattern("^[0-9]{8}?$"),
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ]
            ],
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After brokerageInfoGroup');
        const performanceInfoGroup = this._formBuilder.group({
            productionVolume: ['', [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                ]
            ],
            productionQty: ['',[
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                ]
            ],
            activePurchaseEscrows: ['',[
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                ]
            ],
            activeListings: ['',[
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                ]
            ],
            pendingListings: ['',[
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                ]
            ],
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After performanceInfoGroup');
        this.steps.push({
            stepControl: contactInfoGroup,
            formGroup: contactInfoGroup,
            stepLabel: 'Contact Info',
            stepId: 'contactInfo',
            stepNext: true,
            stepPrev: false,
            fields: [
                {
                    fieldLabel: 'First Name',
                    placeholder: 'First Name',
                    fcn: 'firstName',
                    autoCapitalize: 'words',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Middle Name(s)',
                    placeholder: 'Optional Middle Name(s)',
                    fcn: 'middleName',
                    autoCapitalize: 'words',
                    required: false,
                    disabled: false
                },
                {
                    fieldLabel: 'Last Name',
                    placeholder: 'Last Name',
                    fcn: 'lastName',
                    autoCapitalize: 'words',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Cell Phone',
                    placeholder: 'Your Primary Phone Number',
                    fcn: 'cellPhone',
                    required: true,
                    disabled: false,
                    mask: '(000) 000-0000'
                },
                {
                    fieldLabel: 'Email',
                    placeholder: 'Your Primary Email address',
                    fcn: 'email',
                    required: true,
                    disabled: false
                }
            ]
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After contactInfoGroup - steps');
        this.steps.push({
            stepControl: addressInfoGroup,
            formGroup: addressInfoGroup,
            stepLabel: 'Home/Mailing Address',
            stepId: 'homeAddress',
            stepNext: true,
            stepPrev: true,
            fields: [
                {
                    fieldLabel: 'Address Line 1',
                    placeholder: 'Street Address',
                    fcn: 'Address1',
                    autoCapitalize: 'words',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Address Line 2',
                    placeholder: 'Optional - Address Line 2',
                    fcn: 'Address2',
                    autoCapitalize: 'words',
                    required: false,
                    disabled: false
                },
                {
                    fieldLabel: 'City',
                    placeholder: 'City',
                    fcn: 'City',
                    autoCapitalize: 'words',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'State',
                    placeholder: 'State',
                    fcn: 'State',
                    required: true,
                    disabled: true
                },
                {
                    fieldLabel: 'Zip Code ',
                    placeholder: 'Your 5 digit Zip code',
                    fcn: 'Zip5',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Zip Code extension',
                    placeholder: 'Optional Your 4 digit zip extension',
                    fcn: 'Zip4',
                    required: false,
                    disabled: false
                }
            ]
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After addressInfoGroup - steps');
        this.steps.push({
            stepControl: dreInfoGroup,
            formGroup: dreInfoGroup,
            stepLabel: 'Your DRE Info',
            stepId: 'dreInfo',
            stepNext: true,
            stepPrev: true,
            fields: [
                {
                    fieldLabel: 'DRE License Number',
                    placeholder: 'Your DRE #',
                    fcn: 'dreNumber',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'License Issue Date',
                    placeholder: 'Date your license was originally issued',
                    fcn: 'issueDate',
                    type: 'date',
                    pickerId: 'dreInfo-issueDate',
                    startView: 'year',
                    storedFormat: 'ISO Local',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'License Expiration Date',
                    placeholder: 'Date your license expires',
                    fcn: 'expirationDate',
                    type: 'date',
                    pickerId: 'dreInfo-expirationDate',
                    startView: 'year',
                    storedFormat: 'ISO Local',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'License Status',
                    placeholder: 'Current status of your license',
                    fcn: 'status',
                    type: 'select',
                    options: [
                        {value: 'LICENSED', key: 'Licensed (Active)'},
                        {value: 'EXPIRED', key: 'Expired (Not Active)'}
                    ],
                    required: true,
                    disabled: false
                }
            ]
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After dreInfoGroup - steps');
        this.steps.push({
            stepControl: brokerageInfoGroup,
            formGroup: brokerageInfoGroup,
            stepLabel: 'Responsible Broker',
            stepId: 'brokerageInfo',
            stepNext: true,
            stepPrev: true,
            fields: [
                {
                    fieldLabel: 'Brokerage Name',
                    placeholder: 'Name of the Responsible Brokerage (Not Broker unless the same)',
                    fcn: 'brokerageName',
                    autoCapitalize: 'words',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Brokerage DRE License Number',
                    placeholder: 'Brokerage License number (Not Broker  unless the same)',
                    fcn: 'brokerageDreNumber',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Broker Name',
                    placeholder: 'Name of the Responsible Broker at the Brokerage',
                    fcn: 'brokerName',
                    autoCapitalize: 'words',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Broker DRE License Number',
                    placeholder: 'DRE License Number for responsible broker',
                    fcn: 'brokerDreNumber',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Broker email address',
                    placeholder: 'Email address of responsible broker',
                    fcn: 'brokerEmail',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Broker Office Phone',
                    placeholder: 'Office Phone number for responsible broker',
                    fcn: 'brokerOfficePhone',
                    mask: '(000) 000-0000',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Broker Cell Phone',
                    placeholder: 'Cell Phone Number for responsible broker',
                    fcn: 'brokerCellPhone',
                    mask: '(000) 000-0000',
                    required: true,
                    disabled: false
                }
            ]
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After brokerageInfoGroup - steps');
        this.steps.push({
            stepControl: performanceInfoGroup,
            formGroup: performanceInfoGroup,
            stepLabel: 'Your Last 12 Months Performance',
            stepId: 'performanceInfo',
            stepNext: true,
            stepPrev: true,
            fields: [
                {
                    fieldLabel: 'Last 12 months transaction $ volume',
                    placeholder: 'Your transaction $ volume for the last 12 months',
                    fcn: 'productionVolume',
                    type: 'currency',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Your Last 12 months transaction quantity',
                    placeholder: 'Your transaction quantity for the last 12 months',
                    fcn: 'productionQty',
                    type: 'quantity',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Your Active Purchase Escrows (qty)',
                    placeholder: 'Your Active Purchase Escrows quantity',
                    fcn: 'activePurchaseEscrows',
                    type: 'quantity',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Your Active Listings (qty)',
                    placeholder: 'Your Active Listings quantity',
                    fcn: 'activeListings',
                    type: 'quantity',
                    required: true,
                    disabled: false
                },
                {
                    fieldLabel: 'Your Pending Listings (qty)',
                    placeholder: 'Your Pending Listings quantity',
                    fcn: 'pendingListings',
                    type: 'quantity',
                    required: true,
                    disabled: false
                }
            ]
        });
        console.log('RegFormV2MatComponent - =======> populateSteps <======== - After performanceInfoGroup - steps');
    }

    populateFormWithRegistrantData() {
        for(let step= 0; step < this.steps.length; step++){
            this.populateRegistrantDataByStep(step,'from');
        }
        this.populateRegistrantUploadData('from');
    }

    async saveRegistrantData() {
        try {
            if(!this.registrant.agentDreData) {
                this.registrant.agentDreData = this.dreLicenseData;
            }
            if(!this.registrant.brokerDreData) {
                this.registrant.brokerDreData = this.dreBrokerLicenseData;
            }
            const response = await this.regService.saveRegForm(this.registrant);
            console.log('RegFormV2MatComponent - saveRegistrantData - response: ', response);
            return response;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    populateRegistrantUploadData(dir: string): any {
        if(dir === 'to') {
            console.log('******** RegFormV2MatComponent - populateRegistrantUploadData - to - docUploadMap: ', this.docUploadMap);
            return Object.fromEntries(this.docUploadMap);
        } else {
            // @ts-ignore
            if(!this.helpers.isEmpty(this.registrant.docUploadInfo)) {
                console.log('******** RegFormV2MatComponent - populateRegistrantUploadData - to - registrant.docUploadInfo: ', this.registrant.docUploadInfo);
                this.docUploadMap = new Map(Object.entries( this.registrant.docUploadInfo));
            }
            console.log('******** RegFormV2MatComponent - populateRegistrantUploadData - FROM - docUploadMap: ', this.docUploadMap);
            for(let key of this.docUploadMap.keys()) {
                console.log('RegFormV2MatComponent - populateRegistrantUploadData - from - key: ', key);
                const item = this.docUploadMap.get(key);
                if(item && item.uploaded) {
                    this.docUploadGroup.controls[key].setValue('true');
                    const di = this.findDocUploadIndex(key);
                    console.log(`RegFormV2MatComponent - >>>>>>> populateRegistrantUploadData - di: ${di}`);
                    if(di !== -1) {
                        this.docUploads[di].uploaded = true;
                    }
                } else {
                    this.docUploadGroup.controls[key].reset();
                }
            }
        }
        return true;
    }

    private findFieldDefInStep(stepIndex: number, fcn: string): any {
        for(let i = 0; i < this.steps[stepIndex].fields.length; i++) {
            const field = this.steps[stepIndex].fields[i];
            if(field.fcn === fcn) {
                return field;
            }
        }
        return null;
    }


    populateRegistrantDataByStep(step: number, dir: string = 'to') {
        const group: string = this.steps[step].stepId;
        const controls = this.f(step);
        const keys: string[] = Object.keys(controls);
        const objKeyToUse: keyof Registrant = group as keyof Registrant;
        let keyToUse: string = '';

        const updateData = (dir: string, keyToUse: string, objKeyToUse: any, controls: string) => {
            const field = this.findFieldDefInStep(step, keyToUse);
            if (dir === 'to') {
                if(!!field && !!field.type) {
                    if(field.type === 'date' && field.storedFormat === 'ISO Local') {
                        // @ts-ignore
                        const formDate = controls[keyToUse].value; // date Object
                        // console.log('RegFormV2MatComponent - >>>>>>> updateData formDate: ', formDate);
                        // console.log('RegFormV2MatComponent - >>>>>>> updateData formDate - typeof', typeof formDate);
                        if(typeof formDate === 'object') {
                            const localDate = formDate.toLocaleDateString();
                            // console.log('RegFormV2MatComponent - ******* >>> onDateChange - date: ', localDate);
                            const isoDate = this.helpers.makeIsoDate(localDate);
                            // console.log('RegFormV2MatComponent - ******* >>> onDateChange - isoDate: ', isoDate);
                            // @ts-ignore
                            this.registrant[objKeyToUse][keyToUse] = isoDate.split('T')[0];
                        } else {
                            // @ts-ignore
                            this.registrant[objKeyToUse][keyToUse] = formDate.split('T')[0];
                        }
                    } else if(field.type === 'text' && !!field.autoCapitalize && field.autoCapitalize === 'words') {
                        // @ts-ignore
                        this.registrant[objKeyToUse][keyToUse] = this.helpers.autoCapitalize(controls[keyToUse].value.trim());
                    } else if(field.type === 'select') {
                        // @ts-ignore
                        this.registrant[objKeyToUse][keyToUse] = controls[keyToUse].value;
                    } else {
                        // @ts-ignore
                        this.registrant[objKeyToUse][keyToUse] = controls[keyToUse].value;
                    }
                } else {
                    // @ts-ignore
                    this.registrant[objKeyToUse][keyToUse] = controls[keyToUse].value;
                }
            } else { // dir = 'from' Collection
                if(!!field && !!field.type ) {
                    if(field.type === 'date' && field.storedFormat === 'ISO Local') {
                        // @ts-ignore
                        const storedDate = this.registrant[objKeyToUse][keyToUse];
                        const dateValue = new Date(`${storedDate}T00:00:00`);
                        // @ts-ignore
                        this.steps[step].formGroup.controls[keyToUse].setValue(dateValue);
                    } else if(field.type === 'text' && !!field.autoCapitalize && field.autoCapitalize === 'words'){
                        // @ts-ignore
                        this.steps[step].formGroup.controls[keyToUse].setValue(this.helpers.autoCapitalize(this.registrant[objKeyToUse][keyToUse]));
                    } else if(field.type === 'select') {
                        // @ts-ignore
                        this.steps[step].formGroup.controls[keyToUse].setValue(this.registrant[objKeyToUse][keyToUse]);
                    } else {
                        // @ts-ignore
                        this.steps[step].formGroup.controls[keyToUse].setValue(this.registrant[objKeyToUse][keyToUse]);
                    }
                } else {
                    // @ts-ignore
                    this.steps[step].formGroup.controls[keyToUse].setValue(this.registrant[objKeyToUse][keyToUse]);
                }
            }
        }

        keys.forEach((key: string) => {
            switch (group) {
                case 'contactInfo':
                        keyToUse = key as keyof ClientContactDto;
                    break;
                case 'dreInfo':
                        keyToUse = key as keyof ClientDreInfoDto;
                    break;
                case 'homeAddress':
                        keyToUse = key as keyof AddressDto;
                    break;
                case 'brokerageInfo':
                        keyToUse = key as keyof BrokerageDto;
                    break;
                case 'performanceInfo':
                        keyToUse = key as keyof AgentPerformanceDto;
                    break;
            }
            updateData(dir, keyToUse, objKeyToUse, controls);
        });

        console.log('RegFormV2MatComponent - populateRegistrantData - registrant: ', this.registrant);
        console.log('RegFormV2MatComponent - populateRegistrantData - form controls: ', controls);
    }

    findDocUploadIndex(ctrlName: string): number {
        return this.docUploads.findIndex((item) => item.ctrlName === ctrlName);
    }

    async onFileUploaded(response: ApiResponse) {
        // DO NOT handle  file upload in UI only in API use data to set the docUploadComplete flag
        console.log('RegFormV2MatComponent - >>>>>>> onFileUploaded - response: ', response);
        if(response.statusCode !== 201) {
            throw new Error(response.msg);
        } else {
            const ctrlName: string = response.data.ctrlName;
            console.log(`RegFormV2MatComponent - >>>>>>> onFileUploaded - ctrlName: ${ctrlName}`);
            // @ts-ignore
            this.docUploadGroup.controls[ctrlName].setValue('true');
            console.log('RegFormV2MatComponent - >>>>>>> onFileUploaded - docUploadMap: ', this.docUploadMap);
            const item = this.docUploadMap.get(ctrlName);
            console.log('RegFormV2MatComponent - >>>>>>> onFileUploaded - BEFORE - item: ', item);
            if(item) {
                item.uploaded = true;
                item.fullFileName = response.data.fileName;
                console.log('RegFormV2MatComponent - >>>>>>> onFileUploaded - item: ', item);
                this.docUploadMap.set(ctrlName, item);
                const di: number = this.findDocUploadIndex(ctrlName);
                console.log(`RegFormV2MatComponent - >>>>>>> onFileUploaded - di: ${di}`);
                if(di !== -1) {
                    this.docUploads[di].uploaded = true;
                }
                this.populateRegistrantUploadData('to');
                await this.saveRegistrantData();
            }
        }
        this.refreshRequest.next(true);
    }

    onDocSubmit(event:any) {
        console.log('RegFormV2MatComponent - onDocSubmit - event: ', event);
    }

    async onStepChange(event: any) {
        console.log('RegFormV2MatComponent - onStepChange - event: ', event);
        const allValid: boolean = this.checkGroupsAreValid();
        console.log(`RegFormV2MatComponent - onStepChange - ${allValid?'All groups are VALID': 'Some groups are INVALID'}`);
        console.log(`RegFormV2MatComponent - onStepChange - docUploadGroup ${this.checkDocUploadGroupIsValid()? 'is VALID': 'Is NOT valid'}`);
        const stepIndex: number = event.previouslySelectedIndex;
        if(stepIndex < this.steps.length) {
            const isDirty = this.checkForDirtyControls(stepIndex);
            const isValid = this.checkGroupIsValid(stepIndex);
            console.log(`RegFormV2MatComponent - onStepChange previous step ${stepIndex} - ${this.steps[stepIndex].stepId} - ${isValid? 'is VALID ': 'is NOT Valid '} and ${isDirty ? 'has': 'does not have'} dirty controls:` , this.f(stepIndex));
            console.log('RegFormV2MatComponent - onStepChange previous controls: ', this.f(stepIndex));
            if(isValid) {
                this.populateRegistrantDataByStep(stepIndex);
                this.populateRegistrantUploadData('to');
                await this.saveRegistrantData();
            }
        }
    }

    async onSubmit(event: any){
        if(event.submitter.id === 'reg-form-save') {
            // let clientLocalData = this.authService.getLocalClientData();
            // this.clientLocalData = clientLocalData;
            const client: ClientUpdateDto = {
                uid: this.clientId,
                roles: ['CLIENT-PENDING-VERIFICATION'],
                status: 'Client Pending Verification',
                defaultPage: '/reg/pending-verification',
                clientDocs: this.populateRegistrantUploadData('to'),
                cellPhone: this.registrant.contactInfo.cellPhone,
                agentDreData: this.registrant.agentDreData,
                brokerage: this.registrant.brokerageInfo,
                dreNumber: this.registrant.dreInfo.dreNumber || ''
            };
            try {
                try {
                    this.registrant.docUploadInfo =  this.populateRegistrantUploadData('to');
                    const regResp = await this.saveRegistrantData();
                    if(regResp) {
                        try {
                            console.log('RegFormV2MatComponent -------> onSubmit - about to update client');
                            const clientResp = await this.clientService.update(this.clientId, client); // <--------
                            console.log('RegFormV2MatComponent -------> onSubmit - clientResp: ', clientResp);
                            if(clientResp.statusCode === 200) {
                                // this.authService.setLocalClientData({client: clientResp.data }, 'client');
                                // return this.router.navigate([client.defaultPage]);
                            }
                        } catch (err: any) {
                            throw new Error(`Error saving Reg Form Client: error: ${err.message}`);
                        }
                    }
                } catch (err: any) {
                    throw new Error(`Error saving Reg Form: error: ${err.message}`);
                }
            } catch (e: any) {
                throw new Error(e.message);
            }
        } else {
            const stepIndex: number = this.findStepIndex(event.submitter.id);
            if(stepIndex !== -1){
                const isDirty = this.checkForDirtyControls(stepIndex);
                const isValid = this.checkGroupIsValid(stepIndex);
                console.log(`RegFormV2MatComponent - onSubmit for step ${stepIndex} - ${event.submitter.id} Group ${isValid? 'is VALID ': 'is NOT Valid '} and ${isDirty ? 'has': 'does not have'} dirty controls:` , this.f(stepIndex));
                console.log(`RegFormV2MatComponent - onSubmit for step ${stepIndex} - controls: `, this.f(stepIndex));
                if(isValid) {
                    this.populateRegistrantDataByStep(stepIndex);
                    this.registrant.docUploadInfo =  this.populateRegistrantUploadData('to');
                    await this.saveRegistrantData();
                }
            } else {
                console.log('RegFormV2MatComponent - No entry for stepId: ', event.submitter.id);
            }
        }
    }

    onPrevious(event: any) {
        console.log('RegFormV2MatComponent - onPrevious event: ', event);
    }

    checkGroupIsValid(step: number): boolean {
        return this.steps[step].formGroup.status === 'VALID'
    }

    checkDocUploadGroupIsValid(): boolean {
        const isValid: boolean = this.docUploadGroup.status === 'VALID';
        this.docUploadComplete = isValid;
        return isValid;
    }

    checkGroupsAreValid(): boolean {
        let isValid: boolean = true;
        for( let i= 0; i < this.steps.length; i++){
            if(!this.checkGroupIsValid(i)) {
                isValid = false;
                break;
            }
        }
        if(isValid) {
            // if the regular steps are VALID check docUploadGroup
            isValid = this.checkDocUploadGroupIsValid();
        }
        return isValid;
    }

    checkForDirtyControls(stepIndex:number): boolean{
        const controls = this.f(stepIndex);
        console.log('RegFormV2MatComponent - checkForDirtyControls - controls: ', controls)
        let isDirty: boolean = false;
        const ctrlKeys = Object.keys(controls);
        for(let i=0; i<ctrlKeys.length; i++){
            if(!isDirty && controls[ctrlKeys[i]]['_pendingDirty']) {
                isDirty = true;
                break;
            }
        }
        console.log('RegFormV2MatComponent - checkForDirtyControls -isDirty: ', isDirty);
        return isDirty;
    }

    f(step: number) { return this.steps[step].formGroup.controls}

    findStepIndex(stepId: string): number {
        for(let i=0; i<this.steps.length; i++) {
            if(this.steps[i].stepId === stepId) {
                return i;
            }
        }
        return  -1;
    }

    findFieldIndex(stepIndex: number, fcn: string): number {
        for(let x = 0; x < this.steps[stepIndex].fields.length; x++) {
            console.log(`RegFormV2MatComponent - >>>> ***** >>> findFieldIndex - fcn: ${fcn} - field fcn: ${this.steps[stepIndex].fields[x].fcn}`);
            if(this.steps[stepIndex].fields[x].fcn === fcn) {
                return x;
            }
        }
        return -1;
    }

    fieldChange(event: any) {
        console.log('RegFormV2MatComponent - ***** >>>>> fieldChange - event: ', event);
        console.log(`RegFormV2MatComponent - ***** >>>>> fieldChange - id: ${event.target.id} - value: ${event.target.value}`);
        const text = event.target.value;
        const ctrlId = event.target.id;
        const ctrlNameParts = ctrlId.split('-');
        const formGroup = ctrlNameParts[0];
        const formControlName = ctrlNameParts[1];
        const stepIndex = this.findStepIndex(formGroup);
        if(stepIndex !== -1) {
            const fieldIndex = this.findFieldIndex(stepIndex, formControlName);
            console.log('RegFormV2MatComponent - ***** >>>>> fieldChange - fieldIndex: ', fieldIndex);
            if(fieldIndex !== -1) {
                const doAutoCap: boolean = (!!this.steps[stepIndex].fields[fieldIndex].autoCapitalize);
                console.log('RegFormV2MatComponent - ***** >>>>> fieldChange - doAutoCap: ', doAutoCap);
                if(doAutoCap) {
                    const capFirst = this.helpers.autoCapitalize(text);
                    this.steps[stepIndex].formGroup.controls[formControlName].setValue(capFirst);
                }
            }
        }
    }

    onDateChange(event: any) {
        // console.log('RegFormV2MatComponent - ******* >>> onDateChange - event: ', event);
        const date = event.value;
        // const : string = event.target._formField.ngControl.control.name;
        // const ngControl = event.target.
        const ctrlId: string = event.targetElement.id;
        // console.log('RegFormV2MatComponent - ******* >>> onDateChange - ctrlId: ', ctrlId);
        const ctrlNameParts = ctrlId.split('-');
        const formGroup = ctrlNameParts[0];
        const formControlName = ctrlNameParts[1];
        // console.log(`RegFormV2MatComponent - ******* >>> onDateChange - formGroup: ${formGroup} - control: ${formControlName}`);
        const stepIndex = this.findStepIndex(formGroup);
        // console.log(`RegFormV2MatComponent - ******* >>> onDateChange - stepIndex: ${stepIndex}`);
        if(stepIndex !== -1) {
            const localDate = date.toLocaleDateString();
            // console.log('RegFormV2MatComponent - ******* >>> onDateChange - date: ', localDate);
            const isoDate = this.helpers.makeIsoDate(localDate);
            // console.log('RegFormV2MatComponent - ******* >>> onDateChange - isoDate: ', isoDate);
            this.steps[stepIndex].formGroup.controls[formControlName].setValue(isoDate);
            // console.log('RegFormV2MatComponent - onDateChange controls: ', this.f(stepIndex));
        }
    }

}
