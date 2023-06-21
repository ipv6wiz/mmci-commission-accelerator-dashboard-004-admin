// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-card-simple',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './user-card-simple.component.html',
  styleUrls: ['./user-card-simple.component.scss']
})
export class UserCardSimpleComponent {
  // public method
  simples = [
    {
      title: 'Simple',
      src: 'assets/images/widget/slider5.jpg',
      name: 'Josephin Doe',
      avatar: 'assets/images/user/avatar-2.jpg'
    },
    {
      title: 'With option',
      src: 'assets/images/widget/slider7.jpg',
      icon: 'icon feather icon-star',
      icon2: 'feather icon-more-horizontal',
      name: 'Suzen',
      avatar: 'assets/images/user/avatar-1.jpg'
    },
    {
      title: 'Option selected',
      src: 'assets/images/widget/slider6.jpg',
      icon: 'icon feather icon-star-on',
      icon2: 'feather icon-more-horizontal',
      name: 'Suzen',
      avatar: 'assets/images/user/avatar-3.jpg'
    }
  ];
}
