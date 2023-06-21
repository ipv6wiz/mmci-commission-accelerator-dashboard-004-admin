// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// project import
import { MailContentComponent } from './mail-content/mail-content.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-mail-inbox',
  standalone: true,
  imports: [CommonModule, MailContentComponent, SharedModule, RouterModule],
  templateUrl: './mail-inbox.component.html',
  styleUrls: ['./mail-inbox.component.scss']
})
export default class MailInboxComponent {
  // public props
  isCollapsed: boolean;
  isMail: string;
  isSubMail: string;

  // constructor
  constructor() {
    this.isCollapsed = false;
    this.isMail = 'inbox';
    this.isSubMail = 'primary';
  }

  // public Method
  menus = [
    {
      icon: 'icon-zap',
      text: 'Important',
      number: '6'
    },
    {
      icon: 'icon-message-circle',
      text: 'Chats'
    },
    {
      icon: 'icon-alert-triangle',
      text: 'Spam'
    }
  ];
}
