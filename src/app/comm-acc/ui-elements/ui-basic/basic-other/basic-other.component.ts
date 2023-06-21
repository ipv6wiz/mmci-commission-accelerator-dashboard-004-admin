import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-basic-other',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-other.component.html',
  styleUrls: ['./basic-other.component.scss']
})
export default class BasicOtherComponent {}
