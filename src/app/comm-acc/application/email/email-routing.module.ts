// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mail-inbox',
        loadComponent: () => import('./mail-inbox/mail-inbox.component')
      },
      {
        path: 'mail-read',
        loadComponent: () => import('./mail-read/mail-read.component')
      },
      {
        path: 'mail-compose',
        loadComponent: () => import('./mail-compose/mail-compose.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {}
