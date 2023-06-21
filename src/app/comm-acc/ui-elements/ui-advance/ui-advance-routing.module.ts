// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sweetAlert',
        loadChildren: () => import('./sweet-alert/sweet-alert.module').then((m) => m.SweetAlertModule)
      },
      {
        path: 'datepicker',
        loadChildren: () => import('./datepicker/datepicker.module').then((m) => m.DatepickerModule)
      },
      {
        path: 'lightbox',
        loadComponent: () => import('./adv-lightbox/adv-lightbox.component')
      },
      {
        path: 'modal',
        loadComponent: () => import('./adv-modal/adv-modal.component')
      },
      {
        path: 'notification',
        loadChildren: () => import('./adv-notification/adv-notification.module').then((m) => m.AdvNotificationModule)
      },
      {
        path: 'rangeSlider',
        loadComponent: () => import('./adv-range-slider/adv-range-slider.component')
      },
      {
        path: 'treeView',
        loadChildren: () => import('./adv-tree-view/adv-tree-view.module').then((m) => m.AdvTreeViewModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiAdvanceRoutingModule {}
