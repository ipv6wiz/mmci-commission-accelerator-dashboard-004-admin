// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'text-editor',
        loadComponent: () => import('./text-editor/text-editor.component')
      },
      {
        path: 'quill-editor',
        loadComponent: () => import('./quill-editor/quill-editor.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {}
