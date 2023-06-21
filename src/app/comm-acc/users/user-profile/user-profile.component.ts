// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UsHomeComponent } from './us-home/us-home.component';
import { UsProfileComponent } from './us-profile/us-profile.component';
import { UsContactComponent } from './us-contact/us-contact.component';
import { UsGalleryComponent } from './us-gallery/us-gallery.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, SharedModule, UsHomeComponent, UsProfileComponent, UsContactComponent, UsGalleryComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export default class UserProfileComponent {
  images = [
    {
      src: 'assets/images/user/avatar-1.jpg'
    },
    {
      src: 'assets/images/user/avatar-2.jpg'
    },
    {
      src: 'assets/images/user/avatar-3.jpg'
    },
    {
      src: 'assets/images/user/avatar-4.jpg'
    },
    {
      src: 'assets/images/user/avatar-5.jpg'
    },
    {
      src: 'assets/images/user/avatar-1.jpg'
    },
    {
      src: 'assets/images/user/avatar-2.jpg'
    },
    {
      src: 'assets/images/user/avatar-3.jpg'
    }
  ];

  customers = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Alex Thompson',
      text: 'Cheers!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'John Doue',
      text: 'stay hungry stay foolish!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      name: 'Alex Thompson',
      text: 'Cheers!',
      status: 'deactive',
      icon: 'icon',
      time: '30 min ago'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'John Doue',
      text: 'Cheers!',
      status: 'deactive',
      icon: 'icon',
      time: '10 min ago'
    },
    {
      src: 'assets/images/user/avatar-5.jpg',
      name: 'Shirley Hoe',
      text: 'stay hungry stay foolish!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'John Doue',
      text: 'Cheers!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'James Alexander',
      text: 'stay hungry stay foolish!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      name: 'John Doue',
      text: 'Cheers!',
      status: 'deactive',
      icon: 'icon',
      time: '10 min ago'
    }
  ];
}
