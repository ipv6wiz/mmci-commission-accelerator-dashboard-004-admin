// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'apex',
        loadComponent: () => import('./crt-apex/crt-apex.component')
      },
      {
        path: 'chart-js',
        loadComponent: () => import('./crt-chart-js/crt-chart-js.component')
      },
      {
        path: 'high-chart',
        loadComponent: () => import('./crt-high-chart/crt-high-chart.component')
      },
      {
        path: 'peity',
        loadComponent: () => import('./crt-peity/crt-peity.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreChartRoutingModule {}
