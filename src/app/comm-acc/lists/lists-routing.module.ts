import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../theme/shared/_helpers";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'options',
                loadComponent: () => import('../table/tbl-options-mat/tbl-options-mat.component')
                  .then(m => m.TblOptionsMatComponent),
                canActivate: [AuthGuard],
                data: {roles: ['SuperAdmin']}
            },
            {
                path: 'users',
                loadComponent: () => import('../table/tbl-users/tbl-users.component'),
                canActivate: [AuthGuard],
                data: {roles: ['UsersAdmin']}
            },
            {
                path: 'api-docs',
                loadComponent: () => import('../api-docs/api-docs.component'),
                canActivate: [AuthGuard],
                data: {roles: ['SuperAdmin']}
            },
            {
                path: 'escrow-companies',
                loadComponent: () => import('../table/tbl-escrow-companies-mat/tbl-escrow-companies-mat.component')
                  .then(m => m.TblEscrowCompaniesMatComponent),
                canActivate: [AuthGuard],
                data: {roles: ['SuperAdmin']}
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
