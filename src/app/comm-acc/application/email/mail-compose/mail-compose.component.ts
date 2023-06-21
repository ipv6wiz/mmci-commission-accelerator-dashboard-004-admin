// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// third Party
import { QuillModule } from 'ngx-quill';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-mail-compose',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, QuillModule],
  templateUrl: './mail-compose.component.html',
  styleUrls: ['./mail-compose.component.scss']
})
export default class MailComposeComponent {
  // public props
  isCollapsed: boolean;

  // constructor
  constructor() {
    this.isCollapsed = false;
  }
}
