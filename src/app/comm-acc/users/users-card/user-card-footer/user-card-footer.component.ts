// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-card-footer',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './user-card-footer.component.html',
  styleUrls: ['./user-card-footer.component.scss']
})
export class UserCardFooterComponent {}
