// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'statistic',
        loadComponent: () => import('./widget-statistic/widget-statistic.component')
      },
      {
        path: 'data',
        loadComponent: () => import('./widget-data/widget-data.component')
      },
      {
        path: 'chart',
        loadComponent: () => import('./widget-chart/widget-chart.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule {}
