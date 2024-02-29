import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';



@Component({
  selector: 'app-credit-limit',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatToolbar,
    MatDialogClose,
    MatFormField,
    MatIcon,
    MatInput,
    MatHint,
    MatLabel
  ],
  templateUrl: './credit-limit.component.html',
  styleUrl: './credit-limit.component.scss'
})
export class CreditLimitComponent implements OnInit {

  constructor(
    public modal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    console.log('CreditLimitComponent - modal - data: ', this.data);
    console.log('CreditLimitComponent - modal - displayName: ', this.data.client.displayName);
  }

}
