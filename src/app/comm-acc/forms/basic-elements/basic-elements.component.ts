// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// third party
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, ColorPickerModule, SharedModule],
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export default class BasicElementsComponent {}
