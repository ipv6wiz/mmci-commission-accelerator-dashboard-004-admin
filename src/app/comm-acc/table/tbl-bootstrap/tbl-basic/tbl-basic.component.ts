// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-tbl-basic',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tbl-basic.component.html',
  styleUrls: ['./tbl-basic.component.scss']
})
export default class TblBasicComponent {}
