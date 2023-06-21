// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'alert',
        loadComponent: () => import('./basic-alert/basic-alert.component')
      },
      {
        path: 'button',
        loadComponent: () => import('./basic-button/basic-button.component')
      },
      {
        path: 'badges',
        loadComponent: () => import('./basic-badge/basic-badge.component')
      },
      {
        path: 'breadcrumb',
        loadComponent: () => import('./basic-breadcrumb/basic-breadcrumb.component')
      },
      {
        path: 'cards',
        loadComponent: () => import('./basic-cards/basic-cards.component')
      },
      {
        path: 'collapse',
        loadComponent: () => import('./basic-collapse/basic-collapse.component')
      },
      {
        path: 'carousel',
        loadComponent: () => import('./basic-carousel/basic-carousel.component')
      },
      {
        path: 'dropdowns',
        loadComponent: () => import('./basic-dropdowns/basic-dropdowns.component')
      },
      {
        path: 'offcanvas',
        loadComponent: () => import('./basic-offcanvas/basic-offcanvas.component')
      },
      {
        path: 'progress',
        loadComponent: () => import('./basic-progress/basic-progress.component')
      },
      {
        path: 'list-group',
        loadComponent: () => import('./basic-list-group/basic-list-group.component')
      },
      {
        path: 'modal',
        loadComponent: () => import('./basic-modal/basic-modal.component')
      },
      {
        path: 'spinner',
        loadComponent: () => import('./basic-spinner/basic-spinner.component')
      },
      {
        path: 'tabs-pills',
        loadComponent: () => import('./basic-tabs-pills/basic-tabs-pills.component')
      },
      {
        path: 'typography',
        loadComponent: () => import('./basic-typography/basic-typography.component')
      },
      {
        path: 'toasts',
        loadChildren: () => import('./toasts/toasts.module').then((m) => m.ToastsModule)
      },
      {
        path: 'other',
        loadComponent: () => import('./basic-other/basic-other.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
