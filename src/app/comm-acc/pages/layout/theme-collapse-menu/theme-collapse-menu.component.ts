// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonContentComponent } from '../common-content/common-content.component';

@Component({
  selector: 'app-theme-collapse-menu',
  standalone: true,
  imports: [CommonModule, SharedModule, CommonContentComponent],
  templateUrl: './theme-collapse-menu.component.html',
  styleUrls: ['./theme-collapse-menu.component.scss']
})
export default class ThemeCollapseMenuComponent {}
