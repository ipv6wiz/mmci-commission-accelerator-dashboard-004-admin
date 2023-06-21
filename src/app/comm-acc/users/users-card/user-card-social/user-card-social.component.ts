// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-card-social',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './user-card-social.component.html',
  styleUrls: ['./user-card-social.component.scss']
})
export class UserCardSocialComponent {}
