// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-common-content',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './common-content.component.html',
  styleUrls: ['./common-content.component.scss']
})
export class CommonContentComponent {}
