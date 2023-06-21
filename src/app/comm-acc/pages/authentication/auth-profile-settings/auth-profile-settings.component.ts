// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-profile-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-profile-settings.component.html',
  styleUrls: ['./auth-profile-settings.component.scss']
})
export default class AuthProfileSettingsComponent {}
