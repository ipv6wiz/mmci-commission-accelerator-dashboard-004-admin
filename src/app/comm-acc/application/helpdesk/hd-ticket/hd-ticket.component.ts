// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-hd-ticket',
  standalone: true,
  imports: [CommonModule, SharedModule, QuillModule],
  templateUrl: './hd-ticket.component.html',
  styleUrls: ['./hd-ticket.component.scss']
})
export default class HdTicketComponent {}
