// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        loadComponent: () => import('./invoice-basic/invoice-basic.component')
      },
      {
        path: 'summary',
        loadComponent: () => import('./invoice-summary/invoice-summary.component')
      },
      {
        path: 'list',
        loadComponent: () => import('./invoice-list/invoice-list.component')
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
