// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// third party
import { ArchwizardModule } from '@achimha/angular-archwizard';

@Component({
  selector: 'app-wizard-navbar-lg',
  standalone: true,
  imports: [CommonModule, ArchwizardModule],
  templateUrl: './wizard-navbar-lg.component.html',
  styleUrls: ['./wizard-navbar-lg.component.scss']
})
export class WizardNavbarLgComponent {}
