// angular import
import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

// third party
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-hd-customer',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbModule, QuillModule],
  templateUrl: './hd-customer.component.html',
  styleUrls: ['./hd-customer.component.scss']
})
export default class HdCustomerComponent {
  selectedView = 'large-view';

  // constructor
  constructor(private offcanvasService: NgbOffcanvas) {}

  // public method
  customer = [
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
      src: 'assets/images/user/avatar-1.jpg',
      color: 'open-tic'
    },
    {
      src: 'assets/images/user/avatar-2.jpg'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      color: 'close-tic'
    }
  ];

  // public method

  addContact(content: TemplateRef<string>) {
    this.offcanvasService.open(content, { position: 'end', panelClass: 'active-width' });
  }

  profiles = [
    {
      src: 'assets/images/user/avatar-5.jpg'
    },
    {
      src: 'assets/images/user/avatar-4.jpg'
    },
    {
      src: 'assets/images/user/avatar-3.jpg'
    }
  ];

  img = [
    {
      src: 'assets/images/light-box/l1.jpg',
      image: 'assets/images/light-box/l1.jpg'
    },
    {
      src: 'assets/images/light-box/l1.jpg',
      image: 'assets/images/light-box/l1.jpg'
    },
    {
      src: 'assets/images/light-box/l1.jpg',
      image: 'assets/images/light-box/l1.jpg'
    },
    {
      src: 'assets/images/light-box/l1.jpg',
      image: 'assets/images/light-box/l1.jpg'
    }
  ];

  tickets = [
    {
      src: 'assets/images/ticket/p1.jpg',
      name: 'Piaf able',
      background: 'bg-danger',
      number: '1',
      type: 'border-bottom pb-3'
    },
    {
      src: 'assets/images/ticket/p2.jpg',
      name: 'Pro able',
      type: 'border-bottom pb-3 pt-3'
    },
    {
      src: 'assets/images/ticket/p3.jpg',
      name: 'CRM admin',
      background: 'bg-danger',
      number: '1',
      type: 'border-bottom pb-3 pt-3'
    },
    {
      src: 'assets/images/ticket/p4.jpg',
      name: 'Alpha Pro',
      type: 'border-bottom pb-3 pt-3'
    },
    {
      src: 'assets/images/ticket/p5.jpg',
      name: 'Carbon able',
      type: 'pb-3'
    }
  ];

  agents = [
    {
      src: 'assets/images/user/avatar-5.jpg',
      name: 'Tom Cook',
      background: 'bg-danger',
      number: '1'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'Brad Larry',
      background: 'bg-danger',
      number: '1'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      name: 'John White'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'Mark Jobs'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Able Pro'
    }
  ];
}
