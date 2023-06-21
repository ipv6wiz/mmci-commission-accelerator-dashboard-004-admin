// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./task-list/task-list.component')
      },
      {
        path: 'board',
        loadComponent: () => import('./task-board/task-board.component')
      },
      {
        path: 'detail',
        loadComponent: () => import('./task-detail/task-detail.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}
