import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-pending-approval',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-pending-approval.component.html',
  styleUrl: './auth-pending-approval.component.scss'
})
export default class AuthPendingApprovalComponent {

}
