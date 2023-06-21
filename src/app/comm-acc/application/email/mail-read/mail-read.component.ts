// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-mail-read',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './mail-read.component.html',
  styleUrls: ['./mail-read.component.scss']
})
export default class MailReadComponent {
  // public props
  isCollapsed: boolean;

  // constructor
  constructor() {
    this.isCollapsed = false;
  }

  // public method
  menu = [
    {
      icon: 'icon-inbox',
      title: 'Index',
      mail: '6',
      status: 'active'
    },
    {
      icon: 'icon-star',
      title: 'Starred'
    },
    {
      icon: 'icon-file-text',
      title: 'Drafts'
    },
    {
      icon: 'icon-navigation',
      title: 'Sent Mail'
    },
    {
      icon: 'icon-trash-2',
      title: 'Trash'
    }
  ];

  menu2 = [
    {
      icon: 'icon-zap',
      title: ' Important',
      mail: '6'
    },
    {
      icon: 'icon-message-circle',
      title: ' Chats'
    },
    {
      icon: 'icon-alert-triangle',
      title: ' Spam'
    }
  ];

  attachment = [
    {
      img: 'assets/images/slider/img-slide-4.jpg'
    },
    {
      img: 'assets/images/slider/img-slide-1.jpg'
    },
    {
      img: 'assets/images/slider/img-slide-3.jpg'
    }
  ];
}
