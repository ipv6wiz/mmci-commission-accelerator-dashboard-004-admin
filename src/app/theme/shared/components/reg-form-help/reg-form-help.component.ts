import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";


@Component({
  selector: 'app-reg-form-help',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './reg-form-help.component.html',
  styleUrls: ['./reg-form-help.component.scss']
})
export class RegFormHelpComponent {}
