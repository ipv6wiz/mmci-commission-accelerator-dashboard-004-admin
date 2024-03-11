import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../theme/shared/service';
import { HelpersService } from '../../../../theme/shared/service/helpers.service';
import { NGXLogger } from 'ngx-logger';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-tbl-escrow-company-form-mat',
  standalone: true,
  imports: [
    MatDialogClose,
    MatToolbar,
    MatDialogTitle,
    MatDialogContent,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './tbl-escrow-company-form-mat.component.html',
  styleUrl: './tbl-escrow-company-form-mat.component.scss'
})
export class TblEscrowCompanyFormMatComponent implements OnInit{
  escrowCompanyFormGroup: FormGroup;
  fields: any[] = [];
  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private helpers: HelpersService,
    private logger: NGXLogger
  ) {
    this.escrowCompanyFormGroup = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyPhone: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ] ]
    });
  }

  ngOnInit() {
  }

}
