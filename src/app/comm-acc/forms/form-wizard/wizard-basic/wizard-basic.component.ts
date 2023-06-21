// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// third party
import { ArchwizardModule } from '@achimha/angular-archwizard';

@Component({
  selector: 'app-wizard-basic',
  standalone: true,
  imports: [CommonModule, ArchwizardModule],
  templateUrl: './wizard-basic.component.html',
  styleUrls: ['./wizard-basic.component.scss']
})
export class WizardBasicComponent {}
