import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../theme/shared/_helpers";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'options',
                loadComponent: () => import('../table/tbl-options-mat-mmci/tbl-options-mat-mmci.component')
                  .then(m => m.TblOptionsMatMmciComponent),
                canActivate: [AuthGuard],
                data: {roles: ['SuperAdmin']}
            },
            {
                path: 'users',
                loadComponent: () => import('../table/tbl-users-mat/tbl-users-mat.component')
                  .then(m => m.TblUsersMatComponent),
                canActivate: [AuthGuard],
                data: {roles: ['SuperAdmin','UsersAdmin']}
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
            },
            {
                path: 'mls-list',
                loadComponent: () => import('../table/tbl-mls-list-mat/tbl-mls-list-mat.component')
                  .then(m => m.TblMlsListMatComponent),
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
