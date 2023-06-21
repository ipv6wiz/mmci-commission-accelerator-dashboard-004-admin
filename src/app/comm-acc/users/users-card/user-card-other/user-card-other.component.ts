// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-card-other',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './user-card-other.component.html',
  styleUrls: ['./user-card-other.component.scss']
})
export class UserCardOtherComponent {}
