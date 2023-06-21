// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-auth-personal-info',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './auth-personal-info.component.html',
  styleUrls: ['./auth-personal-info.component.scss']
})
export default class AuthPersonalInfoComponent {
  // public props
  radioButtons: string;

  // constructor
  constructor() {
    this.radioButtons = 'f';
  }
}
