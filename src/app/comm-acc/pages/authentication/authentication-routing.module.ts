// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppSiteConfig} from "../../../app-site-config"

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'verify-email-address',
            title: AppSiteConfig.siteName,
            loadComponent: () => import('./verify-email/verify-email.component')
        },
      {
        path: 'signin-v2',
        title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-signin-v2/auth-signin-v2.component')
      },
      {
        path: 'reset-password-v2',
        title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-reset-password-v2/auth-reset-password-v2.component')
      },
      {
        path: 'change-password-v2',
          title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-change-password-v2/auth-change-password-v2.component')
      },
      {
        path: 'personal-information',
          title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-personal-info/auth-personal-info.component')
      },
      {
        path: 'profile-settings',
          title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-profile-settings/auth-profile-settings.component')
      },
      {
        path: 'pending-approval',
        title: AppSiteConfig.siteName,
        loadComponent: () => import('./auth-pending-approval/auth-pending-approval.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
