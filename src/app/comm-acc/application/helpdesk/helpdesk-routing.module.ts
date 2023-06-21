// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'hd-dashboard',
        loadComponent: () => import('./hd-dashboard/hd-dashboard.component')
      },
      {
        path: 'hd-customer',
        loadComponent: () => import('./hd-customer/hd-customer.component')
      },
      {
        path: 'hd-customer-list',
        loadComponent: () => import('./hd-customer-list/hd-customer-list.component')
      },
      {
        path: 'hd-customer-detail',
        loadComponent: () => import('./hd-customer-detail/hd-customer-detail.component')
      },
      {
        path: 'hd-ticket',
        loadComponent: () => import('./hd-ticket/hd-ticket.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskRoutingModule {}
