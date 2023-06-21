// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-us-home',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './us-home.component.html',
  styleUrls: ['./us-home.component.scss']
})
export class UsHomeComponent {
  isShow = true;

  // public method
  merge_card = [
    {
      src: 'assets/images/profile/bg-1.jpg',
      color: 'text-danger'
    },
    {
      src: 'assets/images/profile/bg-2.jpg',
      color: 'text-muted'
    },
    {
      src: 'assets/images/profile/bg-2.jpg',
      color: 'text-muted'
    }
  ];
}
