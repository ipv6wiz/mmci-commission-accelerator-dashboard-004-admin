import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-basic-collapse',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-collapse.component.html',
  styleUrls: ['./basic-collapse.component.scss']
})
export default class BasicCollapseComponent {
  // Public props
  isCollapsed = true;
  isMultiCollapsed1 = true;
  isMultiCollapsed2 = true;
}
