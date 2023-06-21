// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonContentComponent } from '../common-content/common-content.component';

@Component({
  selector: 'app-theme-dark',
  standalone: true,
  imports: [CommonModule, SharedModule, CommonContentComponent],
  templateUrl: './theme-dark.component.html',
  styleUrls: ['./theme-dark.component.scss']
})
export default class ThemeDarkComponent {}
