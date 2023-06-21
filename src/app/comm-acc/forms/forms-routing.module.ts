// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        loadComponent: () => import('./basic-elements/basic-elements.component')
      },
      {
        path: 'advance',
        loadComponent: () => import('./form-advance/form-advance.component')
      },
      {
        path: 'validation',
        loadComponent: () => import('./form-validation/form-validation.component')
      },
      {
        path: 'masking',
        loadComponent: () => import('./form-masking/form-masking.component')
      },
      // todo: waiting for pr complete after update this package https://github.com/madoar/angular-archwizard/pull/389
      {
        path: 'wizard',
        loadComponent: () => import('./form-wizard/form-wizard.component')
      },
      {
        path: 'picker',
        loadComponent: () => import('./form-picker/form-picker.component')
      },
      {
        path: 'select',
        loadComponent: () => import('./form-select/form-select.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
