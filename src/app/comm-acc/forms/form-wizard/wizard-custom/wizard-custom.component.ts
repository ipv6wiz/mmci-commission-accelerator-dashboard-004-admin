// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// third party
import { ArchwizardModule } from '@achimha/angular-archwizard';

@Component({
  selector: 'app-wizard-custom',
  standalone: true,
  imports: [CommonModule, ArchwizardModule],
  templateUrl: './wizard-custom.component.html',
  styleUrls: ['./wizard-custom.component.scss']
})
export class WizardCustomComponent {}
