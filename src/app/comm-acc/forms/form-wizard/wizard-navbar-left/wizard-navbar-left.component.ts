// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// third party
import { ArchwizardModule } from '@achimha/angular-archwizard';

@Component({
  selector: 'app-wizard-navbar-left',
  standalone: true,
  imports: [CommonModule, ArchwizardModule],
  templateUrl: './wizard-navbar-left.component.html',
  styleUrls: ['./wizard-navbar-left.component.scss']
})
export class WizardNavbarLeftComponent {}
