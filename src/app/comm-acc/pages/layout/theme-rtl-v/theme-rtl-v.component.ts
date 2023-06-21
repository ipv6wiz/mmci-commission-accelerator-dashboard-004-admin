// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonContentComponent } from '../common-content/common-content.component';

@Component({
  selector: 'app-theme-rtl-v',
  standalone: true,
  imports: [CommonModule, SharedModule, CommonContentComponent],
  templateUrl: './theme-rtl-v.component.html',
  styleUrls: ['./theme-rtl-v.component.scss']
})
export default class ThemeRtlVComponent {}
