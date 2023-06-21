// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { WizardBasicComponent } from './wizard-basic/wizard-basic.component';
import { WizardCustomComponent } from './wizard-custom/wizard-custom.component';
import { WizardNavbarLeftComponent } from './wizard-navbar-left/wizard-navbar-left.component';
import { WizardNavbarLgComponent } from './wizard-navbar-lg/wizard-navbar-lg.component';
import { WizardNavbarLgIconComponent } from './wizard-navbar-lg-icon/wizard-navbar-lg-icon.component';
import { WizardNavbarRightComponent } from './wizard-navbar-right/wizard-navbar-right.component';

const wizard = [
  WizardBasicComponent,
  WizardCustomComponent,
  WizardNavbarLeftComponent,
  WizardNavbarLgComponent,
  WizardNavbarLgIconComponent,
  WizardNavbarRightComponent
];

@Component({
  selector: 'app-form-wizard',
  standalone: true,
  imports: [CommonModule, wizard],
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export default class FormWizardComponent {}
