// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mail-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.scss']
})
export class MailContentComponent {
  // public Method
  mails = [
    {
      type: 'unread',
      icon: 'icon-star',
      sender: 'John Doe',
      text: 'Coming Up Next Week',
      time: '13:02 PM',
      id: 'checkbox-s-infill-1'
    },
    {
      type: 'read',
      icon: 'icon-star',
      sender: 'Sara Soudan',
      text: 'SVG new updates comes for you',
      time: '00:05 AM',
      id: 'checkbox-s-infill-3'
    },
    {
      type: 'read',
      icon: 'icon-star',
      sender: 'Rinks Bell',
      text: 'PhotoShop updates are available',
      time: '10:01 AM',
      id: 'checkbox-s-infill-4'
    },
    {
      type: 'read',
      icon: 'icon-star',
      sender: 'Harry John',
      text: 'New upcoming data available',
      time: '11:01 AM',
      id: 'checkbox-s-infill-5'
    },
    {
      type: 'read',
      icon: 'icon-star-on text-c-yellow',
      sender: 'Harry John',
      text: 'SCSS current working for new updates',
      time: '12:01 PM',
      id: 'checkbox-s-infill-6'
    },
    {
      type: 'read',
      icon: 'icon-star',
      sender: 'Liu Koi Yan',
      text: 'Charts waiting for you',
      time: '07:15 AM',
      id: 'checkbox-s-infill-7'
    },
    {
      type: 'read',
      icon: 'icon-star',
      sender: 'Google Inc',
      text: 'Lorem ipsum dolor sit amen, consectetuer advising elite',
      time: '08:01 AM',
      id: 'checkbox-s-infill-8'
    },
    {
      type: 'read',
      icon: 'icon-star',
      sender: 'John Doe',
      text: 'Coming Up Next Week',
      time: '13:02 PM',
      id: 'checkbox-s-infill-9'
    }
  ];

  attachment = [
    {
      type: 'unread',
      title: 'Google Inc',
      description: 'Lorem ipsum dolor sit amen, consectetuer',
      file: 'icon-image',
      icon: 'icon-file-text',
      file_name: 'user.png',
      icon_title: 'file.doc',
      time: '12:01 AM',
      attach: 'mail-attach'
    },
    {
      type: 'read',
      title: 'Liu Koi Yan',
      description: 'Charts waiting for you',
      file: 'icon-film',
      file_name: 'video',
      time: '07:15 AM',
      attach: 'mail-attach'
    }
  ];
}
