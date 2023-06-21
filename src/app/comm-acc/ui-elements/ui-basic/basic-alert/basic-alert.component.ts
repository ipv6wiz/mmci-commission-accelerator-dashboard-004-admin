// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AlertComponent } from 'src/app/theme/shared/components/alert/alert.component';

@Component({
  selector: 'app-basic-alert',
  standalone: true,
  imports: [CommonModule, SharedModule, AlertComponent],
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss']
})
export default class BasicAlertComponent {}
