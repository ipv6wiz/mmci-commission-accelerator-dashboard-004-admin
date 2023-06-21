// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-hd-customer-detail',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './hd-customer-detail.component.html',
  styleUrls: ['./hd-customer-detail.component.scss']
})
export default class HdCustomerDetailComponent {
  // public method
  person = [
    {
      title: 'Customer',
      src: 'assets/images/user/avatar-5.jpg',
      name: 'Jack Pall'
    },
    {
      title: 'Contact',
      icon: 'feather icon-mail me-1',
      name: 'mail@mail.com'
    },
    {
      title: 'Category',
      src: 'assets/images/ticket/p1.jpg',
      name: 'Alpha pro'
    },
    {
      title: 'Assigned',
      src: 'assets/images/user/avatar-4.jpg',
      name: 'Lina Hop'
    },
    {
      title: 'Created',
      icon: 'feather icon-calendar me-1',
      name: 'Date'
    },
    {
      title: 'Response',
      icon: 'feather icon-clock me-1',
      name: 'Time'
    }
  ];

  images = [
    {
      img: 'assets/images/light-box/l1.jpg',
      src: 'assets/images/light-box/sl1.jpg'
    },
    {
      img: 'assets/images/light-box/l5.jpg',
      src: 'assets/images/light-box/sl5.jpg'
    },
    {
      img: 'assets/images/light-box/l6.jpg',
      src: 'assets/images/light-box/sl6.jpg'
    },
    {
      img: 'assets/images/light-box/l4.jpg',
      src: 'assets/images/light-box/sl4.jpg'
    },
    {
      img: 'assets/images/light-box/l3.jpg',
      src: 'assets/images/light-box/sl3.jpg'
    }
  ];
}
