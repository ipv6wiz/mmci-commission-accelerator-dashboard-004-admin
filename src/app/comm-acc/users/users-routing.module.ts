// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./user-profile/user-profile.component')
      },
      {
        path: 'card',
        loadComponent: () => import('./users-card/users-card.component')
      },
      {
        path: 'list',
        loadComponent: () => import('./users-list/users-list.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
