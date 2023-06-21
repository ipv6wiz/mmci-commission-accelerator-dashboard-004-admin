// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-card-clip',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './user-card-clip.component.html',
  styleUrls: ['./user-card-clip.component.scss']
})
export class UserCardClipComponent {}
